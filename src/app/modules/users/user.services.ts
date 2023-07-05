import { IGenericResponse } from "../../../interfaces/common";
import { User } from "../auth/auth.models";
import { IAuthUsers, IMyDate } from "../auth/auth.interface";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { Admin } from "../admin/admin.model";

const getAllUsers = async (): Promise<IGenericResponse<IAuthUsers[]>> => {
  const result = await User.find();

  return {
    data: result,
  };
};

const updateUser = async (
  id: string,
  paylode: IAuthUsers
): Promise<IAuthUsers | any> => {
  console.log(id);

  const result = await User.findOneAndUpdate({ _id: id }, paylode, {
    new: true,
  });
  return result;
};

const getSingleUser = async (id: string): Promise<IAuthUsers | null> => {
  const result = await User.findById(id);

  return result;
};

const deleteUser = async (id: string): Promise<IAuthUsers | null> => {
  const result = await User.findByIdAndDelete({ _id: id });
  return result;
};

const getProfileInfo = async (token: string): Promise<IMyDate | null> => {
  if (!token) {
    throw new ApiError(httpStatus.FORBIDDEN, "You are not authorize");
  }

  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, "invalid token");
  }

  const { _id, role } = verifiedToken;

  let userDate = null;

  if (role != "admin") {
    userDate = await User.findById({ _id });
  } else {
    userDate = await Admin.findById({ _id });
  }

  return userDate;
};

export const UserServices = {
  getAllUsers,
  updateUser,
  getSingleUser,
  deleteUser,
  getProfileInfo,
};
