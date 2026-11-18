/**
 * @file route.ts
 * @description 任务资源端点 GET/POST /api/tasks
 * @module app.api.tasks.route
 * @author YYC³ Team
 * @version 1.0.0
 * @created 2026-01-23
 * @updated 2026-11-18
 * @copyright Copyright (c) 2026 YYC³
 * @license MIT
 */

import type { NextRequest } from 'next/server';
import { fail, newId, ok, paginate, store, type Task } from '@/lib/api-server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const status = searchParams.get('status');
  const assignee = searchParams.get('assignee');
  let items = store.tasks;
  if (status) items = items.filter((t) => t.status === status);
  if (assignee) items = items.filter((t) => t.assignee.includes(assignee));
  return ok(
    paginate(items, Number(searchParams.get('page') || 1), Number(searchParams.get('limit') || 20))
  );
}

export async function POST(request: NextRequest) {
  let body: Partial<Task>;
  try {
    body = await request.json();
  } catch {
    return fail('Invalid JSON body', 400);
  }
  if (!body.title) return fail('title 为必填项', 422);
  const task: Task = {
    id: newId('T'),
    title: body.title,
    description: body.description || '',
    status: body.status || 'todo',
    priority: body.priority || 'medium',
    assignee: body.assignee || '',
    dueDate: body.dueDate || '',
    progress: body.progress || 0,
    createdAt: new Date().toISOString(),
  };
  store.tasks.unshift(task);
  return ok(task, '任务创建成功');
}
