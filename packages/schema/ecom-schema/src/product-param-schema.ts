import { z } from "zod";

const productParamSchema = z.object({
    id: z.string().min(1, "Product ID is required"),
    slug: z.string().min(1, "Product slug is required"),
});

export { productParamSchema };
export type ProductParamType = z.infer<typeof productParamSchema>;