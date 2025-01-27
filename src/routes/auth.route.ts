import { Router } from "express";
import { authMiddleware, validateData } from "../middlewares";
import {
  loginSchema,
  PatientSignUpSchema,
  ProviderSignUpSchema,
  otpSchema,
  resetPasswordSchema,
  resendOtpSchema,
} from "../schema/user.schema";
import {
  forgetPassword,
  login,
  logout,
  resendOtp,
  resetPassword,
  patientSignUp,
  providerSignUp,
  verifyOtp,
} from "../controllers";
const authRouter: Router = Router();
import { uploadFiles } from "../utils/multer";

authRouter.post(
  "/register/patient",
  validateData(PatientSignUpSchema),
  patientSignUp
);

authRouter.post(
  "/register/provider",
  uploadFiles,
  validateData(ProviderSignUpSchema),
  providerSignUp
);

authRouter.post("/login", validateData(loginSchema), login);
authRouter.post(
  "/password/reset",
  validateData(resetPasswordSchema),
  resetPassword
);
authRouter.post(
  "/password/email-request",
  validateData(resendOtpSchema),
  forgetPassword
);
authRouter.post("/verify-otp", validateData(otpSchema), verifyOtp);
authRouter.post("/resend-otp", validateData(resendOtpSchema), resendOtp);

authRouter.post("/logout", authMiddleware, logout);

export { authRouter };
