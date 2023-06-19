"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const cow_Controller_1 = require("./cow.Controller");
const cow_Validation_1 = require("./cow.Validation");
const router = express_1.default.Router();
router.post("/", (0, validateRequest_1.default)(cow_Validation_1.CowSchemaValidation.createCowSchema), cow_Controller_1.CowController.createCow);
router.get("/:id", cow_Controller_1.CowController.getCowById);
router.patch("/:id", cow_Controller_1.CowController.updateCow);
router.delete("/:id", cow_Controller_1.CowController.deleteCow);
router.get("/", cow_Controller_1.CowController.getAllCow);
exports.CowRoutes = router;
