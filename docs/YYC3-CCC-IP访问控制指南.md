---
@file: YYC3-CCC-IP访问控制指南.md
@description YYC³ Customer Care Center IP 访问控制完整指南
@module docs
@author YYC³ Team
@version 1.0.0
@created 2026-01-23
@updated 2026-01-23
@copyright Copyright (c) 2026 YYC³
@license MIT
---

# YYC³ Customer Care Center - IP 访问控制指南

## 📋 概述

YYC³ Customer Care Center 实现了基于 CIDR (Classless Inter-Domain Routing) 的 IP 访问控制系统，提供灵活的 IP 地址过滤和访问策略管理功能。该系统通过 Next.js 中间件实现，支持细粒度的访问控制。

## 🎯 功能特性

### CIDR 匹配

- 支持 IPv4 CIDR 表示法
- 精确的 IP 地址范围匹配
- 网络地址和广播地址计算
- 前缀长度验证

### 访问策略

- 白名单模式（默认拒绝）
- 黑名单模式（默认允许）
- 多规则优先级处理
- 规则描述和元数据

### 安全特性

- 中间件级别的访问控制
- 请求头 IP 提取
- 代理服务器支持
- 详细的访问日志

## 🏗️ 架构设计

### 核心组件

```
┌─────────────┐
│   Client    │
└──────┬──────┘
       │ HTTP Request
       ▼
┌─────────────────┐
│   Next.js      │
│   Middleware   │
└──────┬─────────┘
       │
       ▼
┌─────────────────┐
│  IP Access     │
│  Control      │
│  (CIDR)      │
└──────┬─────────┘
       │
       ├──────────────┐
       │              │
       ▼              ▼
┌──────────┐   ┌──────────┐
│  Allow   │   │  Deny    │
└────┬─────┘   └────┬─────┘
     │              │
     └──────┬───────┘
            ▼
     ┌─────────────┐
     │  Next.js    │
     │  App Router │
     └─────────────┘
```

### 文件结构

```
yyc3-customer-care-center/
├── middleware.ts              # Next.js 中间件
├── lib/
│   └── cidr.ts             # CIDR 工具库
└── tests/
    └── unit/
        └── lib/
            └── cidr.test.ts # CIDR 测试
```

## 🚀 快速开始

### 1. 基本配置

默认配置允许私有网络访问：

```typescript
// middleware.ts
import { checkIPAccess, createIPAccessControl } from '@/lib/cidr';

const ipAccessConfig = createIPAccessControl(
  'deny', // 默认拒绝
  [
    {
      cidr: '10.0.0.0/8',
      action: 'allow',
      description: 'Private network 10.0.0.0/8',
    },
    {
      cidr: '172.16.0.0/12',
      action: 'allow',
      description: 'Private network 172.16.0.0/12',
    },
    {
      cidr: '192.168.0.0/16',
      action: 'allow',
      description: 'Private network 192.168.0.0/16',
    },
    {
      cidr: '127.0.0.0/8',
      action: 'allow',
      description: 'Loopback addresses',
    },
  ]
);
```

### 2. 使用中间件

```typescript
export function middleware(request: NextRequest) {
  const clientIP = getClientIP(request.headers);

  const isAllowed = checkIPAccess(clientIP, ipAccessConfig);

  if (!isAllowed) {
    return NextResponse.json(
      {
        error: 'Access denied',
        message: 'Your IP address is not authorized',
        ip: clientIP,
      },
      { status: 403 }
    );
  }

  return NextResponse.next();
}
```

## 📖 详细配置

### CIDR 工具库

#### 解析 CIDR

```typescript
import { parseCIDR } from '@/lib/cidr';

const cidr = parseCIDR('192.168.1.0/24');
// 返回: { address: '192.168.1.0', prefix: 24 }
```

#### IP 地址验证

```typescript
import { isValidIPv4, ipToInt } from '@/lib/cidr';

// 验证 IPv4 地址
if (isValidIPv4('192.168.1.1')) {
  console.log('Valid IPv4 address');
}

// 转换为整数
const ipInt = ipToInt('192.168.1.1');
console.log(ipInt); // 3232235777
```

