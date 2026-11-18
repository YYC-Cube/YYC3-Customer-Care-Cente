/**
 * @file route.ts
 * @description OKR 资源端点 GET/POST /api/okrs
 * @module app.api.okrs.route
 * @author YYC³ Team
 * @version 1.0.0
 * @created 2026-01-23
 * @updated 2026-11-18
 * @copyright Copyright (c) 2026 YYC³
 * @license MIT
 */

import type { NextRequest } from 'next/server';
import { fail, newId, ok, paginate, store, type OKR } from '@/lib/api-server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const quarter = searchParams.get('quarter');
  const owner = searchParams.get('owner');
  let items = store.okrs;
  if (quarter) items = items.filter((o) => o.quarter === quarter);
  if (owner) items = items.filter((o) => o.owner.includes(owner));
  return ok(
    paginate(items, Number(searchParams.get('page') || 1), Number(searchParams.get('limit') || 20))
  );
}

export async function POST(request: NextRequest) {
  let body: Partial<OKR>;
  try {
    body = await request.json();
  } catch {
    return fail('Invalid JSON body', 400);
  }
  if (!body.title) return fail('title 为必填项', 422);
  const item: OKR = {
    id: newId('O'),
    title: body.title,
    description: body.description || '',
    owner: body.owner || '',
    quarter: body.quarter || '2026-Q4',
    progress: body.progress || 0,
    createdAt: new Date().toISOString(),
  };
  store.okrs.unshift(item);
  return ok(item, 'OKR 创建成功');
}
