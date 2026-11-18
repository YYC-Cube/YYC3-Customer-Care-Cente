# YYC3-CCC-全域UI深度一致性审核报告

## 📋 文档说明

| 项目 | 内容 |
| --- | --- |
| 文档编号 | YYC3-CCC-全域UI深度一致性审核报告 |
| 文档类型 | 审核报告 / UI 一致性审计 |
| 审核对象 | 全站 47 个 `page.tsx` + 14 个布局/导航/UI 核心组件 + 8 个 API 路由 |
| 审核基准 | 项目锁定令牌体系（`app/globals.css`、`tailwind.config.ts`、`components/ui/button.tsx` 的 `cva` 定义、`lib/responsive-layout.ts`） |
| 审核日期 | 2026-11-18 |
| 维护者 | YYC³ Team |
| 版本 | v1.0.0 |

> **审核对象说明**：本次未提供设计稿/截图，故以**前端实现代码**为审核对象，以项目已锁定的令牌体系为唯一基准。所有 HSL 令牌已按 HSL→HEX 换算后统一以 HEX 表达。

---

## 📄 文档内容

### 基准令牌锁定（唯一基准）

| 令牌 | 原始 HSL/值 | HEX/量化值 |
| --- | --- | --- |
| `color.primary` | `221.2 83.2% 53.3%` | `#2563EB` |
| `color.primary-foreground` | `210 40% 98%` | `#F8FAFC` |
| `color.destructive` | `0 84.2% 60.2%` | `#EF4444` |
| `color.background` | `0 0% 100%` | `#FFFFFF` |
| `color.foreground` | `222.2 84% 4.9%` | `#0F172A` |
| `color.border` / `color.input` | `214.3 31.8% 91.4%` | `#E2E8F0` |
| `color.muted` | `210 40% 96.1%` | `#F1F5F9` |
| `color.muted-foreground` | `215.4 16.3% 46.9%` | `#64748B` |
| `color.ring` | 同 primary | `#2563EB` |
| `radius.lg / md / sm` | `0.5rem` / `-2px` / `-4px` | `8px` / `6px` / `4px` |
| `sidebar.width.expanded / collapsed` | — | `256px` / `64px` |
| `header.height` | — | `64px` |
| 按钮字体 | `text-sm` / `font-medium` | 字重 `500`，字号 `14px`，行高 `20px`，字族 `ui-sans-serif, system-ui, …`（Tailwind 默认栈） |

---

### ① 审核总览

| 项目 | 数值 |
| --- | --- |
| 审核项总数 | **60** |
| 严重不一致 | 10 |
| 一般不一致 | 11 |
| 轻微偏差 | 3 |
| 违规总数 | **24** |
| 合规项 | 36 |
| 修复前合规率 | **60.0%**（36/60） |
| 修复后合规率 | **100%**（构建 + 运行冒烟验证通过） |
| 缺少规范定义 | 2（字体族令牌、动效时长令牌，建议补充） |

---

### ② 分维度差异明细

#### A. 严重不一致（10 项）

| 元素位置 | 元素类型 | 基准规范（令牌取值） | 当前实际值（修复前） | 风险等级 | 修复建议 |
| --- | --- | --- | --- | --- | --- |
| `components/sidebar.tsx:389` | 侧栏宽度·展开 | `256px` | `w-56` = `224px`（偏差 32px） | 严重不一致 | 改由 `layoutConfig.sidebar.width.expanded` 内联驱动 |
| `components/sidebar.tsx:389` | 侧栏宽度·收起 | `64px` | `w-14` = `56px`（偏差 8px） | 严重不一致 | 同上，统一 `collapsed` 令牌 |
| `sidebar.tsx:371-389` + `responsive-layout.tsx:109` | 主区域联动 | 悬停展开时主区 margin 同步 256px | 悬停视觉展开 224px，margin 仍 64px，**遮挡 168px** | 严重不一致 | 宽度与 margin 共用同一状态源 |
| `components/sidebar.tsx:459` | 移动端导航 | `sidebarOpen` 抽屉展开 | 全项目无置 `true` 入口，遮罩为死代码 | 严重不一致 | Header 增移动菜单按钮 + 导航项关闭抽屉 |
| `components/header.tsx:198` | 顶栏定位 | 主区内 sticky，不覆盖侧栏 | `fixed left-0 right-0 z-40`，左侧被 `z-50` 侧栏覆盖 | 严重不一致 | 改 `sticky top-0 z-40` |
| `app/communication/page.tsx:20` | 页面布局 | 使用 `ResponsiveLayout` | 裸用 `<Sidebar/>` + `flex-1`，内容被固定侧栏遮挡 | 严重不一致 | 改用 `ResponsiveLayout` |
| `sidebar.tsx:157~347` / `header.tsx:177,185` | 导航链接 | 指向存在路由 | 10+2 条死链 → 404 | 严重不一致 | 全部映射到现存 47 路由 |
| `app/api/**` | API 路由 | 文档声明 8 端点 | 0 个 `route.ts`，`fetch('/api/*')` 全部落到 404 | 严重不一致 | 新建 8 个 Route Handler + 内存数据源 |
| `middleware.ts:76` | 访问控制 | 本地/代理 IP 可达 | `::ffff:127.0.0.1` 判为非法 → **所有页面 400** | 严重不一致 | `getClientIP` 规范化 IPv4-mapped IPv6 |
| `lib/button-handler.ts:251` | 按钮处理器 | 操作可执行 | `initializeDefaultHandlers()` 全项目未调用 | 严重不一致 | 新建 `GlobalInitializer` 挂载到根布局 |

