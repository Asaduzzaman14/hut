"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const http_status_1 = __importDefault(require("http-status"));
const routes_1 = __importDefault(require("./app/routes"));
const globa_Errorhandler_1 = __importDefault(require("./app/middlewares/globa;Errorhandler"));
// parser
const cookie_parser_1 = __importDefault(require("cookie-parser"));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json()); // Add this line to parse JSON data
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
// application routes
app.use("/api/v1/", routes_1.default);
// global error handler
app.use(globa_Errorhandler_1.default);
app.use((req, res) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: "Not Found",
        errorMessages: [
            {
                path: req.originalUrl,
                message: "API Is not Found",
            },
        ],
    });
});
exports.default = app;
