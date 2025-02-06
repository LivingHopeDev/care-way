export const createAvailability = `
/**
 * @swagger
 * /availabilities:
 *   post:
 *     summary: Create a new availability slot for a provider
 *     tags: [Availability]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               timeSlots:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     date:
 *                       type: string
 *                       format: date
 *                       example: "2025-02-01"
 *                     startTime:
 *                       type: string
 *                       format: time
 *                       example: "09:00"
 *                     endTime:
 *                       type: string
 *                       format: time
 *                       example: "17:00"
 *     responses:
 *       201:
 *         description: Availability slots were successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Availability created successfully"
 *       400:
 *         description: Bad Request (Invalid time range or missing fields)
 *       409:
 *         description: Conflict (Availability already exists for the specified date)
 *       500:
 *         description: Internal Server Error (Some server error)
 */
`;

export const getAvailabilities = `
/**
 * @swagger
 * /availabilities:
 *   get:
 *     summary: Retrieve availabilities for a provider with pagination and sorting
 *     tags: [Availability]
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
 *         description: Successfully retrieved the availabilities
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
 *                       providerId:
 *                         type: string
 *                         example: "123e4567-e89b-12d3-a456-426614174001"
 *                       date:
 *                         type: string
 *                         format: date
 *                         example: "2025-02-01"
 *                       startTime:
 *                         type: string
 *                         format: time
 *                         example: "09:00"
 *                       endTime:
 *                         type: string
 *                         format: time
 *                         example: "17:00"
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
 *       400:
 *         description: Bad Request (Invalid query parameters)
 *       500:
 *         description: Internal Server Error (Some server error)
 */
`;

export const updateAvailability = `
/**
 * @swagger
 * /availabilities/{id}:
 *   put:
 *     summary: Update an existing availability slot for a provider
 *     tags: [Availability]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the availability to update
 *         schema:
 *           type: string
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2025-02-01"
 *               startTime:
 *                 type: string
 *                 format: time
 *                 example: "09:00"
 *               endTime:
 *                 type: string
 *                 format: time
 *                 example: "17:00"
 *     responses:
 *       200:
 *         description: The availability was successfully updated
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
 *                       example: "123e4567-e89b-12d3-a456-426614174000"
 *                     providerId:
 *                       type: string
 *                       example: "123e4567-e89b-12d3-a456-426614174001"
 *                     date:
 *                       type: string
 *                       format: date
 *                       example: "2025-02-01"
 *                     startTime:
 *                       type: string
 *                       format: time
 *                       example: "09:00"
 *                     endTime:
 *                       type: string
 *                       format: time
 *                       example: "17:00"
 *       404:
 *         description: Availability not found for the given ID
 *       400:
 *         description: Bad Request (Invalid or missing fields)
 *       500:
 *         description: Internal Server Error (Some server error)
 */
`;

export const deleteAvailability = `
/**
 * @swagger
 * /availabilities/{id}:
 *   delete:
 *     summary: Delete an existing availability slot for a provider
 *     tags: [Availability]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the availability to delete
 *         schema:
 *           type: string
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       200:
 *         description: The availability was successfully deleted
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
 *                   example: "Availability deleted successfully"
 *       404:
 *         description: Availability not found for the given ID
 *       500:
 *         description: Internal Server Error (Some server error)
 */
`;
