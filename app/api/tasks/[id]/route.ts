/**
 * @file route.ts
 * @description 单任务端点 PUT/DELETE /api/tasks/:id
 * @module app.api.tasks.[id].route
 * @author YYC³ Team
 * @version 1.0.0
 * @created 2026-01-23
 * @updated 2026-11-18
 * @copyright Copyright (c) 2026 YYC³
 * @license MIT
 */

import type { NextRequest } from 'next/server';
import { fail, ok, store, type Task } from '@/lib/api-server';

export const dynamic = 'force-dynamic';

interface Ctx {
  params: Promise<{ id: string }>;
}

export async function PUT(request: NextRequest, ctx: Ctx) {
  const { id } = await ctx.params;
  const index = store.tasks.findIndex((t) => t.id === id);
  if (index < 0) return fail('任务不存在', 404);

  let body: Partial<Task>;
  try {
    body = await request.json();
  } catch {
    return fail('Invalid JSON body', 400);
  }
  const updated: Task = { ...store.tasks[index], ...body, id };
  store.tasks[index] = updated;
  return ok(updated, '任务更新成功');
}

export async function DELETE(_request: NextRequest, ctx: Ctx) {
  const { id } = await ctx.params;
  const index = store.tasks.findIndex((t) => t.id === id);
  if (index < 0) return fail('任务不存在', 404);
  store.tasks.splice(index, 1);
  return ok({ id }, '任务删除成功');
}
