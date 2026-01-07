import type { KnipConfig } from 'knip';
import packages from "./package.json"
import { getDeps } from "@utils/shared"


const config: KnipConfig = {
  entry: ['src/main.tsx'],
  ignore: ['src/components/ui/**', 'src/routeTree.gen.ts', "*.d.ts"],
  ignoreDependencies: ["tailwindcss", "tw-animate-css", ...getDeps(packages.dependencies), ...getDeps(packages.devDependencies)],
};

export default config;