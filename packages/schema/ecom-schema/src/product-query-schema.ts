import { z } from "zod";

enum ProductStatusEnum {
    LIVE = "LIVE",
    DRAFT = "DRAFT",
    UPCOMING = "UPCOMING"
}

type DType = {
    date?: Date | string;
    offset?: number;
}

const fixNan = (arg: {
    min?: number;
    max?: number;
}) => {
    if (arg.min !== undefined && isNaN(arg.min)) {
        delete arg.min;
    }
    if (arg.max !== undefined && isNaN(arg.max)) {
        delete arg.max;
    }
    return arg;
}

export const fixEnum = (arg: ProductStatusEnum) => {
    if (!Object.values(ProductStatusEnum).includes(arg)) {
        return undefined;
    }
    return arg;
}

const datePreprocess = (arg: DType) => {
    if (!arg) return undefined;

    if (arg.date instanceof Date) {

        const date = new Date(arg.date);
        const offset = date.getTimezoneOffset();
        return {
            date: date.toISOString().split("T")[0],
            offset
        };
    }
    return undefined;
}

const backendD = (arg: {
    date: string;
    offset: number;
} | undefined) => {
    if (!arg) return undefined;

    const { date, offset } = arg;
    //  convert to date od UTC with offset
    const localStart = new Date(`${date}T00:00:00`);
    const localEnd = new Date(`${date}T23:59:59.999`);
    const startUTC = new Date(localStart.getTime() + offset * 60000);
    const endUTC = new Date(localEnd.getTime() + offset * 60000);
    return {
        start: startUTC,
        end: endUTC
    }
}


const commonSchema = z.object({
    search: z.string().optional(),
    category: z.string().optional(),
    subCategory: z.string().optional(),
    brand: z.string().optional(),
    status: z.preprocess(fixEnum, z.enum(ProductStatusEnum).optional()).optional(),
    sort: z.object({
        key: z.string(),
        order: z.enum(["asc", "desc"])
    }).optional()
});

const idArraySchema = z.object({
    ids: z.array(z.string()).min(1, "At least one ID must be provided")
}).strict();

const productQuerySchema = commonSchema.extend({
    date: z.preprocess(backendD, z.object({
        start: z.date(),
        end: z.date()
    }).optional()).optional(),
    price: z.object({
        min: z.coerce.number().nonnegative("Minimum prize cannot be negative").optional(),
        max: z.coerce.number().nonnegative("Maximum prize cannot be negative").optional()
    }).optional(),
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(50).optional(),
}).strict();

const productQuerySchemaFront = commonSchema.extend({
    date: z.preprocess(datePreprocess, z.object({
        date: z.string(),
        offset: z.number()
    }).optional()).optional(),
    price: z.preprocess(fixNan, z.object({
        min: z.number().nonnegative("Minimum prize cannot be negative").optional(),
        max: z.number().nonnegative("Maximum prize cannot be negative").optional()
    }).optional(),).optional(),
    page: z.number().min(1).optional(),
    limit: z.number().min(1).max(50).optional(),
}).strict();

export { productQuerySchema, ProductStatusEnum, productQuerySchemaFront, idArraySchema };
export type ProductQuery = z.infer<typeof productQuerySchema>;
export type ProductQueryFront = z.input<typeof productQuerySchemaFront>;
export type IdArray = z.infer<typeof idArraySchema>;