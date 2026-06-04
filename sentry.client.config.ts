import * as Sentry from '@sentry/nextjs';
import { browserTracingIntegration, replayIntegration } from '@sentry/nextjs';

/**
 * @file sentry.client.config.ts
 * @description Client-side Sentry configuration for YYC3 Customer Care Center
 * @module sentry.client.config
 * @author YYC³ Team
 * @version 1.0.0
 * @created 2026-01-23
 * @updated 2026-06-04
 * @copyright Copyright (c) 2026 YYC³
 * @license MIT
 */

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment:
    process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT ||
    process.env.NODE_ENV ||
    'development',
  tracesSampleRate: parseFloat(
    process.env.NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE || '0.1'
  ),
  replaysSessionSampleRate: parseFloat(
    process.env.NEXT_PUBLIC_SENTRY_REPLAY_SESSION_SAMPLE_RATE || '0.1'
  ),
  replaysOnErrorSampleRate: parseFloat(
    process.env.NEXT_PUBLIC_SENTRY_REPLAY_ON_ERROR_SAMPLE_RATE || '1.0'
  ),

  integrations: [
    browserTracingIntegration(),
    replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],

  beforeSend(event) {
    if (event.exception) {
      event.fingerprint = ['{{ default }}', String(event.request?.url)];
    }
    return event;
  },
});
