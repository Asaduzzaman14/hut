import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import { AuthUserModal, IAuthUsers } from "./auth.interface";
import config from "../../../config";
import { boolean } from "zod";
import { IAdminInterface } from "../admin/admin.interfce";

const userSchema = new Schema<IAuthUsers>(
  {
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
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
    budget: {
      type: Number,
      required: true,
      min: 0,
    },
    income: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

// hasing password before save data
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bycrypt_solt_rounds)
  );

  next();
});

// userSchema.statics.isUserExist = async function (
//   phone: string
// ): Promise<IAuthUsers | null> {
//   const user = await User.findOne({ phoneNumber: phone });

//   return user;
// };

userSchema.statics.isPasswordMatch = async function (
  providedPassword: string,
  previewsPass: string
): Promise<boolean> {
  return await bcrypt.compare(providedPassword, previewsPass);
};

userSchema.statics.isUserExist = async function (
  phone: string
): Promise<IAdminInterface | null> {
  const user = await User.findOne({ phoneNumber: phone });

  return user;
};

export const User = model<IAuthUsers, AuthUserModal>("users", userSchema);
