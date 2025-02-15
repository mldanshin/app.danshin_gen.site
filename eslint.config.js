import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";

export default defineConfig([
    js.configs.recommended,
    {
        files: ["src/**/*.{js,jsx,ts,tsx}"],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        rules: {
            "no-unused-vars": "warn",
            "no-bitwise": "error",
            "eqeqeq": ["error", "always"],
        },
    },
]);