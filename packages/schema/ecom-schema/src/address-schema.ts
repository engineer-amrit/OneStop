import { z } from "zod";


const commonAddress = z.object({
    city: z.string()
        .min(1, { message: "City is required." })
        .toLowerCase(),
    state: z.string()
        .min(1, { message: "State is required." })
        .toLowerCase(),
    pincode: z.number()
        .int("Pincode must be an integer.")
        .refine((val) => val.toString().length === 6, {
            message: "Pincode must be 6 digits",
        }),
}).strict(); // no extra fields allowed

const blockAddress = z.object({
    streetAddress1: z.string()
        .min(1, { message: "Street address is required." })
        .toLowerCase(),
    streetAddress2: z.string()
        .toLowerCase()
        .optional(), // optional
    landmark: z.string()
        .min(1, { message: "Landmark is required." })
        .toLowerCase(),
    isDefault: z.boolean().default(false),
}).strict(); // no extra fields allowed



const address = blockAddress.extend({
    ...commonAddress.shape,
}).strict(); // no extra fields allowed

export {
    address,
    commonAddress,
    blockAddress
}

//  types export 
export type Address = z.infer<typeof address>;
export type BlockAddress = z.infer<typeof blockAddress>;
export type CommonAddress = z.infer<typeof commonAddress>;
