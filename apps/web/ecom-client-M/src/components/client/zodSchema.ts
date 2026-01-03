import { z } from 'zod';

const FilterSchema = z.object({
    category: z.string().optional(),
    subCategory: z.string().optional(),
    price: z
        .object({
            min: z.number().optional(),

            max: z.number().optional(),
        }),
    rating: z.string().optional(),
});


type FilterData = z.infer<typeof FilterSchema>;

export {
    FilterSchema,
};

export type {
    FilterData,
};