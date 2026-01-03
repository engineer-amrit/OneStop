import express from "express";
import { adminAuth } from "@/middleware/auth/admin-auth.js";
import { productAdminRouter } from "./product-route.js";
import { advertiseAdminRouter } from "./advertise-router.js";
const router: express.Router = express.Router();


router.use(adminAuth);
router.use("/", productAdminRouter);
router.use("/", advertiseAdminRouter);
export default router;


