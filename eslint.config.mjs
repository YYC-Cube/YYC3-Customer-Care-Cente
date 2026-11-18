import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

/**
 * @file eslint.config.mjs
 * @description ESLint 9 flat config for Next.js 16 — 原生导入 next flat 规则集
 * @module eslint.config
 * @author YYC³ Team
 * @version 2.0.0
 * @created 2026-01-23
 * @updated 2026-11-18
 * @copyright Copyright (c) 2026 YYC³
 * @license MIT
 */

export default [
  { ignores: ['.next/**', 'node_modules/**', 'coverage/**', 'out/**', 'next-env.d.ts'] },
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // 项目既有约定：保留关闭
      '@next/next/no-img-element': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'no-console': 'warn',

      // Next.js 16 / ESLint 9 迁移期：新引入或收紧的规则降级为 warn，
      // 避免在存量代码上产生数百条阻断性错误；后续按模块逐步收敛为 error。
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-unsafe-function-type': 'warn',
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-require-imports': 'warn',
      'react-hooks/purity': 'warn',
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/immutability': 'warn',
      'react-hooks/error-boundaries': 'warn',
      '@next/next/no-location-assign-relative-destination': 'warn',
      '@next/next/no-assign-module-variable': 'warn',
    },
  },
];
