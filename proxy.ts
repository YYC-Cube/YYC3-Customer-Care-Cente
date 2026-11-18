import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  checkIPAccess,
  createIPAccessControl,
  getClientIP,
  isValidIPv4,
} from '@/lib/cidr';

/**
 * @file proxy.ts
 * @description Next.js 16 proxy（原 middleware）— 基于 CIDR 的 IP 访问控制与 CORS
 * @module proxy
 * @author YYC³ Team
 * @version 2.0.0
 * @created 2026-01-23
 * @updated 2026-11-18
 * @copyright Copyright (c) 2026 YYC³
 * @license MIT
 */

const ipAccessConfig = createIPAccessControl('deny', [
  {
    cidr: '0.0.0.0/8',
    action: 'allow',
    description: 'Development network 0.0.0.0/8',
  },
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
]);

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

// 标准 CORS：所有自有 API 端点使用同一套响应头，支持 OPTIONS 预检
const corsHeaders: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
};

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isApi = pathname.startsWith('/api/');

  // API 预检请求直接放行，且不纳入 IP 白名单（前端同源/跨域均可调用）
  if (isApi && request.method === 'OPTIONS') {
    return new NextResponse(null, { status: 204, headers: corsHeaders });
  }
  if (isApi || bypassIPCheck(pathname)) {
    const response = NextResponse.next();
    if (isApi) {
      Object.entries(corsHeaders).forEach(([key, value]) =>
        response.headers.set(key, value)
      );
    }
    return response;
  }

  const headersRecord: Record<string, string | string[] | undefined> = {};
  request.headers.forEach((value, key) => {
    headersRecord[key] = value;
  });
  const clientIP = getClientIP(headersRecord);

  if (!isValidIPv4(clientIP)) {
    return NextResponse.json(
      { error: 'Invalid IP address', ip: clientIP },
      { status: 400 }
    );
  }

  const isAllowed = checkIPAccess(clientIP, ipAccessConfig);

  if (!isAllowed) {
    console.warn(`IP access denied: ${clientIP} - ${pathname}`);

    return NextResponse.json(
      {
        error: 'Access denied',
        message: 'Your IP address is not authorized to access this resource',
        ip: clientIP,
      },
      { status: 403 }
    );
  }

  const response = NextResponse.next();

  response.headers.set('X-Client-IP', clientIP);
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
