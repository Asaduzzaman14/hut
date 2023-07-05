import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IAuthUsers, ILoginUser } from "./auth.interface";
import { User } from "./auth.models";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";
import { IRefreshTokenResponse } from "../admin/admin.interfce";

const createUser = async (paylode: IAuthUsers): Promise<IAuthUsers> => {
  const result = await User.create(paylode);
  return result;
};

const loginUsers = async (paylode: ILoginUser) => {
  const { phoneNumber, password } = paylode;

  // check user exist or not

  const isUserExist = await User.isUserExist(phoneNumber);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Admin does not found");
  }

  if (
    isUserExist.password &&
    !(await User.isPasswordMatch(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "password is incorrect");
  }

  const { role, _id } = isUserExist as any;

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
  const isUserExist = await User.isUserExist(_id);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User Does not exist");
  }

  const { role, _id: UserId } = isUserExist as any;
  // genatate new token

  const newAccessToken = jwtHelpers.createToken(
    { UserId, role },
    config.jwt.secret as Secret,
    config.jwt.secret_expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthUserServices = {
  createUser,
  loginUsers,
  refreshToken,
};
