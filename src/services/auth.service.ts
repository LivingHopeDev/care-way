import { prismaClient } from "..";
import {
  Conflict,
  ResourceNotFound,
  Expired,
  BadRequest,
  Unauthorised,
} from "../middlewares";
import { IUserLogin, IUserSignUp } from "../types";
import { User } from "@prisma/client";
import {
  comparePassword,
  generateAccessToken,
  hashPassword,
  generateNumericOTP,
} from "../utils";
import { addEmailToQueue } from "../utils/queue";
import { OtpService, EmailService } from ".";
import config from "../config";
import { cloudinary } from "../utils/cloudinary";
export class AuthService {
  private otpService = new OtpService();
  private emailService = new EmailService();
  public async patientSignUp(payload: any): Promise<{
    message: string;
    user: Partial<any>;
  }> {
    const { name, email, phone, password, gender } = payload;

    const result = await prismaClient.$transaction(async (prisma) => {
      const existingUser = await prisma.user.findFirst({
        where: { email },
      });
      if (existingUser) {
        throw new Conflict("User with this email already exists");
      }

      const hashedPassword = await hashPassword(password);

      // Create user
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          phone,
          password: hashedPassword,
          gender,
          role: "PATIENT",
        },
      });

      // Create patient profile
      const patient = await prisma.patient.create({
        data: {
          userId: newUser.id,
        },
      });

