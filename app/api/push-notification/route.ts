/**
 * @file route.ts
 * @description 推送通知端点 POST /api/push-notification
 * @module app.api.push-notification.route
 * @author YYC³ Team
 * @version 1.0.0
 * @created 2026-01-23
 * @updated 2026-11-18
 * @copyright Copyright (c) 2026 YYC³
 * @license MIT
 */

import type { NextRequest } from 'next/server';
import { fail, ok } from '@/lib/api-server';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return fail('Invalid JSON body', 400);
  }
  if (!body.title) return fail('title 为必填项', 422);
  return ok({ id: `P-${Date.now()}`, ...body }, '推送已入队');
}
