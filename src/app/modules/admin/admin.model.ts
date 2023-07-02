import { Schema, model } from "mongoose";
import { AdminModel, IAdminInterface } from "./admin.interfce";
import bcrypt from "bcrypt";
import config from "../../../config";

export const adminSchema = new Schema<IAdminInterface>(
  {
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin"],
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
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

// hasing password before save data
adminSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bycrypt_solt_rounds)
  );

  next();
});

export const Admin = model<IAdminInterface, AdminModel>("admin", adminSchema);
