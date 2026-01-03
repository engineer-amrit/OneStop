import type { Node, NodeKeys } from "ecom";
export type NodeOptions = {
    brands?: string[],
    categories?: string[],
    subCategories?: (cat: string) => string[],
    units?: string[],
    gsts?: string[]
}
export const setNodes = (nodes: Node) => {
    const r: NodeOptions = {} as NodeOptions;
    for (const key in nodes) {

        const element = nodes[key as NodeKeys];
        if (key === "categories") {
            r.categories = element.map((el) => el.name || "");
            r.subCategories = (cat: string) => {
                const subcat = element.find((e) => e.name === cat);
                return subcat?.children.map((el) => el.name || "") || []
            };
        } else {
            const rKey = key as keyof Omit<NodeOptions, "subCategories">;
            r[rKey] = element.map((el) => el.name || String(el.value) || "");
        }

    }
    return r satisfies NodeOptions;
}