      return { newUser, patient };
    });

    // Generate OTP and send email outside of transaction
    const otp = await this.otpService.createOtp(result.newUser.id);
    const { emailBody, emailText } =
      await this.emailService.verifyEmailTemplate(name, otp!.token);

    await addEmailToQueue({
      from: config.GOOGLE_SENDER_MAIL,
      to: email,
      subject: "Email Verification",
      text: emailText,
      html: emailBody,
    });

    return {
      message:
        "User created successfully. Kindly check your email for the OTP.",
      user: {
        id: result.newUser.id,
        email: result.newUser.email,
        role: result.newUser.role,
        patient: result.patient,
      },
    };
  }

  public async providerSignUp(
    payload: any,
    files: { [fieldname: string]: Express.Multer.File[] }
  ): Promise<{
    message: string;
    user: Partial<any>;
  }> {
    const {
      name,
      email,
      phone,
      password,
      gender,
      specialization,
      bus_stop,
      street,
      city,
      state,
      country,
      availability,
      fees,
    } = payload;

    // Extract `profileImage` and `docs` from `files`
    const profileImage = files.profileImage?.[0]; // Get the first file in the `profileImage` field
    const docs = files.docs || [];
    console.log(docs);
    if (!profileImage) {
      throw new Error("Profile image is required.");
    }

    const result = await prismaClient.$transaction(async (prisma) => {
      const existingUser = await prisma.user.findFirst({
        where: { email },
      });
      if (existingUser) {
        throw new Conflict("User with this email already exists");
      }

      const hashedPassword = await hashPassword(password);

      // Create user
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          phone,
          password: hashedPassword,
          gender,
          role: "PROVIDER",
        },
      });

      // Upload documents to Cloudinary
      const documentUrls = [];
      for (const doc of docs) {
        const uploadResult = await cloudinary.uploader.upload(doc.path, {
          folder: "/careway/docs",
          resource_type: "raw",

          public_id: `user_${newUser.id}_doc_${doc.originalname}`,
        });
        documentUrls.push({ fileUrl: uploadResult.secure_url });
      }

      // Upload profile image to Cloudinary
      const imageResult = await cloudinary.uploader.upload(profileImage.path, {
        folder: "/careway/profile",
        public_id: `user_${newUser.id}_profile`,
      });

      // Create provider profile
      const provider = await prisma.provider.create({
        data: {
          userId: newUser.id,
          specialization,
          fees: parseInt(fees),
          street,
          city,
          state,
          country,
          bus_stop,
          profileImage: imageResult.secure_url,
          documents: {
            create: documentUrls,
          },
          availability: {
            create: availability,
          },
        },
      });

      return { newUser, provider };
    });

    // Generate OTP and send email outside of transaction
    const otp = await this.otpService.createOtp(result.newUser.id);
    const { emailBody, emailText } =
      await this.emailService.verifyEmailTemplate(name, otp!.token);

    await addEmailToQueue({
      from: config.GOOGLE_SENDER_MAIL,
      to: email,
      subject: "Email Verification",
      text: emailText,
      html: emailBody,
    });

    return {
      message:
        "User created successfully. Kindly check your email for the OTP.",
      user: {
        id: result.newUser.id,
        email: result.newUser.email,
        role: result.newUser.role,
        provider: result.provider,
      },
    };
  }

  public async login(payload: IUserLogin): Promise<{
    message: string;
    user: Partial<User>;
    token: string;
  }> {
    const { email, password } = payload;
    const userExist = await prismaClient.user.findFirst({ where: { email } });

    if (!userExist) {
      throw new ResourceNotFound("Authentication failed");
    }
    const isPassword = await comparePassword(password, userExist.password);
    if (!isPassword) {
      throw new ResourceNotFound("Authentication failed");
    }
    if (!userExist.isVerified) {
      throw new Unauthorised(
        "Email verification required. Please verify your email to proceed."
      );
    }
    const accessToken = await generateAccessToken(userExist.id);
    const expiresAt = new Date();
    expiresAt.setDate(
      expiresAt.getDate() + parseInt(config.TOKEN_EXPIRY.replace("d", ""), 10)
    );
    await prismaClient.session.upsert({
      where: { userId: userExist.id },
      update: { sessionToken: accessToken, expiresAt },
      create: { userId: userExist.id, sessionToken: accessToken, expiresAt },
    });

    const user = {
      name: userExist.name,
      email: userExist.email,
      role: userExist.role,
    };
    return {
      message: "Login Successfully",
      user,
      token: accessToken,
    };
  }

  public async logout(userId: string, token: string): Promise<{ message }> {
    await prismaClient.session.delete({
      where: { userId, sessionToken: token },
    });

    return {
      message: "Logout sucessful",
    };
  }
  public async forgotPassword(email: string): Promise<{ message: string }> {
    const user = await prismaClient.user.findFirst({
      where: { email: email },
    });
    if (!user) {
      throw new ResourceNotFound("User not found");
    }

    const token = generateNumericOTP(6);
    const otp_expires = new Date(Date.now() + 15 * 60 * 1000);

    const otp = await prismaClient.otp.create({
      data: {
        token: token,
        expiry: otp_expires,
        userId: user.id,
      },
    });
    const firstName = user.name.split(" ")[0];
    const { emailBody, emailText } =
      await this.emailService.resetPasswordTemplate(firstName, otp!.token);

    await addEmailToQueue({
      from: `${config.GOOGLE_SENDER_MAIL}`,
      to: email,
      subject: "Password Reset",
      text: emailText,
      html: emailBody,
    });
    return {
      message: "OTP sent successfully",
    };
  }

  resetPassword = async (
    token: string,
    new_password: string,
    confirm_password: string
  ): Promise<{ message: string }> => {
    if (new_password !== confirm_password) {
      throw new BadRequest("Password doesn't match");
    }
    const otp = await prismaClient.otp.findFirst({
      where: { token },
      include: { user: true },
    });
    if (!otp) {
      throw new ResourceNotFound("Invalid OTP");
    }

    if (otp.expiry < new Date()) {
      // Delete the expired OTP
      await prismaClient.otp.delete({
        where: { id: otp.id },
      });
      throw new Expired("OTP has expired");
    }

    const hashedPassword = await hashPassword(new_password);
    await prismaClient.$transaction([
      prismaClient.user.update({
        where: { id: otp.userId },
        data: { password: hashedPassword },
      }),
      prismaClient.otp.delete({
        where: { id: otp.id },
      }),
    ]);

    return {
      message: "Password reset successfully.",
    };
  };

  public async resendOtp(email: string): Promise<{ message: string }> {
    const user = await prismaClient.user.findFirst({
      where: { email: email },
    });
    if (!user) {
      throw new ResourceNotFound("User not found");
    }

    const token = generateNumericOTP(6);
    const otp_expires = new Date(Date.now() + 15 * 60 * 1000);

    const otp = await prismaClient.otp.create({
      data: {
        token: token,
        expiry: otp_expires,
        userId: user.id,
      },
    });
    const firstName = user.name.split(" ")[0];

    const { emailBody, emailText } =
      await this.emailService.resetPasswordTemplate(firstName, otp!.token);

    await addEmailToQueue({
      from: config.GOOGLE_SENDER_MAIL,
      to: email,
      subject: "Email Verification",
      text: emailText,
      html: emailBody,
    });
    return {
      message: "OTP sent successfully",
    };
  }
}
