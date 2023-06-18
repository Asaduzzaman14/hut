import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthUserController } from "./auth.controller";
import { UserSchemaValidation } from "./auth.validation";

const router = express.Router();

router.post(
     "/signup",
     validateRequest(UserSchemaValidation.createUserSchema),
     AuthUserController.createUsers
);

export const AuthUserRoutes = router;
