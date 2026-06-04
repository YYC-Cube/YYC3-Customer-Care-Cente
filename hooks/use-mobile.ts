'use client';

import { useState, useEffect } from 'react';

/**
 * 🎯 useMediaQuery
 * 响应式媒体查询 Hook，支持 SSR 与客户端渲染
 *
 * @param query - CSS 媒体查询字符串，如 "(max-width: 768px)"
 * @returns 是否匹配该媒体查询
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQueryList = window.matchMedia(query);
    const updateMatch = () => setMatches(mediaQueryList.matches);

    updateMatch();
    mediaQueryList.addEventListener('change', updateMatch);
    return () => mediaQueryList.removeEventListener('change', updateMatch);
  }, [query]);

  return matches;
}
