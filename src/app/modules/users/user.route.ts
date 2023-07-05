import express from "express";
import { UserController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserSchemaValidation } from "./user.validation";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";

const router = express.Router();

router.get("/my-profile", UserController.myProfile);

router.get("/:id", auth(ENUM_USER_ROLE.ADMIN), UserController.getUserById);

router.patch(
  "/:id",
  validateRequest(UserSchemaValidation.updateUserSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.updateUser
);

router.delete(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.deleteUserById
);

router.get("/", auth(ENUM_USER_ROLE.ADMIN), UserController.getAllUsers);

export const UserRoutes = router;
