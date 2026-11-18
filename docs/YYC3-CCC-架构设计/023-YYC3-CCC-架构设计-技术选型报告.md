---
@file: 023-YYC3-CCC-架构设计-技术选型报告.md
@description: YYC3-CCC 全栈技术栈选型依据与对比分析，匹配五高五标五化的核心设计原则
@author: YYC³ Team
@version: v1.0.0
@created: 2026-01-23
@updated: 2026-01-23
@status: published
@tags: [架构设计],[技术选型],[技术评估]
---

> **_YanYuCloudCube_**
> 言启象限 | 语枢未来
> **_Words Initiate Quadrants, Language Serves as Core for the Future_**
> 万象归元于云枢 | 深栈智启新纪元
> **_All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence_**

---

# 023-YYC3-CCC-架构设计 技术选型报告

## 概述

本文档详细描述YYC3-CCC-架构设计-技术选型报告相关内容，确保项目按照YYC³标准规范进行开发和实施。

## 核心内容

### 1. 背景与目标

#### 1.1 项目背景

YYC³ Customer Care Center（YYC3-CCC）项目是一个基于「五高五标五化」理念的现代化AI代理服务落地页，采用 Next.js 16 构建，集成了国际化系统、动画效果和响应式设计。

#### 1.2 文档目标

- 规范技术选型报告相关的业务标准与技术落地要求
- 为项目相关人员提供清晰的参考依据
- 保障相关模块开发、实施、运维的一致性与规范性

### 2. 设计原则

#### 2.1 五高原则

- **高可用性**：确保系统7x24小时稳定运行
- **高性能**：优化加载速度和交互响应
- **高安全性**：保护用户数据和隐私安全
- **高扩展性**：支持业务快速扩展
- **高可维护性**：便于后续维护和升级

#### 2.2 五标体系

- **标准化**：统一的技术和流程标准
- **规范化**：严格的开发和管理规范
- **自动化**：提高开发效率和质量
- **智能化**：利用AI技术提升能力
- **可视化**：直观的监控和管理界面

#### 2.3 五化架构

- **流程化**：标准化的开发流程
- **文档化**：完善的文档体系
- **工具化**：高效的开发工具链
- **数字化**：数据驱动的决策
- **生态化**：开放的生态系统

### 3. 技术栈

> 版本以项目根目录 `package.json` 为准（2026-11-18 升级后核对）。

**运行时核心**

| 技术 | 版本 | 说明 |
| --- | --- | --- |
| Next.js | 16.4.6 | App Router + Turbopack 默认构建 |
| React / ReactDOM | 19.2.9 | 含 React Compiler 前缀支持 |
| TypeScript | 5.9.3 | 严格类型检查 |
| Node.js | ≥ 22 LTS | Next 16 要求 ≥ 20.9 |

**UI 与样式**

| 技术 | 版本 | 说明 |
| --- | --- | --- |
| Tailwind CSS | 3.4.17 | 令牌驱动（`font.sans` / `motion.duration.*`） |
| shadcn/ui + Radix UI | Radix 各组件 1.x/2.x | 无头可访问组件原语 |
| lucide-react | 0.516.0 | 统一图标源 |
| motion / framer-motion | 12.18.1 | 动画与手势 |
| recharts | 2.15.3 | 数据可视化 |
| class-variance-authority | 0.7.1 | 组件变体（含按钮多状态） |

**可观测性与工程化**

| 技术 | 版本 | 说明 |
| --- | --- | --- |
| @sentry/nextjs | 11.14.0 | 全链路错误监控 |
| ESLint | 9.39.5 | Flat config（`eslint.config.mjs`） |
| Vitest | 3.2.4 | 单元/集成测试 + V8 覆盖率 |
| pnpm | 10.12.1 | 包管理器（含 `overrides` 安全收敛） |

**安全依赖覆盖（pnpm overrides）**

`fast-uri@3.1.9`、`postcss@8.5.23`、`vite@7.3.7`、`nanoid@3.3.18`、`browserslist@4.28.7`、`esbuild@0.28.1`、`postcss-selector-parser@6.1.5`、`source-map-js@1.2.2`、`baseline-browser-mapping@2.11.0`。已知 0-day：`picomatch` ReDoS（GHSA-fc5q-39xc-vjpf）上游暂无修复版本，已由 `scripts/security-audit.mjs` 按"无修复版本"规则豁免并记录。

### 4. 技术栈升级说明（2026-11-18）

- Next.js 15.3.6 → **16.4.6**；`middleware.ts` 迁移为 `proxy.ts`（Next 16 约定）。
- React 19.1.0 → **19.2.9**；`@sentry/nextjs` 9 → **11.14.0**。
- ESLint 8（`.eslintrc.json` + `next lint`）→ **ESLint 9 flat config**（`eslint.config.mjs` + `eslint .`）；Next 16 构建不再内置 lint。
- 移除 Next 16 不再支持的 `optimizePackageImports`、`onDemandEntries`、`webpack` 自定义配置，改用 Turbopack 默认行为。
- 新增 `pnpm audit` 安全门禁（带 0-day 豁免），CI 中作为独立 `security` job。

### 5. 技术选型报告

---

> 「**_YanYuCloudCube_**」
> 「**_<admin@0379.email>_**」
> 「**_Words Initiate Quadrants, Language Serves as Core for the Future_**」
> 「**_All things converge in the cloud pivot; Deep stacks ignite a new era of intelligence_**」
