export * from "./form-utils.js"

export const getDeps = (deps: Record<string, string>, include = "workspace") => {
    const depList = [];
    for (const dep in deps) {
        if (!Object.hasOwn(deps, dep)) continue;

        const element = deps[dep as keyof typeof deps];
        if (element && element.startsWith(include)) {
            depList.push(dep);
        }
    }

    return depList;
}