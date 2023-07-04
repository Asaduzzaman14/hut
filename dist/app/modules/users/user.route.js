"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
router.get("/:id", 
//  auth(ENUM_USER_ROLE.ADMIN),
user_controller_1.UserController.getUserById);
router.patch("/:id", (0, validateRequest_1.default)(user_validation_1.UserSchemaValidation.updateUserSchema), 
//   auth(ENUM_USER_ROLE.ADMIN),
user_controller_1.UserController.updateUser);
router.delete("/:id", 
//   auth(ENUM_USER_ROLE.ADMIN),
user_controller_1.UserController.deleteUserById);
router.get("/", 
// auth(ENUM_USER_ROLE.ADMIN),
user_controller_1.UserController.getAllUsers);
exports.UserRoutes = router;
