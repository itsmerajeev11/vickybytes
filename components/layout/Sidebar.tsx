'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Home, Radio, Clock, Bookmark, Compass, TrendingUp,
  Music, Gamepad2, Cpu, Paintbrush, BookOpen, ChevronLeft, ChevronRight
} from 'lucide-react';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const NAV_ITEMS = [
  { label: 'Home', icon: Home, href: '/', section: 'main' },
  { label: 'Live Now', icon: Radio, href: '/?filter=live', section: 'main' },
  { label: 'Schedule', icon: Clock, href: '/#schedule', section: 'main' },
  { label: 'Saved', icon: Bookmark, href: '/?filter=saved', section: 'main' },
  { label: 'Discover', icon: Compass, href: '/#discover', section: 'main' },
];

const CATEGORY_ITEMS = [
  { label: 'Trending', icon: TrendingUp, href: '/?category=trending' },
  { label: 'Music', icon: Music, href: '/?category=Music' },
  { label: 'Gaming', icon: Gamepad2, href: '/?category=Gaming' },
  { label: 'Tech', icon: Cpu, href: '/?category=Tech' },
  { label: 'Creative', icon: Paintbrush, href: '/?category=Creative' },
  { label: 'Workshops', icon: BookOpen, href: '/?category=Workshops' },
];

export default function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();

  const NavItem = ({ label, icon: Icon, href }: { label: string; icon: React.ElementType; href: string }) => {
    const isActive = pathname === href || (href === '/' && pathname === '/');
    return (
      <Link
        href={href}
        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative ${
          isActive
            ? 'bg-primary/10 text-primary'
            : 'text-on-surface-variant hover:bg-surface-container-high hover:text-white'
        }`}
        title={isCollapsed ? label : undefined}
      >
        <Icon size={20} className={`shrink-0 ${isActive ? 'text-primary' : ''}`} />
        {!isCollapsed && (
          <span className="text-sm font-medium truncate">{label}</span>
        )}
        {isCollapsed && (
          <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-surface-bright text-white text-xs font-semibold rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity z-50 shadow-lg">
            {label}
          </div>
        )}
      </Link>
    );
  };

  return (
    <aside
      className={`fixed left-0 top-16 h-[calc(100vh-64px)] bg-[#0e0e0f] border-r border-white/5 flex flex-col transition-all duration-300 z-40 ${
        isCollapsed ? 'w-16' : 'w-56'
      }`}
    >
      {/* Nav Items */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-2 space-y-1 no-scrollbar">

        {/* Main Nav */}
        {NAV_ITEMS.map(item => (
          <NavItem key={item.label} {...item} />
        ))}

        {/* Divider */}
        <div className={`my-3 border-t border-white/5 ${isCollapsed ? 'mx-2' : 'mx-1'}`} />

        {/* Categories */}
        {!isCollapsed && (
          <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant px-3 mb-2">Categories</p>
        )}
        {CATEGORY_ITEMS.map(item => (
          <NavItem key={item.label} {...item} />
        ))}

        {/* Divider */}
        <div className={`my-3 border-t border-white/5 ${isCollapsed ? 'mx-2' : 'mx-1'}`} />

        {/* Live Events Promo */}
        {!isCollapsed && (
          <div className="mx-1 p-3 bg-primary/5 border border-primary/10 rounded-xl">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-xs font-bold text-primary">4 LIVE NOW</span>
            </div>
            <p className="text-xs text-on-surface-variant leading-snug">Events are streaming right now</p>
          </div>
        )}
      </div>

      {/* Collapse Toggle */}
      <div className="px-2 py-3 border-t border-white/5 shrink-0">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center p-2.5 text-on-surface-variant hover:text-white hover:bg-surface-container-high rounded-xl transition-all"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight size={18} /> : (
            <div className="flex items-center gap-2 text-sm font-medium">
              <ChevronLeft size={18} /> Collapse
            </div>
          )}
        </button>
      </div>
    </aside>
  );
}
