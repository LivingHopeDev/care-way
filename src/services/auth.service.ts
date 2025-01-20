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

export class AuthService {
  private otpService = new OtpService();
  private emailService = new EmailService();
  public async signUp(payload: any): Promise<{
    message: string;
    user: Partial<any>;
  }> {
    const {
      name,
      email,
      phone,
      password,
      gender,
      role,
      specialization,
      location,
      availability,
      operatingHours,
      fees,
    } = payload;

    const existingUser = await prismaClient.user.findFirst({
      where: { email },
    });
    if (existingUser) {
      throw new Conflict("User with this email already exists");
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await prismaClient.user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
        gender,
        role,
      },
    });

    let userResponse;
    if (role === "PROVIDER") {
      // Create Provider profile
      const provider = await prismaClient.provider.create({
        data: {
          userId: newUser.id,
          specialization,
          availability,
          operatingHours,
          fees,
          location,
          documents: "", // This should be updated after document upload
          profileImage: "", // This should also be updated after upload
        },
      });

      userResponse = {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
        provider,
      };
    } else if (role === "PATIENT") {
      // Create Patient profile
      const patient = await prismaClient.patient.create({
        data: {
          userId: newUser.id,
          location,
          profileImage: "",
        },
      });

      userResponse = {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
        patient,
      };
    }

    const otp = await this.otpService.createOtp(newUser.id);

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
      user: userResponse,
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
