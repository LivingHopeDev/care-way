"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgetPassword = exports.resendOtp = exports.verifyOtp = exports.login = exports.signUpPatient = exports.signUpProvider = void 0;
exports.signUpProvider = `
/**
 * @swagger
 * /auth/register/provider:
 *   post:
 *     summary: Sign up a new Provider
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Dr. Jane Doe
 *               email:
 *                 type: string
 *                 example: jane.doe@example.com
 *               phone:
 *                 type: string
 *                 example: 1234567890
 *               password:
 *                 type: string
 *                 example: securePassword123
 *               gender:
 *                 type: string
 *                 enum: [MALE, FEMALE]
 *                 example: FEMALE
 *               specialization:
 *                 type: string
 *                 example: Dermatologist
 *               bus_stop:
 *                 type: string
 *                 example: XYZ Bus Stop
 *               street:
 *                 type: string
 *                 example: 123 Elm St.
 *               city:
 *                 type: string
 *                 example: Lagos
 *               state:
 *                 type: string
 *                 example: Lagos
 *               country:
 *                 type: string
 *                 example: Nigeria
 *               availability:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "9:00 AM - 5:00 PM"
 *               fees:
 *                 type: string
 *                 example: "1500"
 *               profileImage:
 *                 type: string
 *                 format: binary
 *                 description: The provider's profile image
 *               docs:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Documents uploaded by the provider
 *     responses:
 *       201:
 *         description: The Provider was successfully created and email verification OTP sent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User created successfully. Kindly check your email for the OTP."
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 123e4567-e89b-12d3-a456-426614174000
 *                     email:
 *                       type: string
 *                       example: jane.doe@example.com
 *                     role:
 *                       type: string
 *                       example: PROVIDER
 *                     provider:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: 123e4567-e89b-12d3-a456-426614174001
 *                         specialization:
 *                           type: string
 *                           example: Dermatologist
 *                         street:
 *                           type: string
 *                           example: 123 Elm St.
 *                         city:
 *                           type: string
 *                           example: Lagos
 *                         state:
 *                           type: string
 *                           example: Lagos
 *                         country:
 *                           type: string
 *                           example: Nigeria
 *                         fees:
 *                           type: integer
 *                           example: 1500
 *                         profileImage:
 *                           type: string
 *                           example: "https://cloudinary.com/careway/profile/user_123_profile.jpg"
 *       409:
 *         description: User with this email already exists
 *       400:
 *         description: Bad Request (Validation errors)
 *       500:
 *         description: Some server error
 */

`;
exports.signUpPatient = ` 
/**
 * @swagger
 * /auth/register/patient:
 *   post:
 *     summary: Sign up a new Patient
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               phone:
 *                 type: string
 *                 example: 1234567890
 *               password:
 *                 type: string
 *                 example: securePassword123
 *               gender:
 *                 type: string
 *                 example: male
 *     responses:
 *       201:
 *         description: The Patient was successfully created and email verification OTP sent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User created successfully. Kindly check your email for the OTP."
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 123e4567-e89b-12d3-a456-426614174000
 *                     email:
 *                       type: string
 *                       example: john.doe@example.com
 *                     role:
 *                       type: string
 *                       example: PATIENT
 *                     patient:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: 123e4567-e89b-12d3-a456-426614174001
 *       409:
 *         description: User with this email already exists
 *       400:
 *         description: Bad Request (Validation errors)
 *       500:
 *         description: Some server error
 */

`;
exports.login = `
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Sign up a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 example: strongpassword123
 *
 *     responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Login Successfull,
 *                 status_code:
 *                   type: number
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string         
 *                         username:
 *                           type: string
 *                         email:
 *                           type: string                     
 *                     access_token:
 *                       type: string
 *       400:
 *         description: Invalid email or password
 *       404:
 *         description: User not found
 *       500:
 *         description: Some server error
 */
`;
exports.verifyOtp = `
/**
 * @swagger
 * /auth/verify-otp:
 *   post:
 *     summary: Verify email using OTP
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string 
 *             required:
 *               - token
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request, invalid OTP or email
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
`;
exports.resendOtp = `
/**
 * @swagger
 * /auth/resend-otp:
 *   post:
 *     summary: Resend OTP for Email Verification
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *
 *     responses:
 *       200:
 *         description: OTP successfully sent to the email address
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status_code:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: OTP sent successfully
 *       400:
 *         description: Bad Request - Missing or invalid data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Bad Request
 *       404:
 *         description: User not found or email already verified
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User not found
 *       422:
 *         description: Validation Error - Invalid email format or other errors
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid email format
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal Server Error
 */
`;
exports.forgetPassword = `
/**
 * @swagger
 * /auth/password/email-request:
 *   post:
 *     summary: Send an OTP for password reset
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *
 *     responses:
 *       200:
 *         description: OTP successfully sent to the email address for password reset
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status_code:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: OTP sent successfully
 *       400:
 *         description: Bad Request - Invalid email format or missing field
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Bad Request
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User not found
 *       422:
 *         description: Validation Error - Invalid email format
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid email format
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal Server Error
 */
`;
exports.resetPassword = `
/**
 * @swagger
 * /auth/password/reset:
 *   post:
 *     summary: Reset user password with OTP
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 example: "123456"
 *                 description: OTP token sent to user's email
 *               new_password:
 *                 type: string
 *                 example: "newStrongPassword123"
 *                 description: The new password for the user
 *               confirm_password:
 *                 type: string
 *                 example: "newStrongPassword123"
 *                 description: The password confirmation to ensure no mismatch
 *     responses:
 *       200:
 *         description: Password has been successfully reset
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status_code:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Password reset successfully."
 *       400:
 *         description: Bad Request - Passwords do not match
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Password doesn't match"
 *       404:
 *         description: OTP not found or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid OTP"
 *       410:
 *         description: OTP has expired
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "OTP has expired"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */
`;
