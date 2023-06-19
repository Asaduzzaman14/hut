"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
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
    address: {
        type: String,
        required: true,
    },
    budget: {
        type: String,
        required: true,
    },
    income: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
exports.User = (0, mongoose_1.model)("users", userSchema);
