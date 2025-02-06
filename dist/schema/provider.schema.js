"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProviderStatusSchema = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
exports.updateProviderStatusSchema = zod_1.z.object({
    providerId: zod_1.z.string().uuid(),
    status: zod_1.z.nativeEnum(client_1.ProviderStatus),
});
