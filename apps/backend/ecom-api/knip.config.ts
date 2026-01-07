import type { KnipConfig } from 'knip';
import packages from "./package.json" with { type: "json" };

const { dependencies, devDependencies } = packages;

const include = "workspace"

const getDeps = (deps: Record<string, string>) => {
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

const config: KnipConfig = {
    ignoreDependencies: [
        ...getDeps(dependencies),
        ...getDeps(devDependencies),
    ],
    entry: "./index.ts",
};

export default config;