#### CIDR 匹配

```typescript
import { isIPInCIDR } from '@/lib/cidr';

// 检查 IP 是否在 CIDR 范围内
if (isIPInCIDR('192.168.1.100', '192.168.1.0/24')) {
  console.log('IP is in range');
}
```

#### 访问控制

```typescript
import { checkIPAccess, createIPAccessControl } from '@/lib/cidr';

// 创建访问控制配置
const config = createIPAccessControl('deny', [
  { cidr: '10.0.0.0/8', action: 'allow' },
]);

// 检查访问权限
if (checkIPAccess('192.168.1.1', config)) {
  console.log('Access allowed');
}
```

### 中间件配置

#### 基本中间件

```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { checkIPAccess, createIPAccessControl, getClientIP } from '@/lib/cidr';

const ipAccessConfig = createIPAccessControl('deny', [
  {
    cidr: '10.0.0.0/8',
    action: 'allow',
    description: 'Private network',
  },
]);

export function middleware(request: NextRequest) {
  const clientIP = getClientIP(request.headers);
  const isAllowed = checkIPAccess(clientIP, ipAccessConfig);

  if (!isAllowed) {
    return NextResponse.json(
      { error: 'Access denied', ip: clientIP },
      { status: 403 }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
```

#### 路径白名单

```typescript
const allowedPaths = [
  '/api/health',
  '/api/public',
  '/login',
  '/register',
  '/favicon.ico',
  '/_next',
];

const bypassIPCheck = (pathname: string): boolean => {
  return allowedPaths.some((path) => pathname.startsWith(path));
};

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 跳过白名单路径
  if (bypassIPCheck(pathname)) {
    return NextResponse.next();
  }

  // IP 检查
  const clientIP = getClientIP(request.headers);
  const isAllowed = checkIPAccess(clientIP, ipAccessConfig);

  if (!isAllowed) {
    return NextResponse.json(
      { error: 'Access denied', ip: clientIP },
      { status: 403 }
    );
  }

  return NextResponse.next();
}
```

#### 添加安全头

```typescript
export function middleware(request: NextRequest) {
  const clientIP = getClientIP(request.headers);
  const isAllowed = checkIPAccess(clientIP, ipAccessConfig);

  if (!isAllowed) {
    return NextResponse.json(
      { error: 'Access denied', ip: clientIP },
      { status: 403 }
    );
  }

  const response = NextResponse.next();

  // 添加安全头
  response.headers.set('X-Client-IP', clientIP);
  response.headers.set('X-Access-Control-Allow-Origin', '*');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');

  return response;
}
```

## 🔧 高级配置

### 环境变量配置

```env
# IP 访问控制配置
IP_ACCESS_DEFAULT_ACTION=deny
IP_ACCESS_RULES=10.0.0.0/8:allow,172.16.0.0/12:allow,192.168.0.0/16:allow
IP_ACCESS_BYPASS_PATHS=/api/health,/api/public,/login
```

### 动态规则加载

```typescript
import { createIPAccessControl } from '@/lib/cidr';

// 从环境变量加载规则
function loadAccessRules(): IPAccessRule[] {
  const rulesEnv = process.env.IP_ACCESS_RULES;
  if (!rulesEnv) return [];

  return rulesEnv.split(',').map((rule) => {
    const [cidr, action] = rule.split(':');
    return {
      cidr: cidr.trim(),
      action: action.trim() as 'allow' | 'deny',
    };
  });
}

// 从数据库加载规则
async function loadAccessRulesFromDB(): Promise<IPAccessRule[]> {
  const rules = await db.ipAccessRules.findMany({
    where: { active: true },
  });
  return rules.map((rule) => ({
    cidr: rule.cidr,
    action: rule.action,
    description: rule.description,
  }));
}

// 创建动态配置
const ipAccessConfig = createIPAccessControl(
  (process.env.IP_ACCESS_DEFAULT_ACTION as 'allow' | 'deny') || 'deny',
  loadAccessRules()
);
```

