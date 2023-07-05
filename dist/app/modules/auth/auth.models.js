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
exports.User = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../../../config"));
const userSchema = new mongoose_1.Schema({
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        required: true,
    },
    name: {
        type: {
            firstName: {
                type: String,
                required: true,
            },
            lastName: {
                type: String,
                required: true,
            },
        },
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    budget: {
        type: Number,
        required: true,
        min: 0,
    },
    income: {
        type: Number,
        required: true,
        min: 0,
    },
}, {
    timestamps: true,
});
// hasing password before save data
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.password = yield bcrypt_1.default.hash(this.password, Number(config_1.default.bycrypt_solt_rounds));
        next();
    });
});
// userSchema.statics.isUserExist = async function (
//   phone: string
// ): Promise<IAuthUsers | null> {
//   const user = await User.findOne({ phoneNumber: phone });
//   return user;
// };
userSchema.statics.isPasswordMatch = function (providedPassword, previewsPass) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(providedPassword, previewsPass);
    });
};
userSchema.statics.isUserExist = function (phone) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield exports.User.findOne({ phoneNumber: phone });
        return user;
    });
};
exports.User = (0, mongoose_1.model)("users", userSchema);
