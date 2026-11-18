/**
 * @file route.ts
 * @description 客户资源端点 GET/POST /api/customers
 * @module app.api.customers.route
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
  type Customer,
} from '@/lib/api-server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const page = Number(searchParams.get('page') || 1);
  const limit = Number(searchParams.get('limit') || 20);
  const search = (searchParams.get('search') || '').trim().toLowerCase();

  let items = store.customers;
  if (search) {
    items = items.filter((c) =>
      [c.name, c.company, c.email, c.phone].some((v) =>
        v.toLowerCase().includes(search)
      )
    );
  }
  return ok(paginate(items, page, limit));
}

export async function POST(request: NextRequest) {
  let body: Partial<Customer>;
  try {
    body = await request.json();
  } catch {
    return fail('Invalid JSON body', 400);
  }
  if (!body.name || !body.email) {
    return fail('name 与 email 为必填项', 422);
  }
  const now = new Date().toISOString();
  const customer: Customer = {
    id: newId('C'),
    name: body.name,
    email: body.email,
    company: body.company || '',
    phone: body.phone || '',
    status: body.status || 'potential',
    value: body.value || 0,
    createdAt: now,
    updatedAt: now,
  };
  store.customers.unshift(customer);
  return ok(customer, '客户创建成功');
}
