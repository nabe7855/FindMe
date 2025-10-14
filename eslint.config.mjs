import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // ✅ Next.js + TypeScript の基本ルール
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // ✅ 独自設定を追加
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts"
    ],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module"
    },
    rules: {
      // 🧹 コード品質向上のための推奨ルール
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "react/react-in-jsx-scope": "off", // Next.jsでは不要
      "@next/next/no-img-element": "off", // 画像最適化を任意化
      "react-hooks/exhaustive-deps": "warn",
      "prefer-const": "warn"
    }
  }
];

export default eslintConfig;
