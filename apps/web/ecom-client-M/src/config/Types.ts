
export type Products = {
    _id: string;
    sideImages: string[];
    thumbnail: string;
    productName: string;
    description: string;
    category: string;
    subCategory: string;
    unit: string;
    magnitude: number;
    stockQuantity: number;
    brandName: string;
    price: number;
    discount: number;
    gst: number;
    tags: string[];
    features: string[];
    active: boolean;
};

export type Banners = {
    _id: string;
    banner: string;
    isActive: boolean;
}
