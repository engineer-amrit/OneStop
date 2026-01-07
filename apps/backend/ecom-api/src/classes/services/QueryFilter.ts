// src/utils/QueryFilterBuilder.ts
import type { ProductQuery } from "@schema/ecom";

type Query = ProductQuery;

interface Options {
    skip: number;
    take: number;
    orderBy: Record<string, "asc" | "desc">;
}

type FilterKeyof<T> = keyof T & string | 'OR' | 'AND' | 'NOT';
type Filter<T> = Partial<Record<FilterKeyof<T>, any>>;

/**
 * Generic Query Filter Builder for Prisma-like queries.
 * Example:
 * new QueryFilterBuilder<Product>(query)
 *   .search(["name", "description"], query.keyword)
 *   .match("categoryId", query.category)
 *   .build()
 */
export class QueryFilterBuilder<T> {
    private filter: Filter<T> = {};
    private options: Options;
    private query: Query;

    constructor(query: Query) {
        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 10;
        const sortField = query.sort?.key ?? "createdAt";
        const sortOrder = query.sort?.order ?? "desc";
        this.query = query;

        this.options = {
            orderBy: { [sortField]: sortOrder },
            skip: (page - 1) * limit,
            take: limit + 1,
        };
    }


    search(fields: string[]) {
        const keyword = this.query.search;
        if (!keyword || !fields.length) return this;

        this.filter.OR = fields.map((field) => {
            const path = field.split('.'); // e.g. ["brand", "name"]

            return this.nestedObject(path, keyword);
        });

        return this;
    }

    nestedObject(path: string[], value: string): Partial<Record<FilterKeyof<T>, T[keyof T]>> {
        const nested = path.reduceRight((acc, key, index) => {
            if (index === path.length - 1) {
                // last key → actual search condition
                if (key.includes("[]")) return { [key.replace("[]", "")]: { has: value } };
                else if (key.includes("-")) return { [key.replace("-", "")]: value };
                return { [key]: { contains: value, mode: "insensitive" } };
            }
            return { [key]: acc };
        }, {});

        return nested;
    }

    /** Adds an exact match filter */
    match(field: string, value: string | undefined) {
        if (value !== undefined && value !== null) {
            // nested field support
            const path = field.split('.'); // e.g. ["subCategory", "name"]
            const nested = this.nestedObject(path, value);
            this.filter = { ...this.filter, ...nested }; // like { subCategory: { name: value }}
        }
        return this;
    }

    /** Adds boolean equality filter */
    /** Adds boolean equality filter — skips if value is undefined or null */
    boolean(field: FilterKeyof<T>, condition: boolean) {

        this.filter[field] = condition;
        return this;
    }

    /** Adds range filter for numbers or dates */
    range(field: string, min?: number | Date, max?: number | Date) {
        // type "key"[]."field" or "key"."field" or just "field"
        const path = field.split('.'); // e.g. ["variants[]", "price"]\
        const lastKey = path.pop();;

        const rangeFilter: {
            gte?: number | Date;
            lte?: number | Date;
        } = {};
        if (min !== undefined && min !== null) {
            rangeFilter.gte = min;
        }
        if (max !== undefined && max !== null) {
            rangeFilter.lte = max;
        }
        if (Object.keys(rangeFilter).length === 0) {
            return this; // no range to apply
        }
        if (lastKey) {
            const nested = path.reduceRight<any>((acc, key) => {
                if (key.includes("[]")) {
                    return { [key.replace("[]", "")]: { some: acc } };
                }
                return { [key]: acc };
            }, { [lastKey]: rangeFilter });
            this.filter = { ...this.filter, ...nested };
        }

        return this;
    }

    /** Returns final Prisma-ready filter and pagination options */
    build() {
        return {
            filter: this.filter,
            options: this.options,
        };
    }

    limit() {
        if ("limit" in this.query)
            return this.query.limit;
        else {
            return 10;
        }
    }

    page() {
        return this.query.page || 1;
    }
}
