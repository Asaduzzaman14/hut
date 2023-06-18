// import { NextFunction, Request, RequestHandler, Response } from "express";
// import httpStatus from "http-status";
// import sendResponse from "../../../shared/sendResponse";
// import catchAsync from "../../../shared/catchAsync";
// import { paginationKeys } from "../../../constants/pagination";
// import pick from "../../../shared/pick";

// const createOrder: RequestHandler = catchAsync(
//      async (req: Request, res: Response) => {
//           const { ...userData } = req.body;

//           const result = await OrderServices.createOrder;

//           sendResponse(res, {
//                statusCode: httpStatus.OK,
//                success: true,
//                message: "Cow created successfully",
//                data: result,
//           });
//      }
// );

// const getAllOrders: RequestHandler = catchAsync(
//      async (req: Request, res: Response) => {
//           const query = req.query;

//           const result = await

//           sendResponse(res, {
//                statusCode: httpStatus.OK,
//                success: true,
//                message: "Cows retrieved successfully",
//                data: result.data,
//                meta: result.meta,
//           });
//      }
// );

// export const CowController = {
//   createOrder,
//      getAllOrders,

// };
