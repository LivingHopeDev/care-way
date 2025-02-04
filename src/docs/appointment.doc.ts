export const bookAppointment = `
/**
 * @swagger
 * /appointment:
 *   post:
 *     summary: Book an appointment with a provider
 *     tags: [Appointment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               providerId:
 *                 type: string
 *                 description: ID of the provider for the appointment
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *               availabilityId:
 *                 type: string
 *                 description: ID of the provider's availability slot
 *                 example: "789e1234-e89b-12d3-a456-426614174001"
 *               appointmentDate:
 *                 type: string
 *                 format: date
 *                 description: Date of the appointment
 *                 example: "2025-02-01"
 *               startTime:
 *                 type: string
 *                 format: time
 *                 description: Appointment start time in HH:MM format
 *                 example: "10:00"
 *               endTime:
 *                 type: string
 *                 format: time
 *                 description: Appointment end time in HH:MM format
 *                 example: "11:00"
 *               reason:
 *                 type: string
 *                 description: Reason for the appointment
 *                 example: "Consultation for skin rash"
 *     responses:
 *       201:
 *         description: Appointment booked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "456e7890-e89b-12d3-a456-426614174002"
 *                     providerId:
 *                       type: string
 *                       example: "123e4567-e89b-12d3-a456-426614174000"
 *                     patientId:
 *                       type: string
 *                       example: "abc12345-e89b-12d3-a456-426614174003"
 *                     appointmentDate:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-02-01T10:00:00Z"
 *                     startTime:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-02-01T10:00:00Z"
 *                     endTime:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-02-01T11:00:00Z"
 *                     reason:
 *                       type: string
 *                       example: "Consultation for skin rash"
 *       400:
 *         description: Bad Request - Invalid input or overlapping appointment
 *       404:
 *         description: Resource Not Found - Availability not found
 *       500:
 *         description: Internal Server Error - Some server error
 */
`;
export const cancelAppointment = `
/**
 * @swagger
 * /appointment/{id}/cancel:
 *   patch:
 *     summary: Cancel an appointment by patient
 *     tags: [Appointment]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the appointment to cancel
 *     responses:
 *       201:
 *         description: Appointment cancelled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Appointment cancelled successfully"
 *       400:
 *         description: Bad Request - Invalid appointment ID or request
 *       404:
 *         description: Resource Not Found - Appointment not found
 *       500:
 *         description: Internal Server Error - Some server error
 */
`;
export const acceptOrRejectAppointment = `
/**
 * @swagger
 * /appointment/{id}:
 *   patch:
 *     summary: Accept or reject an appointment (Provider)
 *     tags: [Appointment]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the appointment to accept or reject
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: ["ACCEPTED", "REJECTED"]
 *                 description: New status of the appointment
 *                 example: "ACCEPTED"
 *     responses:
 *       201:
 *         description: Appointment status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Appointment accepted successfully"
 *       400:
 *         description: Bad Request - Invalid input
 *       404:
 *         description: Resource Not Found - Appointment not found
 *       500:
 *         description: Internal Server Error - Some server error
 */
`;
export const getAppointmentsByProvider = `
/**
 * @swagger
 * /appointment/provider:
 *   get:
 *     summary: Get all appointments for a provider
 *     tags: [Appointment]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of records per page
 *       - in: query
 *         name: orderBy
 *         schema:
 *           type: string
 *         description: Field to order results by
 *       - in: query
 *         name: orderDirection
 *         schema:
 *           type: string
 *           enum: ["asc", "desc"]
 *         description: Order direction (ascending or descending)
 *     responses:
 *       200:
 *         description: List of provider's appointments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "123e4567-e89b-12d3-a456-426614174000"
 *                       appointmentDate:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-02-01T10:00:00Z"
 *                       patient:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "abc12345-e89b-12d3-a456-426614174003"
 *                           name:
 *                             type: string
 *                             example: "John Doe"
 *       400:
 *         description: Bad Request - Invalid query parameters
 *       500:
 *         description: Internal Server Error - Some server error
 */
`;
export const getAppointmentsByPatient = `
/**
 * @swagger
 * /appointment/patient:
 *   get:
 *     summary: Get all appointments for a patient
 *     tags: [Appointment]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of records per page
 *       - in: query
 *         name: orderBy
 *         schema:
 *           type: string
 *         description: Field to order results by
 *       - in: query
 *         name: orderDirection
 *         schema:
 *           type: string
 *           enum: ["asc", "desc"]
 *         description: Order direction (ascending or descending)
 *     responses:
 *       200:
 *         description: List of patient's appointments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "123e4567-e89b-12d3-a456-426614174000"
 *                       appointmentDate:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-02-01T10:00:00Z"
 *                       provider:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "provider123"
 *                           name:
 *                             type: string
 *                             example: "Dr. Smith"
 *       400:
 *         description: Bad Request - Invalid query parameters
 *       500:
 *         description: Internal Server Error - Some server error
 */`;

export const getAppointmentById = `
 /**
 * @swagger
 * /appointment/{id}:
 *   get:
 *     summary: Get appointment details by ID
 *     tags: [Appointment]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the appointment to retrieve
 *     responses:
 *       200:
 *         description: Appointment details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status_code:
 *                   type: string
 *                   example: "200"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "123e4567-e89b-12d3-a456-426614174000"
 *                     appointmentDate:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-02-01T10:00:00Z"
 *                     provider:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: "provider123"
 *                         name:
 *                           type: string
 *                           example: "Dr. Smith"
 *                     patient:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: "abc12345-e89b-12d3-a456-426614174003"
 *                         name:
 *                           type: string
 *                           example: "John Doe"
 *       400:
 *         description: Bad Request - Invalid appointment ID or unauthorized access
 *       404:
 *         description: Resource Not Found - Appointment not found
 *       500:
 *         description: Internal Server Error - Some server error
 */


`;
export const deleteAppointment = `
/**
 * @swagger
 * /appointment/{id}:
 *   delete:
 *     summary: Delete an appointment (Admin)
 *     tags: [Appointment]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the appointment to delete
 *     responses:
 *       201:
 *         description: Appointment deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Appointment deleted successfully"
 *       400:
 *         description: Bad Request - Invalid appointment ID
 *       404:
 *         description: Resource Not Found - Appointment not found
 *       500:
 *         description: Internal Server Error - Some server error
 */
`;
