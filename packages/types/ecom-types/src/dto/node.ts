import type { ApiSuccess } from "common"

export type NodeDto = {
    id: string;
    name: string | null;
    type: "UNIT" | "CATEGORY" | "BRAND" | "GST" | "SUBCATEGORY";
    value: null | number;
    children: Omit<NodeDto, "children">[];
}

export type Node = Record<NodeKeys, NodeDto[]>

export type NodeKeys = "units" | "categories" | "brands" | "gsts";

export type NodeApi = ApiSuccess<"nodes", Node>