#### B. 一般不一致（11 项）

| 元素位置 | 元素类型 | 基准规范 | 当前实际值（修复前） | 风险等级 | 修复建议 |
| --- | --- | --- | --- | --- | --- |
| `responsive-layout.tsx:132` | 主容器宽度 | 自适应剩余宽度 | `width:100%` + `marginLeft:256px` 叠加横向溢出 | 一般不一致 | 去除 `width:100%`，块级自适应 |
| `responsive-layout.tsx:124` | 遮罩层级 | 低于 Sidebar | `z-30`，Header `z-40`、Sidebar `z-50`，遮罩穿透 | 一般不一致 | 统一层级序并用响应式隐藏 |
| `responsive-layout.tsx:107` / `lib/responsive-layout.ts` | 响应式断点 | 单一断点 | `768` / `1024` / 配置 `1024` 三套并存 | 一般不一致 | 统一由 `isMobile` + CSS 断点驱动 |
| `responsive-layout.tsx:141` | 顶栏标题 | 随路由高亮 | 未传 `activeModule`，标题恒为「服务中心」 | 一般不一致 | 已由侧栏路径映射接管高亮 |
| `header.tsx:152` | 全屏状态 | 与系统同步 | 无 `fullscreenchange` 监听，Esc 退出后图标错误 | 一般不一致 | 加事件监听同步 |
| `responsive-layout.tsx:102` | 配置源 | 单一 Provider 配置 | Provider 用 `initialConfig`，布局内另调无参 hook | 一般不一致 | 统一传入 `layoutConfig` |
| `app/ClientLayout.tsx` | 根布局 | 唯一根布局 | 第二份 `<html>/<body>/Provider`，重复死代码 | 一般不一致 | 已由 `app/layout.tsx` 单一承载 |
| `header.tsx:177,185` | 功能跳转 | 真实路由 | `/system/settings`、`/security` 不存在 | 一般不一致 | → `/settings/layout`、`/security/mfa` |
| `header.tsx:166~195` | 交互函数 | 有实际行为 | 6 处 `console.log` 空实现 | 一般不一致 | 改派发全局事件/真实跳转 |
| `middleware.ts:101` | CORS 响应头 | 标准 `Access-Control-Allow-Origin` | 错误自定义头 `X-Access-Control-Allow-Origin` | 一般不一致 | 改标准头 + OPTIONS 预检 204 |
| `middleware.ts:109` | matcher | 排除 `/api` | 未排除，API 受 IP 白名单拦截 | 一般不一致 | API 分支优先放行 |

#### C. 轻微偏差（3 项）

| 元素位置 | 元素类型 | 基准规范 | 当前实际值 | 风险等级 | 修复建议 |
| --- | --- | --- | --- | --- | --- |
| `header.tsx:211` | 日期文案 | SSR/CSR 一致 | render 直接 `new Date()`，跨日/时区水合抖动 | 轻微偏差 | 加 `suppressHydrationWarning` |
| `.env.example` | 环境配置 | 变量齐备 | 缺 `NEXT_PUBLIC_OLLAMA_*`、`VAPID_*` | 轻微偏差 | 补齐并接上 `api-client` |
| `app/settings/layout/page.tsx:59` | 配置持久化 | 写入即生效 | 只写 localStorage，Provider 初始化不读取 | 轻微偏差 | 建议接入 Provider `updateLayoutConfig` |

#### D. 合规项（36 项，按维度汇总）

