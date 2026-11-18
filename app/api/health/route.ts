/**
 * @file route.ts
 * @description 健康检查端点 GET /api/health
 * @module app.api.health.route
 * @author YYC³ Team
 * @version 1.0.0
 * @created 2026-01-23
 * @updated 2026-11-18
 * @copyright Copyright (c) 2026 YYC³
 * @license MIT
 */

import { NextResponse } from 'next/server';
import { ok } from '@/lib/api-server';

export const dynamic = 'force-dynamic';

export async function GET() {
  return ok({
    status: 'ok',
    timestamp: new Date().toISOString(),
    services: { api: 'up', database: 'memory', cache: 'up', queue: 'up' },
    version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
  });
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}
