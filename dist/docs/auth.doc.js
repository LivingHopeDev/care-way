"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgetPassword = exports.resendOtp = exports.verifyOtp = exports.login = exports.signUp = void 0;
exports.signUp = `
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Sign up a new user (Provider or Patient)
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
 *                 example: john doe
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               phone:
 *                 type: string
 *                 example: 1234567890
 *               password:
 *                 type: string
 *                 example: test12
 *               gender:
 *                 type: string
 *                 enum: [MALE, FEMALE]
 *                 example: MALE
 *               role:
 *                 type: string
 *                 enum: [PROVIDER, PATIENT]
 *                 example: PROVIDER
 *               specialization:
 *                 type: string
 *                 example: Dermatologist
 *                 description: Required if role is PROVIDER
 *               location:
 *                 type: object
 *                 description: User's location details
 *                 properties:
 *                   street:
 *                     type: string
 *                     example: abc
 *                   city:
 *                     type: string
 *                     example: lagos
 *                   state:
 *                     type: string
 *                     example: lagos
 *                   country:
 *                     type: string
 *                     example: nigeria
 *               availability:
 *                 type: array
 *                 description: Provider's availability schedule (required if role is PROVIDER)
 *                 items:
 *                   type: object
 *                   properties:
 *                     day:
 *                       type: string
 *                       example: wed
 *                     start:
 *                       type: string
 *                       format: time
 *                       example: 09:00
 *                     end:
 *                       type: string
 *                       format: time
 *                       example: 17:00
 *               fees:
 *                 type: number
 *                 example: 321
 *                 description: Required if role is PROVIDER
 *     responses:
 *       201:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: User Created Successfully, Kindly check your mail for your verification token
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: 123e4567-e89b-12d3-a456-426614174000
 *                         name:
 *                           type: string
 *                           example: john doe
 *                         email:
 *                           type: string
 *                           example: john.doe@example.com
 *                         role:
 *                           type: string
 *                           example: PROVIDER
 *                     access_token:
 *                       type: string
 *                       example: jwt-token-here
 *       409:
 *         description: User already exists
 *       400:
 *         description: Bad Request (Validation errors)
 *       500:
 *         description: Some server error
 */
`;
// export const signUpProvider = `
// /**
//  * @swagger
//  * /auth/register:
//  *   post:
//  *     summary: Sign up a new Provider
//  *     tags: [Authentication]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               name:
//  *                 type: string
//  *                 example: john doe
//  *               email:
//  *                 type: string
//  *                 example: adewobiadetayo1@gmail.com
//  *               phone:
//  *                 type: string
//  *                 example: 1234567890
//  *               password:
//  *                 type: string
//  *                 example: test12
//  *               gender:
//  *                 type: string
//  *                 enum: [MALE, FEMALE]
//  *                 example: MALE
//  *               role:
//  *                 type: string
//  *                 enum: [PROVIDER]
//  *                 example: PROVIDER
//  *               specialization:
//  *                 type: string
//  *                 example: Dermatologist
//  *               location:
//  *                 type: object
//  *                 description: Provider's location details
//  *                 properties:
//  *                   street:
//  *                     type: string
//  *                     example: abc
//  *                   city:
//  *                     type: string
//  *                     example: lagos
//  *                   state:
//  *                     type: string
//  *                     example: lagos
//  *                   country:
//  *                     type: string
//  *                     example: nigeria
//  *               availability:
//  *                 type: array
//  *                 description: Provider's availability schedule
//  *                 items:
//  *                   type: object
//  *                   properties:
//  *                     day:
//  *                       type: string
//  *                       example: wed
//  *                     start:
//  *                       type: string
//  *                       format: time
//  *                       example: 09:00
//  *                     end:
//  *                       type: string
//  *                       format: time
//  *                       example: 17:00
//  *               fees:
//  *                 type: number
//  *                 example: 321
//  *     responses:
//  *       201:
//  *         description: The Provider was successfully created
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 status:
//  *                   type: number
//  *                   example: 201
//  *                 message:
//  *                   type: string
//  *                   example: Provider Created Successfully, Kindly check your mail for your verification token
//  *                 data:
//  *                   type: object
//  *                   properties:
//  *                     user:
//  *                       type: object
//  *                       properties:
//  *                         id:
//  *                           type: string
//  *                           example: 123e4567-e89b-12d3-a456-426614174000
//  *                         name:
//  *                           type: string
//  *                           example: john doe
//  *                         email:
//  *                           type: string
//  *                           example: adewobiadetayo1@gmail.com
//  *                         role:
//  *                           type: string
//  *                           example: PROVIDER
//  *                         specialization:
//  *                           type: string
//  *                           example: Dermatologist
//  *                     access_token:
//  *                       type: string
//  *                       example: jwt-token-here
//  *       409:
//  *         description: Provider already exists
//  *       400:
//  *         description: Bad Request (Validation errors)
//  *       500:
//  *         description: Some server error
//  */
// `;
// export const signUpPatient = `
// /**
//  * @swagger
//  * /auth/register:
//  *   post:
//  *     summary: Sign up a new Patient
//  *     tags: [Authentication]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               name:
//  *                 type: string
//  *                 example: john doe
//  *               email:
//  *                 type: string
//  *                 example: adewobiadetayo11@gmail.com
//  *               phone:
//  *                 type: string
//  *                 example: 1234567891
//  *               password:
//  *                 type: string
//  *                 example: test12
//  *               gender:
//  *                 type: string
//  *                 enum: [MALE, FEMALE]
//  *                 example: MALE
//  *               role:
//  *                 type: string
//  *                 enum: [PATIENT]
//  *                 example: PATIENT
//  *               location:
//  *                 type: object
//  *                 description: Patient's location details
//  *                 properties:
//  *                   street:
//  *                     type: string
//  *                     example: abc
//  *                   city:
//  *                     type: string
//  *                     example: lagos
//  *                   state:
//  *                     type: string
//  *                     example: lagos
//  *                   country:
//  *                     type: string
//  *                     example: nigeria
//  *     responses:
//  *       201:
//  *         description: The Patient was successfully created
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 status:
//  *                   type: number
//  *                   example: 201
//  *                 message:
//  *                   type: string
//  *                   example: Patient Created Successfully, Kindly check your mail for your verification token
//  *                 data:
//  *                   type: object
//  *                   properties:
//  *                     user:
//  *                       type: object
//  *                       properties:
//  *                         id:
//  *                           type: string
//  *                           example: 123e4567-e89b-12d3-a456-426614174000
//  *                         name:
//  *                           type: string
//  *                           example: john doe
//  *                         email:
//  *                           type: string
//  *                           example: adewobiadetayo11@gmail.com
//  *                         role:
//  *                           type: string
//  *                           example: PATIENT
//  *                     access_token:
//  *                       type: string
//  *                       example: jwt-token-here
//  *       409:
//  *         description: Patient already exists
//  *       400:
//  *         description: Bad Request (Validation errors)
//  *       500:
//  *         description: Some server error
//  */
// `;
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
