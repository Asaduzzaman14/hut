"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchemaValidation = void 0;
const zod_1 = require("zod");
const user_constnts_1 = require("./user.constnts");
const updateUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().optional(),
        role: zod_1.z.enum([...user_constnts_1.userRole]).optional(),
        name: zod_1.z
            .object({
            firstName: zod_1.z.string().optional(),
            lastName: zod_1.z.string().optional(),
        })
            .optional(),
        phoneNumber: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        budget: zod_1.z.number().optional(),
        income: zod_1.z.number().optional(),
    }),
});
exports.UserSchemaValidation = {
    updateUserSchema,
};
