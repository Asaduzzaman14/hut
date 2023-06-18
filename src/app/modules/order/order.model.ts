import { Schema, model } from "mongoose";
import { IOrder, OrderModal } from "./order.interface";

const orderSchema = new Schema<IOrder>(
     {
          cow: {
               type: Schema.Types.ObjectId,
               ref: "Cow",
          },
          buyer: {
               type: Schema.Types.ObjectId,
               ref: "users",
          },
     },
     {
          timestamps: true,
     }
);

export const Order = model<IOrder, OrderModal>("Orders", orderSchema);
