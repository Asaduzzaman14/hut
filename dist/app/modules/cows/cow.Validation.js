"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowSchemaValidation = void 0;
const zod_1 = require("zod");
const cow_constance_1 = require("./cow.constance");
const createCowSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "name is required",
        }),
        age: zod_1.z.number().positive("Age Must be positive"),
        price: zod_1.z.number().positive("Budget must be a positive number"),
        location: zod_1.z.string({
            required_error: "location is required",
        }),
        breed: zod_1.z.string({
            required_error: "breed is required",
        }),
        category: zod_1.z.string({
            required_error: "category is required",
        }),
        weight: zod_1.z.number().positive("weight must be a positive number"),
        label: zod_1.z.enum([...cow_constance_1.cowLebel]),
        seller: zod_1.z.string({
            required_error: "Academic department is required",
        }),
    }),
});
exports.CowSchemaValidation = {
    createCowSchema,
};
