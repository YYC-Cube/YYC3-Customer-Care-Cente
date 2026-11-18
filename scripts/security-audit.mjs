/**
 * @file security-audit.mjs
 * @description 依赖安全审计门禁：对可修复的 high/critical 漏洞直接失败；
 *              对尚无修复版本（patched_versions = <0.0.0）的 0-day 漏洞记录为已知风险并豁免。
 * @module scripts.security-audit
 * @author YYC³ Team
 * @version 1.0.0
 * @created 2026-11-18
 * @copyright Copyright (c) 2026 YYC³
 * @license MIT
 */

import { execFileSync } from 'node:child_process';

let raw;
try {
  raw = execFileSync(
    'pnpm',
    ['audit', '--prod', '--json', '--registry=https://registry.npmjs.org'],
    { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 }
  );
} catch (error) {
  // pnpm audit 在发现漏洞时会以非零码退出，但 stdout 仍含 JSON
  raw = error.stdout || '{}';
}

const result = JSON.parse(raw || '{}');
const advisories = Object.values(result.advisories || {});
const actionable = [];
const acknowledged = [];

for (const advisory of advisories) {
  const severity = advisory.severity;
  if (severity !== 'high' && severity !== 'critical') continue;

  const noFixAvailable =
    !advisory.patched_versions || advisory.patched_versions === '<0.0.0';

  const entry = `${severity.toUpperCase()} ${advisory.module_name} ${advisory.github_advisory_id || advisory.title}`;
  if (noFixAvailable) {
    acknowledged.push(entry);
  } else {
    actionable.push(`${entry} -> fix: ${advisory.patched_versions}`);
  }
}

if (acknowledged.length) {
  console.log('已知风险（上游暂无修复版本，已豁免）:');
  acknowledged.forEach((e) => console.log(`  - ${e}`));
}

if (actionable.length) {
  console.error('\n发现可修复的高危漏洞，CI 阻断:');
  actionable.forEach((e) => console.error(`  - ${e}`));
  process.exit(1);
}

console.log('\n依赖安全审计通过（无未修复的高危漏洞）');
