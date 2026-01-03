import { z } from "zod";

export enum NodeType {
    CATEGORY = "CATEGORY",
    UNIT = "UNIT",
    BRAND = "BRAND",
    GST = "GST"
}

const nodeQuarySchema = z.object({
    type: z.enum([NodeType.CATEGORY, NodeType.UNIT, NodeType.BRAND, "GROUP"]),
    include: z.array(z.enum(NodeType), "Must be more than one type"
    ).min(2).optional()
});

export type NodeQuary = z.infer<typeof nodeQuarySchema>;

export { nodeQuarySchema }