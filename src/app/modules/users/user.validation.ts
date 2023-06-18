import { z } from "zod";
import { userRole } from "./user.constnts";

const updateUserSchema = z.object({
     body: z.object({
          password: z.string().optional(),
          role: z.enum([...userRole] as [string, ...string[]]).optional(),
          name: z
               .object({
                    firstName: z.string().optional(),
                    lastName: z.string().optional(),
               })
               .optional(),
          phoneNumber: z.string().optional(),
          address: z.string().optional(),
          budget: z.number().optional(),
          income: z.number().optional(),
     }),
});

export const UserSchemaValidation = {
     updateUserSchema,
};
