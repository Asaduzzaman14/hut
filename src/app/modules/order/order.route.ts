import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { OrderControllers } from "./order.controller";
import { ENUM_USER_ROLE } from "../../../enums/user";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post("/", auth(ENUM_USER_ROLE.BUYER), OrderControllers.createOrder);

router.get(
  "/",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  OrderControllers.createOrder
);

export const OrderRoutes = router;
