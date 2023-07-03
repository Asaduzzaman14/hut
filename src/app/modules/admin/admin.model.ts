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

adminSchema.statics.isAdminExist = async function (
  phone: string
): Promise<IAdminInterface | null> {
  const admin = await Admin.findOne({ phoneNumber: phone });

  return admin;
};

// hasing password before save data
adminSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bycrypt_solt_rounds)
  );

  next();
});

adminSchema.statics.isPasswordMatch = async function (
  providedPassword: string,
  previewsPass: string
): Promise<boolean> {
  return await bcrypt.compare(providedPassword, previewsPass);
};

export const Admin = model<IAdminInterface, AdminModel>("admin", adminSchema);
