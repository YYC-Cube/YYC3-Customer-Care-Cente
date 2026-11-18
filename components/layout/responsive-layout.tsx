/**
 * @file responsive-layout.tsx
 * @description responsive-layout component/module for YYC3 Customer Care Center
 * @module components.layout.responsive-layout
 * @author YYC³ Team
 * @version 1.0.0
 * @created 2026-01-23
 * @updated 2026-01-23
 * @copyright Copyright (c) 2026 YYC³
 * @license MIT
 */

'use client';

import type React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
import {
  useResponsiveLayout,
  type LayoutConfig,
} from '@/lib/responsive-layout';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { cn } from '@/lib/utils';

// 布局上下文
interface LayoutContextType {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  layoutConfig: LayoutConfig;
  updateLayoutConfig: (config: Partial<LayoutConfig>) => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export function useLayoutContext() {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayoutContext must be used within a LayoutProvider');
  }
  return context;
}

// 响应式布局提供者
interface ResponsiveLayoutProviderProps {
  children: React.ReactNode;
  initialConfig?: Partial<LayoutConfig>;
}

export function ResponsiveLayoutProvider({
  children,
  initialConfig,
}: ResponsiveLayoutProviderProps) {
  const { layoutConfig: defaultConfig, isMobile } =
    useResponsiveLayout(initialConfig);
  const [layoutConfig, setLayoutConfig] = useState(defaultConfig);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // 移动端自动关闭侧边栏
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [isMobile]);

  const updateLayoutConfig = (config: Partial<LayoutConfig>) => {
    setLayoutConfig((prev) => ({ ...prev, ...config }));
  };

  const value: LayoutContextType = {
    sidebarCollapsed,
    setSidebarCollapsed,
    sidebarOpen,
    setSidebarOpen,
    layoutConfig,
    updateLayoutConfig,
  };

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
}

// 页面内容容器（兼容层）
// 导航壳已上移至根布局 AppShell 统一承载，此处仅负责页面内容的容器语义，
// 保留原 props 签名以兼容存量页面的 <ResponsiveLayout showSidebar showHeader> 写法。
interface ResponsiveLayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
  showHeader?: boolean;
  className?: string;
}

export function ResponsiveLayout({
  children,
  className,
}: ResponsiveLayoutProps) {
  return <div className={cn('min-h-full w-full', className)}>{children}</div>;
}

/**
 * 全局导航壳：Sidebar + Header + main
 *
 * 自适应算法（零 JS 宽度计算，杜绝漂移）：
 * - 桌面端（lg+）：Sidebar 以 sticky 参与 flex 布局并占位，主区 flex-1 自动填充剩余宽度；
 * - 移动端（<lg）：Sidebar 为 fixed 抽屉，主区占满视口宽度；
 * - 内容内边距完全由 CSS 断点驱动（16/24/32px），不依赖 JS 测量，无水合跳变。
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  const { sidebarOpen, setSidebarOpen, layoutConfig } = useLayoutContext();

  return (
    <div className="flex min-h-screen w-full overflow-x-hidden bg-gray-50">
      <Sidebar />

      {/* 移动端抽屉遮罩 */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* 主区域：flex-1 自适应，min-w-0 防止内容撑破 */}
      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <Header
          height={layoutConfig.header.height}
          sticky={layoutConfig.header.sticky}
          showOnMobile={layoutConfig.header.showOnMobile}
          onMenuClick={() => setSidebarOpen(true)}
        />

        {/*
          主区不再附加内边距：由页面根容器自持 padding（与 Header 的 px-6 同基线），
          避免「Header px-6 + main px-8 + 页面 px-6」三层缩进叠加造成的视觉漂移与渐变灰边。
        */}
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
