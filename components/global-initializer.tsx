/**
 * @file global-initializer.tsx
 * @description 全局客户端初始化：默认按钮处理器、全屏状态、全局导航事件
 * @module components.global-initializer
 * @author YYC³ Team
 * @version 1.0.0
 * @created 2026-01-23
 * @updated 2026-11-18
 * @copyright Copyright (c) 2026 YYC³
 * @license MIT
 */

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { initializeDefaultHandlers } from '@/lib/button-handler';

const ROUTE_MAP: Record<string, string> = {
  dashboard: '/',
  tasks: '/tasks',
  customers: '/customers',
  analytics: '/analytics',
};

export function GlobalInitializer() {
  const router = useRouter();

  useEffect(() => {
    // 注册所有默认按钮处理器，消除「功能暂未实现」空实现
    initializeDefaultHandlers();

    const onNavigate = (event: Event) => {
      const moduleId = (event as CustomEvent<string>).detail;
      const path = ROUTE_MAP[moduleId];
      if (path) router.push(path);
    };
    window.addEventListener('navigateTo', onNavigate);
    return () => window.removeEventListener('navigateTo', onNavigate);
  }, [router]);

  return null;
}