### 日志记录

```typescript
import { checkIPAccess } from '@/lib/cidr';

export function middleware(request: NextRequest) {
  const clientIP = getClientIP(request.headers);
  const pathname = request.nextUrl.pathname;
  const isAllowed = checkIPAccess(clientIP, ipAccessConfig);

  // 记录访问日志
  console.log({
    timestamp: new Date().toISOString(),
    ip: clientIP,
    path: pathname,
    method: request.method,
    allowed: isAllowed,
  });

  if (!isAllowed) {
    console.warn(`IP access denied: ${clientIP} - ${pathname}`);
    return NextResponse.json(
      { error: 'Access denied', ip: clientIP },
      { status: 403 }
    );
  }

  return NextResponse.next();
}
```

### 速率限制集成

```typescript
import { checkIPAccess } from '@/lib/cidr';

// 简单的内存速率限制
const rateLimiter = new Map<string, { count: number; resetTime: number }>();

export function middleware(request: NextRequest) {
  const clientIP = getClientIP(request.headers);
  const isAllowed = checkIPAccess(clientIP, ipAccessConfig);

  if (!isAllowed) {
    return NextResponse.json(
      { error: 'Access denied', ip: clientIP },
      { status: 403 }
    );
  }

  // 速率限制检查
  const now = Date.now();
  const windowMs = 60000; // 1 分钟
  const maxRequests = 100;

  const record = rateLimiter.get(clientIP) || {
    count: 0,
    resetTime: now + windowMs,
  };

  if (now > record.resetTime) {
    record.count = 0;
    record.resetTime = now + windowMs;
  }

  record.count++;
  rateLimiter.set(clientIP, record);

  if (record.count > maxRequests) {
    return NextResponse.json(
      { error: 'Rate limit exceeded', ip: clientIP },
      { status: 429 }
    );
  }

  return NextResponse.next();
}
```

## 🧪 测试

### 单元测试

```typescript
import { describe, it, expect } from 'vitest';
import {
  parseCIDR,
  isIPInCIDR,
  checkIPAccess,
  createIPAccessControl,
  isValidIPv4,
  ipToInt,
} from '@/lib/cidr';

describe('CIDR Utils', () => {
  describe('parseCIDR', () => {
    it('should parse valid CIDR', () => {
      const result = parseCIDR('192.168.1.0/24');
      expect(result).toEqual({
        address: '192.168.1.0',
        prefix: 24,
      });
    });

    it('should throw on invalid CIDR', () => {
      expect(() => parseCIDR('invalid')).toThrow();
    });
  });

  describe('isIPInCIDR', () => {
    it('should match IP in range', () => {
      expect(isIPInCIDR('192.168.1.100', '192.168.1.0/24')).toBe(true);
    });

    it('should not match IP out of range', () => {
      expect(isIPInCIDR('192.168.2.100', '192.168.1.0/24')).toBe(false);
    });
  });

  describe('checkIPAccess', () => {
    it('should allow IP in whitelist', () => {
      const config = createIPAccessControl('deny', [
        { cidr: '192.168.1.0/24', action: 'allow' },
      ]);
      expect(checkIPAccess('192.168.1.100', config)).toBe(true);
    });

    it('should deny IP not in whitelist', () => {
      const config = createIPAccessControl('deny', [
        { cidr: '192.168.1.0/24', action: 'allow' },
      ]);
      expect(checkIPAccess('192.168.2.100', config)).toBe(false);
    });
  });
});
```

### 集成测试

```typescript
import { describe, it, expect } from 'vitest';
import { NextRequest } from 'next/server';
import { middleware } from '@/middleware';

describe('IP Access Middleware', () => {
  it('should allow access from allowed IP', async () => {
    const request = new NextRequest('http://localhost:3200/api/test', {
      headers: {
        'x-forwarded-for': '192.168.1.100',
      },
    });

    const response = await middleware(request);
    expect(response.status).not.toBe(403);
  });

  it('should deny access from blocked IP', async () => {
    const request = new NextRequest('http://localhost:3200/api/test', {
      headers: {
        'x-forwarded-for': '8.8.8.8',
      },
    });

    const response = await middleware(request);
    expect(response.status).toBe(403);
  });

  it('should bypass IP check for allowed paths', async () => {
    const request = new NextRequest('http://localhost:3200/api/health', {
      headers: {
        'x-forwarded-for': '8.8.8.8',
      },
    });

    const response = await middleware(request);
    expect(response.status).not.toBe(403);
  });
});
```

