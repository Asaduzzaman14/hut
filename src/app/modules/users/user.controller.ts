import {
     NextFunction,
     Request,
     RequestHandler,
     Response,
     request,
} from "express";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";
import { UserServices } from "./user.services";
import { User } from "./users.models";
import { IAuthUsers } from "../auth/auth.interface";
// import { IUsers } from "./users.interface";

const getAllUsers = catchAsync(
     async (req: Request, res: Response, next: NextFunction) => {
          const result = await UserServices.getAllUsers();

          sendResponse<IAuthUsers[]>(res, {
               statusCode: httpStatus.OK,
               success: true,
               message: "user Retrieved Successfully",
               data: result.data,
          });
     }
);

const updateUser = catchAsync(
     async (req: Request, res: Response, next: NextFunction) => {
          const id = req.params.id;
          const updatedData = req.body;

          const result = await UserServices.updateUser(id, updatedData);

          sendResponse<IAuthUsers>(res, {
               statusCode: httpStatus.OK,
               success: true,
               message: "user updated Successfully",
               data: result,
          });
     }
);

const getUserById = catchAsync(
     async (req: Request, res: Response, next: NextFunction) => {
          const id = req.params.id;
          console.log(id);

          const result = await UserServices.getSingleUser(id);

          sendResponse<IAuthUsers>(res, {
               statusCode: httpStatus.OK,
               success: true,
               message: "Student updated Successfully",
               data: result,
          });
     }
);

const deleteUserById = async (
     req: Request,
     res: Response,
     next: NextFunction
) => {
     const id = req.params.id;

     const result = await UserServices.deleteUser(id);
     sendResponse(res, {
          statusCode: httpStatus.OK,
          success: true,
          message: "User deleted successfully",
          data: result,
     });
};

export const UserController = {
     getAllUsers,
     updateUser,
     getUserById,
     deleteUserById,
};
