"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchemaValidation = void 0;
const zod_1 = require("zod");
const auth_constance_1 = require("./auth.constance");
const createUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string({
            required_error: "password is required",
        }),
        role: zod_1.z.enum([...auth_constance_1.userRole]),
        name: zod_1.z.object({
            firstName: zod_1.z.string({
                required_error: "First name is Required",
            }),
            lastName: zod_1.z.string({
                required_error: "First name is Required",
            }),
        }),
        phoneNumber: zod_1.z.string({
            required_error: "phoneNumber is required",
        }),
        address: zod_1.z.string({
            required_error: "address is required",
        }),
        budget: zod_1.z.number().positive("Budget must be a positive number"),
        income: zod_1.z.number().nonnegative("Income must be a non-negative number"),
    }),
});
const userLoginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        phoneNumber: zod_1.z.string({
            required_error: "Phone number is required",
        }),
        password: zod_1.z.string({
            required_error: "password is required",
        }),
    }),
});
const refreshTokenZodSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: "refreshToken is required",
        }),
    }),
});
exports.UserSchemaValidation = {
    createUserSchema,
    userLoginValidationSchema,
    refreshTokenZodSchema,
};
