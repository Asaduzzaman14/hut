import { Schema, model } from "mongoose";
import { AdminModel, IAdminInterface } from "./admin.interfce";

const adminSchema = new Schema<IAdminInterface>(
  {
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      require: true,
      enum: ["admin"],
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Admin = model<IAdminInterface, AdminModel>("admin", adminSchema);