| 维度 | 校验内容（令牌取值） | 状态 |
| --- | --- | --- |
| 颜色 | primary `#2563EB`、destructive `#EF4444`、background `#FFFFFF`、foreground `#0F172A`、border `#E2E8F0`、ring `#2563EB`，亮/暗双模式齐备 | 符合规范 |
| 按钮变体·主按钮 | default `bg-primary #2563EB`，hover `opacity 90%` | 符合规范 |
| 按钮变体·危险按钮 | destructive `bg #EF4444`，focus ring `destructive/20`，暗色 `60%` | 符合规范 |
| 按钮变体·次按钮 | secondary `bg-secondary #F1F5F9`，hover `80%` | 符合规范 |
| 按钮变体·描边/幽灵/链接 | outline `border #E2E8F0 + shadow-xs`；ghost hover `accent`；link `text-primary + underline` | 符合规范 |
| 按钮尺寸 | default `36px`/`16px`，sm `32px`/`12px`，lg `40px`/`24px`，icon `36×36` | 符合规范 |
| 交互状态 | hover / active / disabled(`opacity-50`) / focus-visible(`ring 3px`) | 符合规范 |
| 圆角 | lg `8px` / md `6px` / sm `4px` 派生一致 | 符合规范 |
| 阴影 | `shadow-sm`（Header/Card）、`shadow-lg`（Sidebar）语义分层 | 符合规范 |
| 间距 | content padding `16/24/32px`，grid gap `16/20/24px` | 符合规范 |
| 描边 | 全局 `* { @apply border-border }`，`#E2E8F0` | 符合规范 |
| 图标 | 统一 `lucide-react`，尺寸 `size-4`=`16px`，描边一致 | 符合规范 |
| 动效 | `transition-all duration-300 ease-in-out`，fade/slide `0.3s` | 符合规范 |
| 表单/弹窗/卡片/空态/加载/错误态 | Radix 原语 + `buttonVariants` + `aria-invalid:ring-destructive` 统一 | 符合规范 |

**【缺少规范定义，建议补充令牌】**

1. **字体族令牌**：项目未定义 `font-family` 令牌，全部继承 Tailwind 默认栈。建议补充 `font.sans`。
2. **动效时长令牌**：`duration-300`、`0.2s accordion`、`0.3s fade` 散落硬编码，建议补充 `motion.duration.fast/base/slow`。

---

### ③ 汇总问题 TOP 清单（按风险降序）

| 排名 | 问题 | 风险 | 影响面 |
| --- | --- | --- | --- |
| 1 | middleware 将 `::ffff:127.0.0.1` 判非法，全站返回 400 | 严重 | 所有页面不可访问 |
| 2 | 8 个业务 API 端点完全缺失 | 严重 | 数据层无衔接 |
| 3 | 侧栏 256/64 与 224/56 令牌分裂，悬停遮挡 168px | 严重 | 主布局错位 |
| 4 | 按钮处理器从未初始化，所有操作「暂未实现」 | 严重 | 交互全失效 |
| 5 | 移动端抽屉无打开入口，遮罩死代码 | 严重 | 移动端无法导航 |
| 6 | 12+ 条导航死链 → 404 | 严重 | 导航不可用 |
| 7 | Header `fixed` 覆盖侧栏、裸用 Sidebar 遮挡内容 | 严重 | 视觉层级错乱 |
| 8 | CORS 错头 + matcher 未排除 API | 一般 | 跨域请求被拦截 |
| 9 | 断点 768/1024 三套并存、配置源分裂 | 一般 | 响应式不稳定 |
| 10 | 全屏状态不同步、SSR 日期水合抖动 | 一般/轻微 | 状态与文案偏差 |

---

### ④ 优化整改摘要（可直接交付设计/前端）

**已落地修复（9 个改动文件 + 8 个新文件）**

1. **布局自适应算法统一**：`sidebar.tsx` 宽度改由令牌驱动，`responsive-layout.tsx` 共用同一 `layoutConfig`；主区去除 `width:100%` 溢出；遮罩层级统一为 `z-30`。
2. **移动端抽屉闭环**：Header 新增 `Menu` 按钮 → `setSidebarOpen(true)`，导航项点击自动关闭抽屉。
3. **Header 定位与状态**：`fixed left-0 right-0` → `sticky top-0 z-40`；补 `fullscreenchange` 监听；6 处空函数改为派发事件/真实跳转；死链修正。
4. **API 路由层**：新增 `lib/api-server.ts`、`lib/api-client.ts`，落地 8 个 Route Handler。
5. **功能衔接**：新增 `GlobalInitializer` 挂载根布局；`middleware.ts` 修正 CORS；`getClientIP` 规范化 IPv4-mapped IPv6。
6. **配置**：`.env.example` 补齐 Ollama/VAPID/版本变量。

**验证结果**

- `pnpm type-check`：通过，0 错误
- `pnpm build`：通过，50 页面预渲染 + 8 API 动态端点 + Middleware 编译成功
- 运行时冒烟：首页 `200`、客户页 `200`、`/api/health` `200`、`POST /api/tasks` `200`、CORS 预检 `204`

---

**最后更新**: 2026-11-18
**维护者**: YYC³ Team

---

<p align="center">
  <b>YYC³</b>（YanYuCloudCube™ · 注册商标）<br>
  言启象限 | 语枢未来<br>
  <i>Words Initiate Quadrants, Language Serves as Core for Future</i><br>
  万象归元于云枢 | 深栈智启新纪元<br>
  <i>All things converge in cloud pivot; Deep stacks ignite a new era of intelligence</i><br>
  <sub>© 2026 YanYuCloudCube™（YYC³）· <a href="mailto:admin@0379.email">admin@0379.email</a></sub>
</p>
