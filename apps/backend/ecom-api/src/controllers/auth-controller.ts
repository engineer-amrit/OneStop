import { generalLogger } from "../utils/logger.js";
import { block } from "@/classes/controllers/blockHandler.js";
import type { AuthService } from "@/classes/services/auth-service.js";
import type { CookieService } from "@/classes/services/cookie-service.js";
import type { OtpService } from "@/classes/services/otp-service.js";
import type { OtpVerification, Phone } from "@schema/ecom";

export class AuthController {
  constructor(
    private otp: OtpService,
    private auth: AuthService,
    private cookie: CookieService
  ) { }
  // Send OTP controller
  sendOTP = block.createController(async (req, res) => {
    const data = req.body as Phone;
    if (this.otp.send(data.phone, data.key)) {
      const { refreshToken, accessToken } = await this.auth.login(data);
      this.cookie.setAuth(res, { accessToken, refreshToken });
      res.status(200).json({ message: "Key is valid, user has been logged in" });
      return;
    }
    res.status(200).json({ message: "OTP sent successfully" });

    // log the details
    generalLogger.info(req, {
      action: "OTP sent",
      message: `OTP sent successfully to phone: ${data.phone}`,
    });
  }, "error in sending OTP");

  // Verify OTP controller
  verifyOTP = block.createController(async (req, res) => {

    const data = req.body as OtpVerification;
    this.otp.verify();
    await this.auth.login({ phone: data.phone });
    res.status(200).json({ message: "OTP verified and user logged in successfully" });

    // log the details
    generalLogger.info(req, {
      action: "OTP verified",
      message: `OTP verified successfully for phone: ${data.phone}`,
    });
  }, "error in verifying OTP");
}



