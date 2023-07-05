"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleCastError = (error) => {
    const errors = [
        { path: error.path, message: "Cast Error" },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: "Zod validation Error",
        errorMessages: errors,
    };
};
exports.default = handleCastError;
