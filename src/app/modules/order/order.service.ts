import { SortOrder } from "mongoose";
import { IOrder } from "./order.interface";
import { Order } from "./order.model";

const createOrder = async (paylode: IOrder): Promise<IOrder | any> => {
     const result = await Order.create(paylode);
     return result;
};

const getOrder = async (id: string): Promise<IOrder[]> => {
     const result = await Order.find();
     return result;
};

export const CowServices = {
     createOrder,
     getOrder,
};
