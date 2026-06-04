/**
 * @file layout.tsx
 * @description layout component/module for YYC3 Customer Care Center
 * @module app.layout
 * @author YYC³ Team
 * @version 1.0.0
 * @created 2026-01-23
 * @updated 2026-01-23
 * @copyright Copyright (c) 2026 YYC³
 * @license MIT
 */

import type React from 'react';
import type { Metadata, Viewport } from 'next';
import { ResponsiveLayoutProvider } from '@/components/layout/responsive-layout';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://ccc.yyc3.top'),
  title: {
    default: 'YYC³ Customer Care Center | 言语云客户关怀中心',
    template: '%s | YYC³ CCC',
  },
  description:
    '现代化AI代理服务客户关怀中心 - 智能高效安全的企业客户服务解决方案',
  keywords: ['YYC³', 'Customer Care', 'AI', '客户关怀', '智能客服', '言雨云'],
  authors: [{ name: 'YYC³ Team' }],
  creator: 'YYC³',
  publisher: 'YYC³',
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://ccc.yyc3.top',
    siteName: 'YYC³ Customer Care Center',
    title: 'YYC³ Customer Care Center | 言语云客户关怀中心',
    description:
      '现代化AI代理服务客户关怀中心 - 智能高效安全的企业客户服务解决方案',
    images: [
      {
        url: '/yyc3-icons/pwa/icon-512x512.png',
        width: 512,
        height: 512,
        alt: 'YYC³ Customer Care Center',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YYC³ Customer Care Center',
    description: '现代化AI代理服务客户关怀中心',
    images: ['/yyc3-icons/pwa/icon-512x512.png'],
  },
  icons: {
    icon: [
      {
        url: '/yyc3-icons/favicon/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        url: '/yyc3-icons/favicon/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/yyc3-icons/favicon/favicon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
      },
      { url: '/yyc3-icons/favicon/favicon.ico' },
    ],
    apple: [{ url: '/yyc3-icons/ios/icon-152x152.png' }],
  },
  manifest: '/yyc3-icons/pwa/manifest.json',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased" suppressHydrationWarning>
        <ResponsiveLayoutProvider>{children}</ResponsiveLayoutProvider>
      </body>
    </html>
  );
}
