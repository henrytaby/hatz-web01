// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  ...storybook.configs["flat/recommended"],
  
  // ==========================================
  // FSD (Feature-Sliced Design) Boundaries
  // ==========================================
  {
    // 1. SHARED Layer: Cannot import from entities, features, or app
    files: ["src/shared/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/entities*", "@/features*", "@/app*", "../entities*", "../features*", "../app*", "../../entities*", "../../features*", "../../app*"],
              message: "FSD Violation: The 'shared' layer cannot import from 'entities', 'features', or 'app'. It is the lowest level."
            }
          ]
        }
      ]
    }
  },
  {
    // 2. ENTITIES Layer: Cannot import from features or app
    files: ["src/entities/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/features*", "@/app*", "../features*", "../app*", "../../features*", "../../app*"],
              message: "FSD Violation: The 'entities' layer cannot import from 'features' or 'app'. It can only import from 'shared'."
            }
          ]
        }
      ]
    }
  },
  {
    // 3. FEATURES Layer: Cannot import from app
    files: ["src/features/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/app*", "../app*", "../../app*"],
              message: "FSD Violation: The 'features' layer cannot import from 'app'. It can only import from 'entities' and 'shared'."
            }
          ]
        }
      ]
    }
  }
]);

export default eslintConfig;
