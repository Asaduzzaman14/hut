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
exports.AdminServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const admin_model_1 = require("./admin.model");
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const config_1 = __importDefault(require("../../../config"));
const createAdmin = (paylode) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_model_1.Admin.create(paylode);
    return result;
});
const loginAdmin = (paylode) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber, password } = paylode;
    // check admin exist or not
    const isAdminExist = yield admin_model_1.Admin.isAdminExist(phoneNumber);
    if (!isAdminExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Admin does not found");
    }
    if (isAdminExist.password &&
        !(yield admin_model_1.Admin.isPasswordMatch(password, isAdminExist.password))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "password is incorrect");
    }
    const { role, _id } = isAdminExist;
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
    console.log(verifiedToken);
    // // user deleted fromd database then have refresh token
    // // checking deleted user
    const isAdminExist = yield admin_model_1.Admin.isAdminExist(_id);
    if (!isAdminExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Admin Does not exist");
    }
    const { role, _id: AdminId } = isAdminExist;
    // genatate new token
    const newAccessToken = jwtHelpers_1.jwtHelpers.createToken({ AdminId, role }, config_1.default.jwt.secret, config_1.default.jwt.secret_expires_in);
    return {
        accessToken: newAccessToken,
    };
});
exports.AdminServices = {
    createAdmin,
    loginAdmin,
    refreshToken,
};
