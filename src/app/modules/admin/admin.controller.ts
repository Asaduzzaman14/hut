import { IAdminInterface } from "./admin.interfce";
import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { AdminServices } from "./admin.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const createAdminController: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...adminData } = req.body;

    const result = await AdminServices.createAdmin(adminData);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Successfully Admin Created",
      data: result,
    });
  }
);

const loginAdminController: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { logindata } = req.body;
    console.log(logindata);
  }
);

export const AdminController = {
  createAdminController,
  loginAdminController,
};
