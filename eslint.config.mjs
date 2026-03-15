import nextConfig from "eslint-config-next"
import reactPlugin from "eslint-plugin-react"
import reactHooksPlugin from "eslint-plugin-react-hooks"
import tseslint from "typescript-eslint"

const eslintConfig = [
  ...nextConfig,
  {
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "react/display-name": "warn",
      "react/no-unescaped-entities": 0,
      "react-hooks/exhaustive-deps": "off",
      "no-unused-vars": "off",
      "no-return-await": "warn",
      "no-nested-ternary": "off",
      "no-unneeded-ternary": "warn",
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
  {
    files: ["**/api/**/*.ts", "**/api/**/*.tsx", "src/proxy.ts"],
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": ["warn", { caughtErrors: "none" }],
    },
  },
]

export default eslintConfig
