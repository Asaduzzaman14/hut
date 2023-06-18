import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { OrderControllers } from "./order.controller";

const router = express.Router();

router.post("/", OrderControllers.createOrder);

router.get("/", OrderControllers.createOrder);

export const OrderRoutes = router;
