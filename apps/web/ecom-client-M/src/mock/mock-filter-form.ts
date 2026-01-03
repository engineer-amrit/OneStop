import { Path } from "react-hook-form";
import { FilterData } from "@/components/client/zodSchema";


export interface FilterField {
    name: Path<FilterData> | "reset" | "filter";
    label: string;
    type: "dropdown" | "range" | "button" | "text";
    options?: string[];
    min?: number;
    max?: number;
    variant?: "tertiary" | "destructive";
}


export const FilterFields: FilterField[] = [
    {
        name: "category",
        label: "Category",
        type: "dropdown",
        options: [],
    },
    {
        name: "subCategory",
        label: "Sub-category",
        type: "dropdown",
        options: [],
    },
    { name: "price", label: "Price Range", type: "range", min: 0, max: 50000 },

    {
        name: "rating",
        label: "Rating",
        type: "dropdown",
        options: ["1+", "2+", "3+", "4+"],
    },
    { name: "reset", label: "Reset", type: "button", variant: "destructive" },
    { name: "filter", label: "Filter", type: "button", variant: "tertiary" },
];