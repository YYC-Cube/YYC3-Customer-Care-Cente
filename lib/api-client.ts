/**
 * @file api-client.ts
 * @description 浏览器端统一 API 请求封装，读取 NEXT_PUBLIC_API_URL（默认同源 /api）
 * @module lib.api-client
 * @author YYC³ Team
 * @version 1.0.0
 * @created 2026-01-23
 * @updated 2026-11-18
 * @copyright Copyright (c) 2026 YYC³
 * @license MIT
 */

export interface ApiResult<T> {
  success: boolean;
  data?: T;
  message?: string;
  code: number;
  timestamp: string;
}

const BASE =
  (process.env.NEXT_PUBLIC_API_URL as string | undefined)?.replace(/\/$/, '') ||
  '/api';

export class ApiError extends Error {
  constructor(message: string, public status: number) {
    super(message);
    this.name = 'ApiError';
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const url = `${BASE}${path.startsWith('/') ? path : `/${path}`}`;
  let response: Response;
  try {
    response = await fetch(url, {
      ...init,
      headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
    });
  } catch (error) {
    throw new ApiError(
      error instanceof Error ? error.message : '网络请求失败',
      0
    );
  }

  const payload = (await response.json().catch(() => null)) as ApiResult<T> | null;
  if (!response.ok || !payload?.success) {
    throw new ApiError(
      payload?.message || `请求失败 (${response.status})`,
      response.status
    );
  }
  return payload.data as T;
}

export interface Paged<T> {
  items: T[];
  pagination: { page: number; limit: number; total: number; totalPages: number };
}

export const apiClient = {
  health: () => request<Record<string, unknown>>('/health'),
  customers: (params?: Record<string, string | number>) =>
    request<Paged<Record<string, unknown>>>(
      `/customers?${new URLSearchParams(
        Object.entries(params || {}).map(([k, v]) => [k, String(v)])
      ).toString()}`
    ),
  createCustomer: (body: Record<string, unknown>) =>
    request<Record<string, unknown>>('/customers', {
      method: 'POST',
      body: JSON.stringify(body),
    }),
  tasks: (params?: Record<string, string | number>) =>
    request<Paged<Record<string, unknown>>>(
      `/tasks?${new URLSearchParams(
        Object.entries(params || {}).map(([k, v]) => [k, String(v)])
      ).toString()}`
    ),
  updateTask: (id: string, body: Record<string, unknown>) =>
    request<Record<string, unknown>>(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
    }),
  okrs: () => request<Paged<Record<string, unknown>>>('/okrs'),
  notifications: () =>
    request<Paged<Record<string, unknown>>>('/notifications'),
  sendNotification: (body: Record<string, unknown>) =>
    request<Record<string, unknown>>('/notifications', {
      method: 'POST',
      body: JSON.stringify(body),
    }),
};
