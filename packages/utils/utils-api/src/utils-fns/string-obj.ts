import type { Request } from "express";

export const stringObjUtils = (q: Request["query"]) => {
    const nestedQuery: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(q || {})) {
        const path = key.split('.');
        let current = nestedQuery;
        for (let i = 0; i < path.length; i++) {
            const part = path[i];
            if (!part) continue;
            if (i === path.length - 1) {
                current[part] = value;
            } else {
                current[part] = current[part] || {};
                current = current[part] as Record<string, unknown>;
            }
        }
    }
    return nestedQuery;
}