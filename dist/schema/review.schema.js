"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReviewSchema = void 0;
const zod_1 = require("zod");
exports.createReviewSchema = zod_1.z.object({
    providerId: zod_1.z.string().uuid(),
    feedback: zod_1.z.string(),
    rating: zod_1.z
        .number()
        .min(1, { message: "Rating must be at least 1" })
        .max(5, { message: "Rating must be 5 or less" }),
});
