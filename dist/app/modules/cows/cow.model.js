"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cow = exports.cowSchema = void 0;
const cow_constance_1 = require("./cow.constance");
const mongoose_1 = require("mongoose");
exports.cowSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
        enum: cow_constance_1.cowLocation,
    },
    breed: {
        type: String,
        required: true,
        enum: cow_constance_1.cowBreed,
    },
    weight: {
        type: Number,
        required: true,
    },
    label: {
        type: String,
        required: true,
        enum: cow_constance_1.cowLebel,
    },
    category: {
        type: String,
        required: true,
        enum: ["Dairy", "Beef", "DualPurpose"],
    },
    seller: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
}, {
    timestamps: true,
});
exports.Cow = (0, mongoose_1.model)("Cow", exports.cowSchema);
