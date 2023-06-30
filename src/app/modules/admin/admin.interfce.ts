import { Model } from "mongoose";

type IAdminName = {
  firstName: string;
  lastName: string;
};

export type IAdminInterface = {
  phoneNumber: string;
  role: string;
  password: string;
  name: IAdminName;
  address: string;
};

export type AdminModel = Model<IAdminInterface>;
