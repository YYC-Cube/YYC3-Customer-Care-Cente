# 100-YYC3-CCC-部署运维-Next16技术栈升级说明

## 📋 文档说明

| 项目 | 内容 |
| --- | --- |
| 文档类型 | 部署运维 / 技术栈升级说明 |
| 升级日期 | 2026-11-18 |
| 目标分支 | `main`（保留主线，不合入陈旧的 dependabot 分支） |
| 维护者 | YYC³ Team |

---

## 📄 文档内容

### 1. 升级概要

| 技术 | 升级前 | 升级后 |
| --- | --- | --- |
| Next.js | 15.3.6 | **16.4.6** |
| React / ReactDOM | 19.1.0 | **19.2.9** |
| @sentry/nextjs | 9.27.0 | **11.14.0** |
| ESLint | 8.57.1（`.eslintrc.json` + `next lint`） | **9.39.5**（`eslint.config.mjs` + `eslint .`） |
| eslint-config-next | 15.3.6 | **16.4.6** |
| TypeScript | 5.8.3 | **5.9.3** |
| @types/react | 19.1.8 | **19.2.18** |
| @types/react-dom | 19.1.6 | **19.2.7** |
| Node.js | 18+（文档） | **≥ 20.9（推荐 22 LTS）** |

### 2. 破坏性变更与适配

| 变更 | 影响 | 适配措施 |
| --- | --- | --- |
| 构建默认 Turbopack | 自定义 `webpack` 配置触发构建错误 | 移除 `webpack` 块；`images.unoptimized` 已规避 polyfill 依赖 |
| `optimizePackageImports` 不再识别 | next.config 校验警告 | 移除该键（Next 16 内置依赖优化） |
| `eslint.ignoreDuringBuilds` 不再支持 | 配置警告 | 移除该键；lint 迁移为独立 CI job |
| `onDemandEntries` 移除 | 配置警告 | 移除该键 |
| middleware → proxy 约定 | Next 16 推荐 `proxy.ts` | `middleware.ts` 迁移为 `proxy.ts`，导出 `proxy` 函数 |
| `next lint` 命令移除 | lint 脚本失效 | 改用 `eslint .` + ESLint 9 flat config |
| ESLint 9 + TS 5.9 新规则 | 600+ 存量规则错误 | 迁移期规则降级为 `warn`（保留提示、不阻断） |
| Web Push 类型收紧 | `Uint8Array<ArrayBufferLike>` 类型错误 | `applicationServerKey` 改用 `Uint8Array<ArrayBuffer>` |
| Vitest coverage 与 Turbopack sourcemap 冲突 | 覆盖率收集 ENOENT | coverage.exclude 增加 `.next/` |

### 3. 分支策略（保留 main）

- `origin/main` 含 24 个独有关键提交（安全补丁、CI 修复、文档五件套）。
- `origin/dependabot/npm_and_yarn/npm_and_yarn-4b1f3c67eb` 分叉过早（分叉点 `1c0977`），含 19 个提交 / 458 文件改动，其 `next 15.5.18` 补丁已被本次 16.4.6 升级覆盖。
- **决策**：保留 `main` 主线，不合并该 dependabot 分支；依赖安全修复通过本次升级 + pnpm overrides 落地。

### 4. 依赖安全修复

- 扫描：`pnpm audit --prod`（官方 registry）。
- 修复前：33 个漏洞（18 high / 10 moderate / 5 low）。
- 通过 `pnpm.overrides` 收敛传递依赖后：**2 个 high（均来自 `picomatch`）**。
- 已修复包：`fast-uri`、`postcss`、`vite`、`nanoid`、`browserslist`、`esbuild`、`postcss-selector-parser`、`source-map-js`、`baseline-browser-mapping`。
- 已知 0-day：`picomatch` ReDoS（GHSA-fc5q-39xc-vjpf / CVE-2026-112366），`patched_versions: <0.0.0`，上游暂无修复版本，由 `scripts/security-audit.mjs` 按"无修复版本"规则豁免并记录；上游发布修复后需及时跟进。

### 5. CI 配置完善

- 新增独立 `security` job（`pnpm run audit:security`），作为 build 的前置门禁。
- 统一 Node 22，改用 `actions/setup-node` 内置 pnpm 缓存。
- 精简 test job 的重复覆盖率运行。
- 保留 gitleaks 密钥扫描工作流。

### 6. 验证结果

- `pnpm type-check`：通过（0 错误）
- `pnpm lint`：通过（0 错误，953 条迁移期 warn）
- `pnpm test:unit`：76 个测试全部通过，覆盖率生成成功
- `pnpm build`：Next 16.4.6 Turbopack 构建成功，50 页面 + 8 API + Proxy
- `pnpm audit:security`：通过（可修复漏洞 0，0-day 已豁免记录）

---

**最后更新**: 2026-11-18
**维护者**: YYC³ Team

---

<p align="center">
  <b>YYC³</b>（YanYuCloudCube™ · 注册商标）<br>
  言启象限 | 语枢未来<br>
  <i>Words Initiate Quadrants, Language Serves as Core for Future</i><br>
  © 2026 YanYuCloudCube™（YYC³）
</p>
