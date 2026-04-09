'use client';

import { Suspense } from 'react';
import HomeContent from '../components/layout/HomeContent';

export default function Home() {
  return (
    <Suspense fallback={<div className="bg-background min-h-screen" />}>
      <HomeContent />
    </Suspense>
  );
}
