export const getAllProviders = `
/**
 * @swagger
 * /providers:
 *   get:
 *     summary: Retrieve a list of all providers with pagination and sorting
 *     tags: [Provider]
 *     parameters:
 *       - name: page
 *         in: query
 *         required: false
 *         description: The page number for pagination (defaults to 1)
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: limit
 *         in: query
 *         required: false
 *         description: The number of records per page (defaults to 10)
 *         schema:
 *           type: integer
 *           example: 10
 *       - name: orderBy
 *         in: query
 *         required: false
 *         description: The field to order results by (defaults to 'createdAt')
 *         schema:
 *           type: string
 *           example: "createdAt"
 *       - name: orderDirection
 *         in: query
 *         required: false
 *         description: The direction of ordering, either 'asc' or 'desc' (defaults to 'desc')
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           example: "desc"
 *     responses:
 *       200:
 *         description: Successfully retrieved the providers list with pagination
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
 *                       name:
 *                         type: string
 *                         example: "Dr. Jane Doe"
 *                       email:
 *                         type: string
 *                         example: "jane.doe@example.com"
 *                       phone:
 *                         type: string
 *                         example: "1234567890"
 *                       specialization:
 *                         type: string
 *                         example: "Dermatologist"
 *                       profileImage:
 *                         type: string
 *                         example: "https://example.com/profile/jane.jpg"
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     totalCount:
 *                       type: integer
 *                       example: 50
 *                     totalPages:
 *                       type: integer
 *                       example: 5
 *                     currentPage:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 10
 *       500:
 *         description: Internal Server Error (Some server error)
 */
`;

export const updateProviderStatus = `/**
 * @swagger
 * /providers:
 *   patch:
 *     summary: Update the status of a provider
 *     tags: [Provider]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               providerId:
 *                 type: string
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *               status:
 *                 type: string
 *                 enum: [ACTIVE, INACTIVE, SUSPENDED]
 *                 example: "ACTIVE"
 *     responses:
 *       201:
 *         description: Provider status successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Provider status updated."
 *       400:
 *         description: Invalid request or missing required data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "Invalid input data."
 *       404:
 *         description: Provider not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "Provider not found."
 *       500:
 *         description: Internal Server Error (Some server error).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "An error occurred while updating the provider status."
 */
`;
