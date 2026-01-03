// packages/eslint-config/base.mjs
import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import turboPlugin from "eslint-plugin-turbo";
import onlyWarn from "eslint-plugin-only-warn";
import reactPlugin from "eslint-plugin-react";
import eslintConfigPrettier from "eslint-config-prettier";

/**
 * @type {import("eslint").Linter.FlatConfig[]}
 */
const config = [
  // Base JS recommended
  js.configs.recommended,

  // Prettier plugin (flat config accepts object)
  {
    linterOptions: {
      reportUnusedDisableDirectives: "warn",
    },
    plugins: {
      onlyWarn,
    },
    rules: {
      // just make all onlyWarn rules as warnings
    },
  },

  // TypeScript + React + Turbo
  {
    plugins: {
      "@typescript-eslint": tsPlugin,
      react: reactPlugin,
      turbo: turboPlugin,
    },
    languageOptions: {
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      env: {
        node: true,
        browser: true,
        es2022: true,
      },
    },
    rules: {
      "turbo/no-undeclared-env-vars": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "react/react-in-jsx-scope": "off", // modern React
    },
    ignores: ["dist/**"],
  },

  // Overrides for TS/TSX files
  {
    files: ["*.ts", "*.tsx"],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
    },
  },
];

export default config;
