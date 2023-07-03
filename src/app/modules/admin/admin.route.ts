import express from "express";
import { AdminController } from "./admin.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AdminSchemaValidation } from "./admin.validation";

const router = express.Router();

router.post(
  "/create-admin",
  validateRequest(AdminSchemaValidation.adminValidationSchema),
  AdminController.createAdminController
);

router.post(
  "/login",
  validateRequest(AdminSchemaValidation.adminLoginValidationSchema),
  AdminController.loginAdminController
);

router.post(
  "/refresh-token",
  validateRequest(AdminSchemaValidation.refreshTokenZodSchema),
  AdminController.refreshToken
);

export const AdminRoutes = router;
