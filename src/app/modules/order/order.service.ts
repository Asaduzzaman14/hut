import mongoose, { SortOrder } from "mongoose";
import { IOrder } from "./order.interface";
import { Order } from "./order.model";
import { User } from "../auth/auth.models";
import { Cow } from "../cows/cow.model";
import { cowBreed, cowLebel } from "../cows/cow.constance";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { IUserRole } from "../users/users.interface";
import { IAuthUsers } from "../auth/auth.interface";
import { string } from "zod";

const createOrder = async (paylode: any) => {
  const { cowId, buyerId } = paylode;

  // check user money
  let cowData = await Cow.findById(cowId).populate("seller");

  if (!cowData) {
    throw new ApiError(httpStatus.NOT_FOUND, "Cow not found");
  }
  if (cowData?.label !== cowLebel[0]) {
    throw new ApiError(httpStatus.NOT_FOUND, "This cow is sold out");
  }

  let buyerData = await User.findById(buyerId);
  console.log(cowData, buyerData, "111111111");

  if (buyerData) {
    if (buyerData.role !== "buyer") {
      throw new ApiError(httpStatus.NOT_ACCEPTABLE, "You are not a buyer");
    }
    if (buyerData.budget < cowData.price) {
      throw new ApiError(
        httpStatus.NOT_ACCEPTABLE,
        "Buyer does not have enough money"
      );
    }
  }

  if (buyerData && cowData) {
    let orderDone = null;
    const session = await mongoose.startSession();
    try {
      session.startTransaction();
      cowData.label = "sold out";
      await cowData.save({ session });

      buyerData.budget -= cowData.price;
      await buyerData.save({ session });
      const seller = cowData.seller as IAuthUsers;
      seller.income = seller.income + cowData.price;
      await cowData.save({ session });

      const order = { cow: cowData._id, buyer: buyerData._id };
      orderDone = await Order.create([order], { session });
      await session.commitTransaction();
      session.endSession();

      orderDone = await Order.findOne({ cow: cowId, buyer: buyerId });
      const orderDetails = { cowData, buyer: buyerData };
      const result = { orderDone, orderDetails };
      return result;
    } catch (error) {
      await session.abortTransaction();
      await session.endSession();
      throw error;
    }
  }
};

const getAllOrders = async (): Promise<IOrder[]> => {
  const result = await Order.find();
  return result;
};

const getSingleOrder = async (id: string): Promise<IOrder | null> => {
  const result = await Order.findById(id);

  return result;
};

export const OrderServices = {
  createOrder,
  getAllOrders,
  getSingleOrder,
};
