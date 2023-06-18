import { NextFunction, Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";
import { CowServices } from "./cow.service";
import { paginationKeys } from "../../../constants/pagination";
import pick from "../../../shared/pick";
import { cowFilterableFields } from "./cow.constance";
import { ICow } from "./cow.interface";

const createCow: RequestHandler = catchAsync(
     async (req: Request, res: Response) => {
          const { ...userData } = req.body;

          const result = await CowServices.createUser(userData);

          sendResponse(res, {
               statusCode: httpStatus.OK,
               success: true,
               message: "Cow created successfully",
               data: result,
          });
     }
);

const getAllCow: RequestHandler = catchAsync(
     async (req: Request, res: Response) => {
          const query = req.query;

          const paginationOptions = pick(query, paginationKeys);
          const filters = pick(query, cowFilterableFields);

          const result = await CowServices.getCows(filters, paginationOptions);

          sendResponse(res, {
               statusCode: httpStatus.OK,
               success: true,
               message: "Cows retrieved successfully",
               data: result.data,
               meta: result.meta,
          });
     }
);

const getCowById = catchAsync(
     async (req: Request, res: Response, next: NextFunction) => {
          const id = req.params.id;

          const result = await CowServices.getSingleCow(id);

          sendResponse<ICow>(res, {
               statusCode: httpStatus.OK,
               success: true,
               message: "Cow retrieved successfully",
               data: result,
          });
     }
);

const updateCow = catchAsync(
     async (req: Request, res: Response, next: NextFunction) => {
          const id = req.params.id;
          const updatedData = req.body;

          const result = await CowServices.updateCowById(id, updatedData);

          sendResponse<ICow>(res, {
               statusCode: httpStatus.OK,
               success: true,
               message: "Cow updated Successfully",
               data: result,
          });
     }
);
const deleteCow = catchAsync(async (req: Request, res: Response) => {
     const id = req.params.id;

     const result = await CowServices.deleteCowById(id);

     sendResponse<ICow>(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: "Cow deleted Successfully",
          data: result,
     });
});

export const CowController = {
     createCow,
     getAllCow,
     getCowById,
     updateCow,
     deleteCow,
};
