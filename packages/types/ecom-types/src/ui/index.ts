import type { Product } from "@schema/ecom";
export interface ProductForm extends Omit<Product, "thumbnail" | "sideImages"> {
    thumbnail: File;
    isSku?: boolean;
    sideImages: File[];
}