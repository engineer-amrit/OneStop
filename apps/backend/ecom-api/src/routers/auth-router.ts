import express from "express";
import { Validator, blockHandler } from "@utils/api";
import { otpVerification, phone } from "@schema/ecom";
import { AuthController } from "../controllers/auth-controller.js";
import { authService, cookieService, otpService } from "@/classes/services/dependency-injection.js";

const validator = new Validator(blockHandler).validator;

const authController = new AuthController(
    otpService,
    authService,
    cookieService
);

const router: express.Router = express.Router();

// /otp
router.post("/", validator({ body: phone }), authController.sendOTP);
router.post("/otp", validator({ body: otpVerification }), authController.verifyOTP);

export default router;
