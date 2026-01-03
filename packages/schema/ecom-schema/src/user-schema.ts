import { z } from "zod";
import { phone } from "./auth-schema.js";

const user = z.object({
  firstName: z.string()
    .min(1, { message: "First name is required." })
    .toLowerCase(),
  lastName: z.string()
    .min(1, { message: "Last name is required." })
    .toLowerCase(),
  email: z
    .email("Invalid email format.")
    .toLowerCase()
    .optional(), // optional
  phone: phone.shape.phone, // optional
  dob: z.preprocess((val) => {
    if (typeof val === "string" || val instanceof Date) {
      return new Date(val);
    }
    return undefined; // Will trigger validation error if val is invalid
  }, z.date())
    .refine((date) => date instanceof Date && !isNaN(date.getTime()), {
      message: "Date of birth must be a valid date.",
    }),
});

export { user };

//  types export
export type User = z.infer<typeof user>;