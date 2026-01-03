import { z } from "zod";



const phone = z.object({
    phone: z.string()
        .min(10, { message: "Phone number must be at least 10 digits." })
        .max(15, { message: "Phone number must be at most 15 digits." }).transform((val) => val.replace(/[^\d+]/g, "")),
    key: z.string().optional()
});

const otpVerification = z.object({
    otp: z.string().nonempty(
        "OTP cannot be empty."
    ).length(6, "OTP must be exactly 6 characters."
    ),
    hash: z.string().nonempty(
        "Hash cannot be empty."
    ),
    phone: phone.shape.phone
});

export {
    otpVerification,
    phone
}

// types export
export type OtpVerification = z.infer<typeof otpVerification>;
export type Phone = z.infer<typeof phone>;