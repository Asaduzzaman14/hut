import { z } from "zod";
import { userRole } from "./auth.constance";

const createUserSchema = z.object({
     body: z.object({
          password: z.string({
               required_error: "password is required",
          }),

          role: z.enum([...userRole] as [string, ...string[]]),
          name: z.object({
               firstName: z.string({
                    required_error: "First name is Required",
               }),
               lastName: z.string({
                    required_error: "First name is Required",
               }),
          }),
          phoneNumber: z.string({
               required_error: "phoneNumber is required",
          }),
          address: z.string({
               required_error: "address is required",
          }),
          budget: z.number().positive("Budget must be a positive number"),
          income: z
               .number()
               .nonnegative("Income must be a non-negative number"),
     }),
});

export const UserSchemaValidation = {
     createUserSchema,
};
