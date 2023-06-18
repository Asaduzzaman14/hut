import { cowBreed, cowLocation, cowLebel } from "./cow.constance";
import { Schema, model } from "mongoose";
import { ICow } from "./cow.interface";

export const cowSchema = new Schema<ICow>(
     {
          name: {
               type: String,
               required: true,
          },
          age: {
               type: Number,
               required: true,
          },
          price: {
               type: Number,
               required: true,
          },
          location: {
               type: String,
               required: true,
               enum: cowLocation,
          },
          breed: {
               type: String,
               required: true,
               enum: cowBreed,
          },
          weight: {
               type: Number,
               required: true,
          },
          label: {
               type: String,
               required: true,
               enum: cowLebel,
          },
          category: {
               type: String,
               required: true,
               enum: ["Dairy", "Beef", "DualPurpose"],
          },
          seller: {
               type: Schema.Types.ObjectId,
               ref: "users",
               required: true,
          },
     },
     {
          timestamps: true,
     }
);

export const Cow = model("Cow", cowSchema);
