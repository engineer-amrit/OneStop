import { z } from "zod";

const variant = z.object({
  unit: z.string("Unit is required").nonempty("Unit is required").transform((val) => val.toLowerCase()),
  magnitude: z.coerce.number("Magnitude is required").nonnegative("Magnitude cannot be negative"),
  price: z.coerce.number("Price is required").nonnegative("Price cannot be negative"),
  discount: z.coerce.number("Discount is required").nonnegative("Discount cannot be negative").max(100, "Discount cannot exceed 100%"),
  stock: z.coerce.number("Stock is required").nonnegative("Stock cannot be negative"),
})


export const product = z.object({
  sideImages: z
    .array(z.string("File is missing"), "At least 2 side images are required")
    .min(2, "At least 2 side images are required")
    .max(5, "At most 5 side images are allowed"),

  thumbnail: z
    .string({ message: "Thumbnail is required" })
    .nonempty({ message: "Thumbnail is required" }),

  gst: z.coerce.number("GST is required").nonnegative("can't be negative").max(100, "can't exceed 100%"),

  draft: z.string().transform((val) => val === "true"),
  upComing: z.string().transform((val) => val === "true"),
  name: z
    .string("Product name is required")
    .nonempty("Product name is required")
    .transform((val) => val.toLowerCase()),

  description: z
    .string("Description is required")
    .nonempty("Description is required"),

  category: z
    .string("Category is required")
    .nonempty("Category is required")
    .transform((val) => val.toLowerCase()),

  subCategory: z
    .string("Sub-category is required")
    .nonempty("Sub-category is required")
    .transform((val) => val.toLowerCase()),

  variants: z.array(
    variant,
    "At least one variant is required")
    .min(1, "At least one variant is required"),

  brand: z
    .string("Brand is required")
    .nonempty("Brand is required")
    .transform((val) => val.toLowerCase()),

  sku: z
    .string("SKU is required")
    .optional(),

  tags: z
    .array(z.string("Tag is missing"), "Tags are required")
    .nonempty("At least one tag is required"),

  features: z
    .array(z.string("Feature is missing"), "Features are required")
    .nonempty("At least one feature is required"),
})



export type Product = z.infer<typeof product>;
export type Variant = z.infer<typeof variant>;
