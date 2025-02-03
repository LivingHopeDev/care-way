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
