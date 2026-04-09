'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import TopNavBar from './TopNavBar';
import Sidebar from './Sidebar';
import { SearchProvider } from '@/context/SearchContext';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const pathname = usePathname();

  const isNoLayoutPage = pathname.startsWith('/event/');

  const sidebarWidth = sidebarCollapsed ? 'lg:pl-16' : 'lg:pl-56';

  if (isNoLayoutPage) {
    return <>{children}</>;
  }

  return (
    <SearchProvider>
      <div className="min-h-screen bg-background text-on-surface selection:bg-primary selection:text-on-primary-container">
        <TopNavBar />

        <div className="hidden lg:block">
          <Sidebar 
            isCollapsed={sidebarCollapsed} 
            onToggle={() => setSidebarCollapsed(p => !p)} 
          />
        </div>

        <main className={`pt-16 transition-all duration-300 ${sidebarWidth}`}>
          {children}
        </main>
      </div>
    </SearchProvider>
  );
}
