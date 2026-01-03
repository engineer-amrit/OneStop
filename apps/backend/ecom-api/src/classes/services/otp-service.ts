import config from "@/config/config.js";
import type { Phone } from "@schema/ecom";
import { CustomError } from "@utils/api";

export class OtpService {
    send(phone: Phone["phone"], key?: string) {
        if (config.NODE_ENV !== "production") {
            if (config.TEST_KEY === key) {
                return true;
            }
            throw new CustomError({
                status: 401,
                message: "Invalid test key",
                extraDetails: "Provided test key does not match",
            })
        } else {
            console.log("sending otp to " + phone);
            return false
        }
    }
    verify() { }
}
