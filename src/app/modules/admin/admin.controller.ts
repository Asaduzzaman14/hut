import { IAdminInterface } from "./admin.interfce";
import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { AdminServices } from "./admin.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import config from "../../../config";

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
    const { ...loginData } = req.body;

    const result = await AdminServices.loginAdmin(loginData);

    const { refreshToken, ...orhers } = result;

    const cookieOptions = {
      secure: config.env === "prouction",
      httpOnly: true,
    };
    res.cookie("refreshToken", result.refreshToken, cookieOptions);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Successfully Loggedin",
      data: orhers,
    });
  }
);

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  console.log(refreshToken, " this is refresh token from cookies");

  const result = await AdminServices.refreshToken(refreshToken);

  // set refresh token into cookie

  const cookieOptions = {
    secure: config.env === "prouction",
    httpOnly: true,
  };
  res.cookie("refreshToken", refreshToken, cookieOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "refresh Token",
    data: result,
  });

  // console.log(req.body);
});

export const AdminController = {
  createAdminController,
  loginAdminController,
  refreshToken,
};
