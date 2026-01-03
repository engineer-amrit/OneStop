import type { PrismaClient, Prisma } from "@database/prisma-ecom";
import { NodeType } from "@database/prisma-ecom";
import type { Product, ProductQuery } from "@schema/ecom";
import type { NodeService } from "./node-service.js";
import type { VariantService } from "./variant-service.js";
import { CustomError } from "@utils/api";
import type { ProductDto, ProductListDto, ProductStatus } from "ecom";
import { QueryFilterBuilder } from "../services/QueryFilter.js";
type Get = {
    id?: string;
    slug?: string;
}
const include = {
    gst: {
        select: {
            value: true
        }
    },
    subCategory: {
        select: {
            name: true,
            parent: {
                select: {
                    name: true
                }
            }
        }
    },
    brand: {
        select: {
            name: true
        }
    },
    variants: {
        select: {
            price: true,
            stock: true,
            unit: {
                select: {
                    name: true
                }
            },
            magnitude: true,
            discount: true
        }
    },

} satisfies Prisma.ProductInclude;


export class ProductService {
    constructor(
        private prisma: PrismaClient,
        private node: NodeService,
        private variant: VariantService,

    ) { }

    private getSku(data: Pick<Product, "name" | "brand">) {
        // combination of name brand caterogy and random string
        const randomString = Math.random().toString(36).substring(2, 8).toUpperCase();
        const namePart = data.name.replace(/\s+/g, '').substring(0, 3).toUpperCase();
        const brandPart = data.brand.replace(/\s+/g, '').substring(0, 3).toUpperCase();
        return `${namePart}${brandPart}${randomString}`;
    }

    private slugify = (name: string, brand: string) => {
        return name
            .toString()
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')           // Replace spaces with -
            .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
            .replace(/\-\-+/g, '-') +
            '-' + brand.toString()
                .toLowerCase()
                .trim()
                .replace(/\s+/g, '-')           // Replace spaces with -
                .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
                .replace(/\-\-+/g, '-');        // Replace multiple - with single -
    }

    private createBrandNode = async (brand: string, tx: Prisma.TransactionClient = this.prisma) => {
        return await this.node.findOrCreate({
            type: NodeType.BRAND,
            name: brand
        }, tx);
    }

    private createCategoryNode = async (category: string, tx: Prisma.TransactionClient = this.prisma) => {
        return await this.node.findOrCreate({
            type: NodeType.CATEGORY,
            name: category
        }, tx);
    }

    private createSubCategoryNode = async (subCategory: string, categoryId: string, tx: Prisma.TransactionClient = this.prisma) => {
        return await this.node.findOrCreate({
            type: NodeType.SUBCATEGORY,
            name: subCategory,
            parentId: categoryId
        }, tx);
    }

    private createGstNode = async (gst: number, tx: Prisma.TransactionClient = this.prisma) => {
        return await this.node.findOrCreate({
            type: NodeType.GST,
            value: gst
        }, tx);
    }

    async create(data: Product, tx: Prisma.TransactionClient = this.prisma) {
        const { name, brand, category, subCategory, variants, gst, sku, ...rest } = data;

        const validSku = sku ?? this.getSku({ name, brand });
        // create slug
        const slug = this.slugify(data.name, data.brand);
        // ensure nodes exist
        const brandId = await this.createBrandNode(brand, tx).then(e => e.id);
        const categoryId = await this.createCategoryNode(category, tx).then(e => e.id);
        const subCategoryId = await this.createSubCategoryNode(subCategory, categoryId, tx).then(e => e.id);
        const gstId = await this.createGstNode(gst, tx).then(e => e.id);
        //create product
        const product = await tx.product.create({
            data: {
                name,
                slug,
                brandId,
                subCategoryId,
                gstId,
                sku: validSku,
                ...rest
            }
        });

        // create variants
        await this.variant.createMany(variants, product.id, tx);
        return product;
    }

    async update(data: Product, id: string, tx: Prisma.TransactionClient = this.prisma) {
        const { name, brand, category, subCategory, variants, gst, ...rest } = data;
        // check if product exists
        const existing = await this.findProductById(id, tx);

        // if name is being updated, update slug
        let slug = existing.slug;
        if (data.name !== existing.name || data.brand !== existing.brand.name) {
            slug = this.slugify(data.name, data.brand);
        }

        // ensure nodes exist
        const brandId = await this.createBrandNode(brand, tx).then(e => e.id);
        const categoryId = await this.createCategoryNode(category, tx).then(e => e.id);
        const subCategoryId = await this.createSubCategoryNode(subCategory, categoryId, tx).then(e => e.id);
        const gstId = await this.createGstNode(gst, tx).then(e => e.id);
        //update product
        const product = await tx.product.update({
            where: { id },
            data: {
                name,
                slug,
                brandId,
                subCategoryId,
                gstId,
                ...rest
            }
        });

        // delete existing variants
        await this.variant.deleteMany(id, tx);
        // create new variants
        await this.variant.createMany(variants, product.id, tx);
        return product;
    }

