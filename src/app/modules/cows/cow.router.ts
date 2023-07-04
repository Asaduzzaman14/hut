import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { CowController } from "./cow.Controller";
import { CowSchemaValidation } from "./cow.Validation";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";

const router = express.Router();

router.post(
  "/",
  validateRequest(CowSchemaValidation.createCowSchema),
  CowController.createCow
);

router.get("/:id", CowController.getCowById);

router.patch("/:id", CowController.updateCow);

router.delete("/:id", CowController.deleteCow);

router.get("/", auth(ENUM_USER_ROLE.BUYER), CowController.getAllCow);

export const CowRoutes = router;
