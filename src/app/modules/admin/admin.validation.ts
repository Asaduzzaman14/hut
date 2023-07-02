import { z } from "zod";

const adminValidationSchema = z.object({
  body: z.object({
    phoneNumber: z.string({
      required_error: "Phone number is required",
    }),

    role: z.enum(["admin"]),

    password: z.string({
      required_error: "Password is required",
    }),
    name: z.object({
      firstName: z.string({
        required_error: "First name is required",
      }),
      lastName: z.string({
        required_error: "last name is required",
      }),
    }),
    address: z.string({
      required_error: "Address is required",
    }),
  }),
});

const adminLoginValidationSchema = z.object({
  body: z.object({
    phoneNumber: z.string({
      required_error: "Phone number is required",
    }),
    password: z.string({
      required_error: "password is required",
    }),
  }),
});

export const AdminSchemaValidation = {
  adminValidationSchema,
  adminLoginValidationSchema,
};
