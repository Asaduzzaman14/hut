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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowServices = void 0;
const paginationhelpers_1 = __importDefault(require("../../../helpers/paginationhelpers"));
const cow_constance_1 = require("./cow.constance");
const cow_model_1 = require("./cow.model");
const createUser = (paylode) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_model_1.Cow.create(paylode);
    return result;
});
const getCows = (filters, pageinationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    // const { query, ...filtersData } = filters;
    const { searchTerm, minPrice, maxPrice } = filters, filtersData = __rest(filters, ["searchTerm", "minPrice", "maxPrice"]);
    const andCondation = [];
    if (searchTerm) {
        andCondation.push({
            $or: cow_constance_1.cowSearchingFields.map((field) => ({
                [field]: { $regex: searchTerm, $options: "i" },
            })),
        });
    }
    if (minPrice) {
        andCondation.push({
            price: {
                $gte: Number(minPrice),
            },
        });
    }
    if (maxPrice) {
        andCondation.push({
            price: {
                $lte: Number(maxPrice),
            },
        });
    }
    if (Object.keys(filtersData).length) {
        andCondation.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const { page, limit, skip, sortBy, sortOrder } = (0, paginationhelpers_1.default)(pageinationOptions);
    const sortCondations = {};
    if (sortBy && sortOrder) {
        sortCondations[sortBy] = sortOrder;
    }
    const requestCondetion = andCondation.length > 0 ? { $and: andCondation } : {};
    const result = yield cow_model_1.Cow.find(requestCondetion)
        .populate("seller")
        .sort(sortCondations)
        .skip(skip)
        .limit(limit);
    const total = yield cow_model_1.Cow.countDocuments(requestCondetion);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleCow = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_model_1.Cow.findById(id);
    return result;
});
const updateCowById = (id, paylode) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(id);
    const result = yield cow_model_1.Cow.findOneAndUpdate({ _id: id }, paylode, {
        new: true,
    });
    return result;
});
const deleteCowById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_model_1.Cow.findByIdAndDelete(id).populate("seller");
    return result;
});
exports.CowServices = {
    createUser,
    getCows,
    getSingleCow,
    updateCowById,
    deleteCowById,
};
