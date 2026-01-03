import { NodeDto } from "./node.js";
import { VariantDto } from "./variant.js";
import { ApiSuccess, PaginatedResponse } from "common";

export type NodeParentDto = Pick<NodeDto, "name"> & {
    parent: Pick<NodeDto, "name"> | null;
};

export type ReviewDto = {
    rating: number;
    comment: string;
    user: {
        phone: string;
    }
}

export type ProductDto = {
    id: string;
    name: string;
    thumbnail: string;
    sideImages: string[];
    rating: number;
    brand: Pick<NodeDto, "name">
    subCategory: NodeParentDto
    gst: Pick<NodeDto, "value">;
    description: string;
    sku: string;
    variants: (Omit<VariantDto, "unit"> & {
        unit: Pick<NodeDto, "name">
    })[];
    draft: boolean;
    upComing: boolean;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
    tags: string[];
    features: string[];
}
export type ProductListDto = {
    id: string;
    name: string;
    thumbnail: string;
    brand: Pick<NodeDto, "name">
    subCategory: NodeParentDto
    gst: Pick<NodeDto, "value">;
    sku: string;
    variants: (Pick<VariantDto, "price" | "stock" | "discount"> & {
        unit: Pick<NodeDto, "name">
    })[];
    draft: boolean;
    upComing: boolean;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
}

export type ProductStatus = {
    totalProducts: number;
    draftProducts: number;
    upComingProducts: number;
    almostOutOfStockProducts: number;
    liveProducts: number;
}

export type ProductStatusDto = ApiSuccess<"productStatus", ProductStatus>;

export type ProductPaginatedDto = PaginatedResponse<"products", ProductListDto>;
