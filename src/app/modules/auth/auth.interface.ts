import { Model } from "mongoose";

export type IAuthUserRole = "seller" | "buyer";

export type IAuthUsers = {
  phoneNumber: string;
  role: IAuthUserRole;
  password: string;
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
  budget: number;
  income: number;
};

export type AuthUserModal = Model<IAuthUsers>;
