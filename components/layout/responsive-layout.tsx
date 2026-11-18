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

// 主布局组件
interface ResponsiveLayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
  showHeader?: boolean;
  className?: string;
}

export function ResponsiveLayout({
  children,
  showSidebar = true,
  showHeader = true,
  className,
}: ResponsiveLayoutProps) {
  const { sidebarCollapsed, sidebarOpen, setSidebarOpen, layoutConfig } =
    useLayoutContext();
  // 使用 Provider 中的同一份配置，避免配置源分裂
  const { isMobile, getContentStyles } = useResponsiveLayout(layoutConfig);

  // 计算主内容区域的边距
  const getMainContentMargin = () => {
    if (!showSidebar) return '0';
    if (isMobile) return '0';

    return sidebarCollapsed
      ? `${layoutConfig.sidebar.width.collapsed}px`
      : `${layoutConfig.sidebar.width.expanded}px`;
  };

  return (
    <div className={cn('min-h-screen overflow-x-hidden bg-gray-50', className)}>
      {/* 侧边栏 */}
      {showSidebar && <Sidebar />}

      {/* 移动端遮罩：抽屉展开时显示，层级位于 Sidebar(z-50) 之下、Header(z-40) 之下 */}
      {showSidebar && sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* 主内容区域：块级元素自适应剩余宽度，去除 width:100% 避免与 marginLeft 叠加溢出 */}
      <div
        className="min-h-screen transition-[margin] duration-300 ease-in-out"
        style={{ marginLeft: getMainContentMargin() }}
      >
        {/* 头部 */}
        {showHeader && (
          <Header
            height={layoutConfig.header.height}
            sticky={layoutConfig.header.sticky}
            showOnMobile={layoutConfig.header.showOnMobile}
            onMenuClick={() => setSidebarOpen(true)}
          />
        )}

        {/* 页面内容 */}
        <main className="min-h-screen w-full" style={getContentStyles()}>
          {children}
        </main>
      </div>
    </div>
  );
}
