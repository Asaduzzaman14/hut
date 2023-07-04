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
exports.OrderServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const order_model_1 = require("./order.model");
const auth_models_1 = require("../auth/auth.models");
const cow_model_1 = require("../cows/cow.model");
const cow_constance_1 = require("../cows/cow.constance");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const createOrder = (paylode) => __awaiter(void 0, void 0, void 0, function* () {
    const { cowId, buyerId } = paylode;
    // check user money
    let cowData = yield cow_model_1.Cow.findById(cowId).populate("seller");
    if (!cowData) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Cow not found");
    }
    if ((cowData === null || cowData === void 0 ? void 0 : cowData.label) !== cow_constance_1.cowLebel[0]) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "This cow is sold out");
    }
    let buyerData = yield auth_models_1.User.findById(buyerId);
    console.log(cowData, buyerData, "111111111");
    if (buyerData) {
        if (buyerData.role !== "buyer") {
            throw new ApiError_1.default(http_status_1.default.NOT_ACCEPTABLE, "You are not a buyer");
        }
        if (buyerData.budget < cowData.price) {
            throw new ApiError_1.default(http_status_1.default.NOT_ACCEPTABLE, "Buyer does not have enough money");
        }
    }
    if (buyerData && cowData) {
        let orderDone = null;
        const session = yield mongoose_1.default.startSession();
        try {
            session.startTransaction();
            cowData.label = "sold out";
            yield cowData.save({ session });
            buyerData.budget -= cowData.price;
            yield buyerData.save({ session });
            const seller = cowData.seller;
            seller.income = seller.income + cowData.price;
            yield cowData.save({ session });
            const order = { cow: cowData._id, buyer: buyerData._id };
            orderDone = yield order_model_1.Order.create([order], { session });
            yield session.commitTransaction();
            session.endSession();
            orderDone = yield order_model_1.Order.findOne({ cow: cowId, buyer: buyerId });
            const orderDetails = { cowData, buyer: buyerData };
            const result = { orderDone, orderDetails };
            return result;
        }
        catch (error) {
            yield session.abortTransaction();
            yield session.endSession();
            throw error;
        }
    }
});
const getAllOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.find();
    return result;
});
exports.OrderServices = {
    createOrder,
    getAllOrders,
};
