import express from "express";
import { UserRoutes } from "../modules/users/user.route";
import { AuthUserRoutes } from "../modules/auth/auth.router";
import { CowRoutes } from "../modules/cows/cow.router";
import { OrderRoutes } from "../modules/order/order.route";
import { AdminRoutes } from "../modules/admin/admin.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthUserRoutes,
  },
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/cows",
    route: CowRoutes,
  },
  {
    path: "/orders",
    route: OrderRoutes,
  },
  {
    path: "/admins",
    route: AdminRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