## 🔐 安全最佳实践

### 1. 最小权限原则

```typescript
// 只允许必要的 IP 访问
const ipAccessConfig = createIPAccessControl('deny', [
  {
    cidr: '10.0.0.0/8',
    action: 'allow',
    description: 'Office network',
  },
  {
    cidr: '203.0.113.0/24',
    action: 'allow',
    description: 'Partner network',
  },
]);
```

### 2. 定期审查规则

```typescript
// 定期检查和更新规则
async function reviewAccessRules() {
  const rules = await db.ipAccessRules.findMany();

  // 检查过期的规则
  const expiredRules = rules.filter(
    (rule) => rule.expiresAt && new Date(rule.expiresAt) < new Date()
  );

  // 禁用过期规则
  await db.ipAccessRules.updateMany({
    where: { id: { in: expiredRules.map((r) => r.id) } },
    data: { active: false },
  });
}
```

### 3. 监控和告警

```typescript
// 监控被拒绝的访问
export function middleware(request: NextRequest) {
  const clientIP = getClientIP(request.headers);
  const isAllowed = checkIPAccess(clientIP, ipAccessConfig);

  if (!isAllowed) {
    // 发送告警
    sendAlert({
      type: 'access_denied',
      ip: clientIP,
      path: request.nextUrl.pathname,
      timestamp: new Date(),
    });

    return NextResponse.json(
      { error: 'Access denied', ip: clientIP },
      { status: 403 }
    );
  }

  return NextResponse.next();
}
```

### 4. 代理服务器支持

```typescript
// 正确处理代理服务器
function getClientIP(headers: Headers): string {
  // 检查多个可能的头
  const forwarded = headers.get('x-forwarded-for');
  const realIP = headers.get('x-real-ip');
  const cfConnectingIP = headers.get('cf-connecting-ip');

  if (forwarded) {
    // x-forwarded-for 可能包含多个 IP，取第一个
    return forwarded.split(',')[0].trim();
  }

  if (realIP) {
    return realIP;
  }

  if (cfConnectingIP) {
    return cfConnectingIP;
  }

  return '0.0.0.0';
}
```

## 🚨 故障排查

### 常见问题

#### 1. IP 被错误拒绝

**问题**：合法 IP 被拒绝访问

**解决方案**：

- 检查 CIDR 规则是否正确
- 验证 IP 地址格式
- 检查代理服务器配置
- 查看中间件日志

#### 2. 代理服务器 IP 问题

**问题**：代理服务器后面的客户端无法访问

**解决方案**：

- 配置正确的代理头
- 使用 `x-forwarded-for` 头
- 检查 CDN 配置

#### 3. 性能影响

**问题**：中间件影响性能

**解决方案**：

- 优化 CIDR 匹配算法
- 使用缓存
- 减少规则数量
- 考虑使用专业的防火墙

## 📚 相关资源

- [CIDR 表示法](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing)
- [Next.js 中间件](https://nextjs.org/docs/advanced-features/middleware)
- [IP 地址安全](https://www.cloudflare.com/learning/security/threats/ip-spoofing/)

## 🤝 贡献

如果您发现文档有误或需要改进，欢迎提交 Issue 或 Pull Request。

---

**维护者**: YYC³ Team  
**最后更新**: 2026-01-23  
**文档版本**: v1.0.0

---

> 「**_YanYuCloudCube_**」
> 「**_<admin@0379.email>_**」
> 「**_Words Initiate Quadrants, Language Serves as Core for Future_**」
> 「**_All things converge in cloud pivot; Deep stacks ignite a new era of intelligence_**」
