import { z } from "zod";
import { cowLebel } from "./cow.constance";

const createCowSchema = z.object({
     body: z.object({
          name: z.string({
               required_error: "name is required",
          }),
          age: z.number().positive("Age Must be positive"),
          price: z.number().positive("Budget must be a positive number"),

          location: z.string({
               required_error: "location is required",
          }),
          breed: z.string({
               required_error: "breed is required",
          }),
          category: z.string({
               required_error: "category is required",
          }),

          weight: z.number().positive("weight must be a positive number"),

          label: z.enum([...cowLebel] as [string, ...string[]]),

          seller: z.string({
               required_error: "Academic department is required",
          }),
     }),
});

export const CowSchemaValidation = {
     createCowSchema,
};
