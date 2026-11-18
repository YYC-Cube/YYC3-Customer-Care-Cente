/**
 * @file page.tsx
 * @description page component/module for YYC3 Customer Care Center
 * @module app.communication.page
 * @author YYC³ Team
 * @version 1.0.0
 * @created 2026-01-23
 * @updated 2026-01-23
 * @copyright Copyright (c) 2026 YYC³
 * @license MIT
 */

'use client';

import { ResponsiveLayout } from '@/components/layout/responsive-layout';
import { CommunicationModule } from '@/components/communication-module';

export default function CommunicationPage() {
  return (
    <ResponsiveLayout showSidebar={true} showHeader={true}>
      <CommunicationModule />
    </ResponsiveLayout>
  );
}
