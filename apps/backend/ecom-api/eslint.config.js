import base from "@config/eslint/base";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  ...base,
  // TS rules
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json", // 👈 MUST point to your tsconfig
        tsconfigRootDir: import.meta.dirname, // 👈 makes relative path work
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
  },
]);
