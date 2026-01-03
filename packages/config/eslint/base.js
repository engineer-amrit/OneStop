import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import json from "@eslint/json";
import turboPlugin from "eslint-plugin-turbo";
import { defineConfig } from "eslint/config";
import onlyWarn from "eslint-plugin-only-warn";

export default defineConfig([
  // JS rules
  {
    files: ["**/*.{js,mjs,cjs}"],
    ...js.configs.recommended,
    languageOptions: { globals: globals.node },
    rules: {
      "no-unused-vars": [
        "error",
        { varsIgnorePattern: "^_", argsIgnorePattern: "^_" },
      ],
    },
  },

  // ⬇⬇⬇ THIS is the correct typescript-eslint flat config
  ...tseslint.configs.recommended,
  {
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      "turbo/no-undeclared-env-vars": "warn",
    },
  },

  {
    plugins: {
      onlyWarn,
    },
  },

  // Add your custom TS overrides AFTER spreading recommended
  {
    files: ["**/*.{ts,tsx,mts,cts}"],
    rules: {
      "@typescript-eslint/no-floating-promises": "error", // enforce await
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports", // always use import type
          disallowTypeAnnotations: false,
        },
      ],
    },
  },

  // JSON
  {
    files: ["**/*.jsonc"],
    ...json.configs.recommended,
  },
]);
