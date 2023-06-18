import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";
import { AuthUserServices } from "./auth.services";

const createUsers: RequestHandler = catchAsync(
     async (req: Request, res: Response) => {
          const { ...userData } = req.body;
          const result = await AuthUserServices.createUser(userData);

          sendResponse(res, {
               statusCode: httpStatus.OK,
               success: true,
               message: "Successfully User Created",
               data: result,
          });
     }
);

export const AuthUserController = {
     createUsers,
};
