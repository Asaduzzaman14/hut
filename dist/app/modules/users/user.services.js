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
exports.UserServices = void 0;
const auth_models_1 = require("../auth/auth.models");
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const admin_model_1 = require("../admin/admin.model");
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_models_1.User.find();
    return {
        data: result,
    };
});
const updateUser = (id, paylode) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(id);
    const result = yield auth_models_1.User.findOneAndUpdate({ _id: id }, paylode, {
        new: true,
    });
    return result;
});
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_models_1.User.findById(id);
    return result;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_models_1.User.findByIdAndDelete({ _id: id });
    return result;
});
const getProfileInfo = (token) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "You are not authorize");
    }
    let verifiedToken = null;
    try {
        verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.refresh_secret);
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "invalid token");
    }
    const { _id, role } = verifiedToken;
    let userDate = null;
    if (role != "admin") {
        userDate = yield auth_models_1.User.findById({ _id });
    }
    else {
        userDate = yield admin_model_1.Admin.findById({ _id });
    }
    return userDate;
});
exports.UserServices = {
    getAllUsers,
    updateUser,
    getSingleUser,
    deleteUser,
    getProfileInfo,
};
