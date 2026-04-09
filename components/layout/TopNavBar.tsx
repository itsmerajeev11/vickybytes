'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useSearch } from '@/context/SearchContext';
import { Search, ChevronDown, User, Settings, CreditCard, LogOut } from 'lucide-react';

export default function TopNavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { searchQuery, setSearchQuery } = useSearch();
  const pathname = usePathname();
  const router = useRouter();

  const NAV_LINKS = [
    { label: 'Streams', href: '/' },
    { label: 'Schedule', href: '/schedule' },
    { label: 'Discover', href: '/discover' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#131314]/95 backdrop-blur-sm flex items-center h-16 border-b border-white/5">
      <div className="flex justify-between items-center w-full px-8">
      <div className="flex items-center gap-8">
        <span className="text-xl font-bold tracking-tighter text-white">VickyBytes</span>
        <div className="hidden md:flex gap-6 items-center font-['Inter'] tracking-[-0.04em] font-medium">
          {NAV_LINKS.map(link => (
            <Link key={link.label} href={link.href}
              className={`transition-colors duration-200 ${
                pathname === link.href
                  ? 'text-primary border-b-2 border-primary pb-1'
                  : 'text-on-surface-variant hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative hidden lg:block">
          <input
            type="text"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-[#1C1C1E] text-on-surface border-none rounded-xl px-5 h-12 text-base w-96 focus:ring-1 focus:ring-primary focus:outline-none transition-all"
          />
          <Search size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant" />
        </div>

        <Link href="/create-event" className="bg-primary text-black font-bold h-12 px-12 rounded-xl hover:bg-primary-fixed-dim transition-colors duration-200 active:scale-95 text-base whitespace-nowrap flex items-center">
          Create Event
        </Link>

        <div className="relative">
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant/20 hover:ring-2 hover:ring-primary/30 transition-all flex items-center justify-center bg-surface-container-high"
          >
            <Image
              alt="User Profile"
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100&h=100"
              width={40}
              height={40}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Reliable fallback if Unsplash fails
                (e.target as any).src = 'https://ui-avatars.com/api/?name=RS&background=201f21&color=00E5A0';
              }}
            />
          </button>

          {/* Profile Dropdown */}
          {isProfileOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)} />
              <div className="absolute right-0 mt-3 w-56 bg-[#1a191b] border border-white/5 rounded-2xl shadow-2xl z-50 py-2 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-4 py-3 border-b border-white/5">
                  <p className="text-sm font-bold text-white">Rajeev S.</p>
                  <p className="text-xs text-on-surface-variant">rajeev@vickybytes.com</p>
                </div>
                <div className="py-2">
                  <Link href="/profile" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-on-surface-variant hover:text-white hover:bg-white/5 transition-colors">
                    <User size={16} /> My Profile
                  </Link>
                  <Link href="/profile?tab=settings" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-on-surface-variant hover:text-white hover:bg-white/5 transition-colors">
                    <Settings size={16} /> Settings
                  </Link>
                  <Link href="/profile?tab=billing" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-on-surface-variant hover:text-white hover:bg-white/5 transition-colors">
                    <CreditCard size={16} /> Subscription
                  </Link>
                </div>
                <div className="pt-2 border-t border-white/5">
                  <button onClick={() => setIsProfileOpen(false)} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-400/5 transition-colors">
                    <LogOut size={16} /> Sign Out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-[#0a0a0a] border-b border-white/10 md:hidden p-4 flex flex-col gap-4 shadow-xl">
          <div className="relative">
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/[0.07] text-white border border-white/[0.15] rounded-[8px] px-4 pr-10 py-2 text-sm w-full focus:ring-1 focus:ring-[#00E5A0] focus:outline-none"
            />
            <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70" />
          </div>

          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-left text-[#00E5A0] font-semibold hover:text-primary-fixed transition-colors">
            Streams
          </Link>
          <Link href="/schedule" onClick={() => setIsMobileMenuOpen(false)} className="text-left text-white/70 hover:text-white transition-colors">
            Schedule
          </Link>
          <Link href="/discover" onClick={() => setIsMobileMenuOpen(false)} className="text-left text-white/70 hover:text-white transition-colors">
            Discover
          </Link>
          <button className="w-full bg-[#00E5A0] text-black font-semibold py-2 px-4 rounded-[6px] active:scale-95 text-sm">
            Create Event
          </button>
        </div>
      )}
      </div>
    </nav>
  );
}
