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
 *     summary: Cancel an appointment
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
 *     summary: Accept or reject an appointment
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

export const deleteAppointment = `
/**
 * @swagger
 * /appointment/{id}:
 *   delete:
 *     summary: Delete an appointment
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
