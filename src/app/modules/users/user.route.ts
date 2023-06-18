import express from "express";
import { UserController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserSchemaValidation } from "./user.validation";

const router = express.Router();

router.get("/:id", UserController.getUserById);

router.patch(
     "/:id",
     validateRequest(UserSchemaValidation.updateUserSchema),
     UserController.updateUser
);

router.delete("/:id", UserController.deleteUserById);

router.get("/", UserController.getAllUsers);

export const UserRoutes = router;
