import * as Sentry from '@sentry/nextjs';

/**
 * @file sentry.server.config.ts
 * @description Server-side Sentry configuration for YYC3 Customer Care Center
 * @module sentry.server.config
 * @author YYC³ Team
 * @version 1.0.0
 * @created 2026-01-23
 * @updated 2026-06-04
 * @copyright Copyright (c) 2026 YYC³
 * @license MIT
 */

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment:
    process.env.SENTRY_ENVIRONMENT || process.env.NODE_ENV || 'development',
  tracesSampleRate: parseFloat(process.env.SENTRY_TRACES_SAMPLE_RATE || '0.1'),

  beforeSend(event) {
    if (event.exception) {
      event.fingerprint = ['{{ default }}', String(event.request?.url)];
    }
    return event;
  },

  beforeBreadcrumb(breadcrumb) {
    if (breadcrumb.category === 'http' && breadcrumb.data?.url) {
      const url = new URL(breadcrumb.data.url);
      if (url.pathname.includes('/api/health')) {
        return null;
      }
    }
    return breadcrumb;
  },
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
