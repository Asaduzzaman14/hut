import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import {
  IAdminInterface,
  ILoginAdmin,
  IRefreshTokenResponse,
} from "./admin.interfce";
import { Admin } from "./admin.model";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";

const createAdmin = async (paylode: IAdminInterface) => {
  const result = await Admin.create(paylode);
  return result;
};

const loginAdmin = async (paylode: ILoginAdmin) => {
  const { phoneNumber, password } = paylode;

  // check admin exist or not

  const isAdminExist = await Admin.isAdminExist(phoneNumber);

  if (!isAdminExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Admin does not found");
  }

  if (
    isAdminExist.password &&
    !(await Admin.isPasswordMatch(password, isAdminExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "password is incorrect");
  }

  const { role, _id } = isAdminExist as any;

  // The refresh token is set in the browser cookie.
  const accessToken = jwtHelpers.createToken(
    { _id, role },
    config.jwt.secret as Secret,
    config.jwt.secret_expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { _id, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_secret_expires_in as string
  );
  console.log(accessToken, refreshToken, "this is token");

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  // verify token
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, "invalid refresh token");
  }

  const { _id } = verifiedToken;

  // // user deleted fromd database then have refresh token
  // // checking deleted user
  const isAdminExist = await Admin.isAdminExist(_id);
  if (!isAdminExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User Does not exist");
  }

  const { role, _id: AdminId } = isAdminExist as any;
  // genatate new token

  const newAccessToken = jwtHelpers.createToken(
    { AdminId, role },
    config.jwt.secret as Secret,
    config.jwt.secret_expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AdminServices = {
  createAdmin,
  loginAdmin,
  refreshToken,
};
