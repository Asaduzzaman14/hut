import { Model } from "mongoose";

export type IAuthUserRole = "seller" | "buyer";

export type ILoginUser = {
  phoneNumber: string;
  password: string;
};

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

export type AuthUserModal = {
  isUserExist(phoneNumber: string): Promise<IAuthUsers>;
  isPasswordMatch(
    providedPassword: string,
    currentPassword: string
  ): Promise<boolean>;
} & Model<IAuthUsers>;

// export type AuthUserModal = Model<IAuthUsers>;
