"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../config"));
const zod_1 = require("zod");
const handelValidationError_1 = __importDefault(require("../../errors/handelValidationError"));
const handelZodError_1 = __importDefault(require("../../errors/handelZodError"));
const handelcastError_1 = __importDefault(require("../../errors/handelcastError"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
// global error handler
const globalErrorHandler = (error, req, res, next) => {
    console.log(`global error handller`, error);
    let statusCode = 500;
    let message = "Something went wrong";
    let errorMessages = [];
    if ((error === null || error === void 0 ? void 0 : error.name) == "ValidationError") {
        const simplyfideError = (0, handelValidationError_1.default)(error);
        statusCode = simplyfideError.statusCode;
        message = simplyfideError.message;
        errorMessages = simplyfideError.errorMessages;
    }
    // Zod Error
    else if (error instanceof zod_1.ZodError) {
        const simpliFideError = (0, handelZodError_1.default)(error);
        statusCode = simpliFideError.statusCode;
        message = simpliFideError.message;
        errorMessages = simpliFideError.errorMessages;
    }
    // CastError
    else if ((error === null || error === void 0 ? void 0 : error.name) === "CastError") {
        const simpliFideError = (0, handelcastError_1.default)(error);
        statusCode = simpliFideError.statusCode;
        message = simpliFideError.message;
        errorMessages = simpliFideError.errorMessages;
    }
    // api Error
    else if (error instanceof ApiError_1.default) {
        statusCode = error.statusCode;
        message = error === null || error === void 0 ? void 0 : error.message;
        errorMessages = (error === null || error === void 0 ? void 0 : error.message)
            ? [
                {
                    path: "",
                    message: error.message,
                },
            ]
            : [];
    }
    else if (error instanceof Error) {
        message = error === null || error === void 0 ? void 0 : error.message;
        errorMessages = (error === null || error === void 0 ? void 0 : error.message)
            ? [
                {
                    path: "",
                    message: error.message,
                },
            ]
            : [];
    }
    // send error
    res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        stack: config_1.default.env !== "production" ? error === null || error === void 0 ? void 0 : error.stack : undefined,
    });
};
exports.default = globalErrorHandler;