    async findProductById(id: string, tx: Prisma.TransactionClient = this.prisma) {
        return await tx.product.findUniqueOrThrow({
            where: { id },
            include: {
                brand: true,
                subCategory: { include: { parent: true } },
                gst: true,
                variants: true,
            }
        });
    }

    async delete(id: string, tx: PrismaClient = this.prisma) {
        try {

            return await tx.product.delete({
                where: { id }
            });
        } catch (e) {
            throw new CustomError({
                message: "Product not found",
                status: 404,
                extraDetails: (e as Error).message
            })
        }
    }

    async get(opt: Get, tx: PrismaClient = this.prisma) {
        const { id, slug } = opt;
        let product = await tx.product.findUnique({
            where: { slug },
            include
        });

        if (product?.id !== id) {
            product = await tx.product.findUnique({
                where: { id },
                include
            }
            );
        }
        if (!product) {
            throw new CustomError({
                message: "Product not found",
                status: 404
            });
        }
        return product satisfies ProductDto
    }

    async suggestions(search: string, tx: PrismaClient = this.prisma) {
        const queruBuilder = new QueryFilterBuilder<Prisma.ProductWhereInput>({ search });
        const { filter, options } = queruBuilder.search(["name", "description", "brand.name", "sku", "tags[]", "features[]"]).build();
        const products = await tx.product.findMany({
            where: filter,
            ...options,
            select: {
                id: true,
                name: true,
                slug: true,
                thumbnail: true,
                subCategory: {
                    select: {
                        parent: {
                            select: { name: true }
                        }
                    }
                }
            }
        });
        return products;
    }

    async list(query: ProductQuery, tx: Prisma.TransactionClient = this.prisma) {
        const { start, end } = query.date ? query.date : { start: undefined, end: undefined };
        const q = new QueryFilterBuilder<Prisma.ProductWhereInput>(query);
        q.search([
            "name",
            "description",
            "brand.name",
            "sku",
            "tags[]",
            "features[]"
        ])
            .match("subCategory.name", query.subCategory)
            .match("subCategory.parent.name", query.category)
            .match("brand.name", query.brand)
            // .range("variants", query.price?.min, query.price?.max)
            .range("createdAt", start, end);
        switch (query.status) {
            case "LIVE":
                q.boolean("draft", false).boolean("upComing", false);
                break;
            case "DRAFT":
                q.boolean("draft", true);
                break;
            case "UPCOMING":
                q.boolean("upComing", true).boolean("draft", false);
                break;
        }

        const { filter, options } = q.build();

        const products = await tx.product.findMany({
            where: filter,
            ...options,
            select: {
                id: true,
                name: true,
                slug: true,
                sku: true,
                thumbnail: true,
                gst: {
                    select: {
                        value: true
                    }
                },
                subCategory: {
                    select: {
                        name: true,
                        parent: {
                            select: {
                                name: true
                            }
                        }
                    }
                },
                brand: {
                    select: {
                        name: true
                    }
                },
                variants: {
                    select: {
                        price: true,
                        stock: true,
                        unit: {
                            select: {
                                name: true
                            }
                        },
                        discount: true
                    }
                },
                draft: true,
                upComing: true,
                createdAt: true,
                updatedAt: true,

            }
        }) satisfies ProductListDto[]

        return {
            pageCount: Math.ceil(products.length / (q.limit() || 1)),
            products: products.slice(0, q.limit()),
            total: await tx.product.count({ where: filter }),
            nextPage: products.length == options.take ? q.page() + 1 : null
        };
    }

    async getStatusCounts(tx: Prisma.TransactionClient = this.prisma) {
        const liveCount = await tx.product.count({
            where: { draft: false, upComing: false }
        });
        const draftCount = await tx.product.count({
            where: { draft: true }
        });
        const upcomingCount = await tx.product.count({
            where: { upComing: true, draft: false }
        });
        const allmostoutOfStockCount = await tx.product.count({
            where: {
                variants: {
                    some: {
                        stock: {
                            lt: 10
                        }
                    }
                }
            }
        });

        return {
            totalProducts: liveCount + draftCount + upcomingCount,
            draftProducts: draftCount,
            upComingProducts: upcomingCount,
            liveProducts: liveCount,
            almostOutOfStockProducts: allmostoutOfStockCount
        } satisfies ProductStatus;
    }

    async changeStatus(id: string[], status: ProductQuery["status"], tx: Prisma.TransactionClient = this.prisma) {
        const data: Partial<Product> = {};
        switch (status) {
            case "LIVE":
                data.draft = false;
                data.upComing = false;
                break;
            case "DRAFT":
                data.draft = true;
                break;
            case "UPCOMING":
                data.upComing = true;
                data.draft = false;
                break;
        }
        await tx.product.updateMany({
            where: {
                id: { in: id }
            },
            data
        });
    }

    async deleteMany(ids: string[], tx: Prisma.TransactionClient = this.prisma) {
        await tx.product.deleteMany({
            where: {
                id: { in: ids }
            }
        });
    }

    async findManyByIds(ids: string[], tx: Prisma.TransactionClient = this.prisma, select: Prisma.ProductSelect) {
        return await tx.product.findMany({
            where: {
                id: { in: ids }
            },
            select
        })
    }
}