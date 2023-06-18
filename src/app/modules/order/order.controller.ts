import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";
import { OrderServices } from "./order.service";

const createOrder: RequestHandler = catchAsync(
     async (req: Request, res: Response) => {
          const { ...OrderData } = req.body;

          const result = await OrderServices.createOrder(OrderData);

          sendResponse(res, {
               statusCode: httpStatus.OK,
               success: true,
               message: "Order created successfully",
               data: result,
          });
     }
);

const getAllOrders: RequestHandler = catchAsync(
     async (req: Request, res: Response) => {
          const result = await OrderServices.getAllOrders();

          sendResponse(res, {
               statusCode: httpStatus.OK,
               success: true,
               message: "Order retrieved successfully",
               data: result,
          });
     }
);

export const OrderControllers = {
     createOrder,
     getAllOrders,
};
