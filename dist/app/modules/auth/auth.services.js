"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const auth_models_1 = require("./auth.models");
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const config_1 = __importDefault(require("../../../config"));
const createUser = (paylode) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_models_1.User.create(paylode);
    return result;
});
const loginUsers = (paylode) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber, password } = paylode;
    // check user exist or not
    const isUserExist = yield auth_models_1.User.isUserExist(phoneNumber);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Admin does not found");
    }
    if (isUserExist.password &&
        !(yield auth_models_1.User.isPasswordMatch(password, isUserExist.password))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "password is incorrect");
    }
    const { role, _id } = isUserExist;
    // The refresh token is set in the browser cookie.
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ _id, role }, config_1.default.jwt.secret, config_1.default.jwt.secret_expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ _id, role }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_secret_expires_in);
    console.log(accessToken, refreshToken, "this is token");
    return {
        accessToken,
        refreshToken,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    // verify token
    let verifiedToken = null;
    try {
        verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.refresh_secret);
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "invalid refresh token");
    }
    const { _id } = verifiedToken;
    // // user deleted fromd database then have refresh token
    // // checking deleted user
    const isUserExist = yield auth_models_1.User.isUserExist(_id);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User Does not exist");
    }
    const { role, _id: UserId } = isUserExist;
    // genatate new token
    const newAccessToken = jwtHelpers_1.jwtHelpers.createToken({ UserId, role }, config_1.default.jwt.secret, config_1.default.jwt.secret_expires_in);
    return {
        accessToken: newAccessToken,
    };
});
exports.AuthUserServices = {
    createUser,
    loginUsers,
    refreshToken,
};
