import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";
import { AuthUserServices } from "./auth.services";
import config from "../../../config";

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

const loginUsers: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...loginData } = req.body;

    const result = await AuthUserServices.loginUsers(loginData);

    const { refreshToken, ...orhers } = result;

    const cookieOptions = {
      secure: config.env === "prouction",
      httpOnly: true,
    };
    res.cookie("refreshToken", result.refreshToken, cookieOptions);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User logged in successfully",
      data: orhers,
    });
  }
);

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  const result = await AuthUserServices.refreshToken(refreshToken);

  // set refresh token into cookie

  const cookieOptions = {
    secure: config.env === "prouction",
    httpOnly: true,
  };
  res.cookie("refreshToken", refreshToken, cookieOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "New access token generated successfully !",
    data: result,
  });

  // console.log(req.body);
});

export const AuthUserController = {
  createUsers,
  loginUsers,
  refreshToken,
};
