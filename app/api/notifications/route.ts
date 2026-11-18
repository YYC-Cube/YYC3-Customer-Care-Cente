/**
 * @file route.ts
 * @description 通知端点 GET/POST /api/notifications
 * @module app.api.notifications.route
 * @author YYC³ Team
 * @version 1.0.0
 * @created 2026-01-23
 * @updated 2026-11-18
 * @copyright Copyright (c) 2026 YYC³
 * @license MIT
 */

import type { NextRequest } from 'next/server';
import {
  fail,
  newId,
  ok,
  paginate,
  store,
  type Notification,
} from '@/lib/api-server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const unreadOnly = searchParams.get('unread') === 'true';
  let items = store.notifications;
  if (unreadOnly) items = items.filter((n) => !n.read);
  return ok(
    paginate(items, Number(searchParams.get('page') || 1), Number(searchParams.get('limit') || 20))
  );
}

export async function POST(request: NextRequest) {
  let body: Partial<Notification>;
  try {
    body = await request.json();
  } catch {
    return fail('Invalid JSON body', 400);
  }
  if (!body.title || !body.message) return fail('title 与 message 为必填项', 422);
  const item: Notification = {
    id: newId('N'),
    title: body.title,
    message: body.message,
    type: body.type || 'info',
    read: false,
    userId: body.userId || 'u-001',
    createdAt: new Date().toISOString(),
  };
  store.notifications.unshift(item);
  return ok(item, '通知发送成功');
}
