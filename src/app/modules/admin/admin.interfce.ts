import { Model } from "mongoose";

export type ILoginAdmin = {
  phoneNumber: string;
  password: string;
};

type IAdminName = {
  firstName: string;
  lastName: string;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};

export type IAdminInterface = {
  phoneNumber: string;
  role: string;
  password: string;
  name: IAdminName;
  address: string;
};

// export type AdminModel = Model<IAdminInterface>;

export type AdminModel = {
  isAdminExist(phoneNumber: string): Promise<IAdminInterface>;
  isAdminExistForRefreshToken(id: string): Promise<IAdminInterface>;
  isPasswordMatch(
    providedPassword: string,
    currentPassword: string
  ): Promise<boolean>;
} & Model<IAdminInterface>;
