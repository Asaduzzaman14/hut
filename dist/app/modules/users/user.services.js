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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const auth_models_1 = require("../auth/auth.models");
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
exports.UserServices = {
    getAllUsers,
    updateUser,
    getSingleUser,
    deleteUser,
};
