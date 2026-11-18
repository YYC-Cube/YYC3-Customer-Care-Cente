/**
 * @file api-server.ts
 * @description 服务端统一响应封装与内存数据源，供各 API Route Handler 使用
 * @module lib.api-server
 * @author YYC³ Team
 * @version 1.0.0
 * @created 2026-01-23
 * @updated 2026-11-18
 * @copyright Copyright (c) 2026 YYC³
 * @license MIT
 */

import { NextResponse } from 'next/server';

export interface ApiEnvelope<T> {
  success: boolean;
  data?: T;
  message?: string;
  code: number;
  timestamp: string;
}

export function ok<T>(data: T, message = 'success') {
  return NextResponse.json<ApiEnvelope<T>>({
    success: true,
    data,
    message,
    code: 0,
    timestamp: new Date().toISOString(),
  });
}

export function fail(message: string, status = 400, code = status) {
  return NextResponse.json<ApiEnvelope<null>>(
    { success: false, message, code, timestamp: new Date().toISOString() },
    { status }
  );
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export function paginate<T>(items: T[], page = 1, limit = 20) {
  const safePage = Math.max(1, Number(page) || 1);
  const safeLimit = Math.min(100, Math.max(1, Number(limit) || 20));
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / safeLimit));
  const start = (safePage - 1) * safeLimit;
  return {
    items: items.slice(start, start + safeLimit),
    pagination: {
      page: safePage,
      limit: safeLimit,
      total,
      totalPages,
    } as Pagination,
  };
}

// ---------------- 领域模型 ----------------
export interface Customer {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'potential';
  value: number;
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignee: string;
  dueDate: string;
  progress: number;
  createdAt: string;
}

export interface OKR {
  id: string;
  title: string;
  description: string;
  owner: string;
  quarter: string;
  progress: number;
  createdAt: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  userId: string;
  createdAt: string;
}

interface StoreState {
  customers: Customer[];
  tasks: Task[];
  okrs: OKR[];
  notifications: Notification[];
}

const seed = (): StoreState => {
  const now = new Date().toISOString();
  return {
    customers: [
      { id: 'C-1001', name: '张伟', company: '星辰科技', email: 'zhangwei@xingchen.cn', phone: '138-0000-1001', status: 'active', value: 128000, createdAt: now, updatedAt: now },
      { id: 'C-1002', name: '李娜', company: '云图智能', email: 'lina@yuntu.ai', phone: '138-0000-1002', status: 'potential', value: 56000, createdAt: now, updatedAt: now },
      { id: 'C-1003', name: '王强', company: '恒远集团', email: 'wangqiang@hengyuan.com', phone: '138-0000-1003', status: 'inactive', value: 0, createdAt: now, updatedAt: now },
      { id: 'C-1004', name: '陈静', company: '蓝海网络', email: 'chenjing@lanhai.net', phone: '138-0000-1004', status: 'active', value: 89000, createdAt: now, updatedAt: now },
    ],
    tasks: [
      { id: 'T-2001', title: '跟进星辰科技续约', description: '确认年度服务合同续约条款', status: 'in-progress', priority: 'high', assignee: '张伟', dueDate: '2026-11-25', progress: 65, createdAt: now },
      { id: 'T-2002', title: '客户满意度回访', description: 'Q4 重点客户满意度电话回访', status: 'todo', priority: 'medium', assignee: '李娜', dueDate: '2026-11-28', progress: 0, createdAt: now },
      { id: 'T-2003', title: '升级工单系统', description: '完成工单系统 v2 上线验收', status: 'completed', priority: 'urgent', assignee: '王强', dueDate: '2026-11-20', progress: 100, createdAt: now },
    ],
    okrs: [
      { id: 'O-3001', title: '提升客户续约率', description: '将年度续约率提升至 92%', owner: '客户成功部', quarter: '2026-Q4', progress: 78, createdAt: now },
      { id: 'O-3002', title: '缩短首次响应时长', description: '平均首次响应时长降至 3 分钟内', owner: '客服中心', quarter: '2026-Q4', progress: 64, createdAt: now },
    ],
    notifications: [
      { id: 'N-4001', title: '新客户注册', message: '星辰科技完成了企业认证', type: 'info', read: false, userId: 'u-001', createdAt: now },
      { id: 'N-4002', title: '任务提醒', message: '有 2 个高优先级任务即将到期', type: 'warning', read: false, userId: 'u-001', createdAt: now },
    ],
  };
};

const globalStore = globalThis as unknown as { __YYC3_API_STORE__?: StoreState };

export const store: StoreState = globalStore.__YYC3_API_STORE__ ?? seed();
if (process.env.NODE_ENV !== 'production') {
  globalStore.__YYC3_API_STORE__ = store;
}

export const newId = (prefix: string) =>
  `${prefix}-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
