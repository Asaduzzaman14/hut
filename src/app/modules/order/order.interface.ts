import { Model, Types } from "mongoose";
import { ICow } from "../cows/cow.interface";
import { IAuthUsers } from "../auth/auth.interface";

export type IOrder = {
     cow: Types.ObjectId | ICow;
     buyer: Types.ObjectId | IAuthUsers;
};

export type OrderModal = Model<IOrder, object>;
