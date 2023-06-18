import { SortOrder } from "mongoose";
import { IOrder } from "./order.interface";
import { Order } from "./order.model";

const createOrder = async (paylode: IOrder): Promise<IOrder> => {
     const result = await Order.create(paylode);
     return result;
};

const getAllOrders = async (): Promise<IOrder[]> => {
     const result = await Order.find();
     return result;
};

export const OrderServices = {
     createOrder,
     getAllOrders,
};
