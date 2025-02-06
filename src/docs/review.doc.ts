export const createReview = `
/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Submit a review for a provider
 *     tags: [Review]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               feedback:
 *                 type: string
 *                 example: "Great service, highly recommend!"
 *               rating:
 *                 type: integer
 *                 example: 5
 *               providerId:
 *                 type: string
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       201:
 *         description: Review successfully submitted.
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
 *                   example: "Review submitted."
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
 *                   example: "An error occurred while submitting your review."
 */
`;
export const getAllReviews = `/**
 * @swagger
 * /reviews:
 *   get:
 *     summary: Retrieve a list of all reviews with pagination and sorting
 *     tags: [Review]
 *     security:
 *       - BearerAuth: []
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
 *         description: Successfully retrieved the reviews list with pagination
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
 *                       feedback:
 *                         type: string
 *                         example: "Great service, highly recommend!"
 *                       rating:
 *                         type: integer
 *                         example: 5
 *                       providerId:
 *                         type: string
 *                         example: "123e4567-e89b-12d3-a456-426614174000"
 *                       patient:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "abc123"
 *                           name:
 *                             type: string
 *                             example: "John Doe"
 *                       provider:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "123e4567-e89b-12d3-a456-426614174000"
 *                           name:
 *                             type: string
 *                             example: "Dr. Jane Doe"
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

export const getProviderReviews = `/**
 * @swagger
 * /reviews/{providerId}:
 *   get:
 *     summary: Retrieve a list of reviews for a specific provider with pagination and sorting
 *     tags: [Review]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: providerId
 *         in: path
 *         required: true
 *         description: The provider ID for fetching reviews
 *         schema:
 *           type: string
 *           example: "123e4567-e89b-12d3-a456-426614174000"
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
 *         description: Successfully retrieved the reviews for the provider with pagination
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
 *                       feedback:
 *                         type: string
 *                         example: "Great service, highly recommend!"
 *                       rating:
 *                         type: integer
 *                         example: 5
 *                       providerId:
 *                         type: string
 *                         example: "123e4567-e89b-12d3-a456-426614174000"
 *                       patient:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "abc123"
 *                           name:
 *                             type: string
 *                             example: "John Doe"
 *                       provider:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "123e4567-e89b-12d3-a456-426614174000"
 *                           name:
 *                             type: string
 *                             example: "Dr. Jane Doe"
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
 *                   example: "An error occurred while fetching reviews for this provider."
 */
`;
