// zod shcema
import { z } from "zod";

const UserSchema = z.object({
  firstName: z.string().min(2, { message: "is required" }),
  lastName: z.string().min(2, { message: "is required " }),
  email: z.string().email("Invalid email format").optional().or(z.literal("")),
  dob: z.object({
    day: z
      .number({
        required_error: "Day is required",
        message: "Day must be a number",
      })
      .refine((data) => data >= 1 && data <= 31, {
        message: "Day must be between 1 and 31",
      }),
    month: z
      .number({
        required_error: "Month is required",
        message: "Month must be a number",
      })
      .refine((data) => data >= 1 && data <= 12, {
        message: "Month must be between 1 and 12",
      }),
    year: z
      .number({
        required_error: "Year is required",
        message: "Year must be a number",
      })
      .refine((data) => data >= 1900 && data <= new Date().getFullYear(), {
        message: "Year must be between 1900 and current year",
      }),
  }),
  address: z.object({
    streetAddress1: z.string().min(1, { message: "is required" }),
    streetAddress2: z
      .string()
      .min(1, { message: "is required" })
      .optional()
      .or(z.literal("")),
    landmark: z.string().min(1, { message: "is required" }),
    city: z.string().min(1, { message: "is required" }),
    state: z.string().min(1, { message: "is required" }),
    pincode: z.string().length(6, { message: "must be 6 digits" }),
    useAsDeliveryAddress: z.boolean().optional(),
  }),
});

export type UserFormData = z.infer<typeof UserSchema>;

export default UserSchema;
