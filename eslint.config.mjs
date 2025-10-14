import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: ["prettier",js],
    extends: ["plugin:prettier/recommended", "js/recommended"],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      "prettier/prettier": "error",
      "class-methods-use-this": "off",
      camelcase: "off",
      "no-param-reassign": "off",
      // Corrigido: o nome certo é "no-unused-vars", e não "no-unused-var"
      "no-unused-vars": ["error", { argsIgnorePattern: "next" }],
    },
  },
]);
