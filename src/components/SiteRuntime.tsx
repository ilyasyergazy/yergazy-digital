'use client';

import { useEffect } from 'react';
import { initSite } from '@/site/runtime';

export default function SiteRuntime() {
  useEffect(() => initSite(), []);
  return null;
}
