'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface TopNavBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function TopNavBar({ searchQuery, onSearchChange }: TopNavBarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#131314] flex justify-between items-center px-8 h-16 border-b border-outline-variant/10">
      <div className="flex items-center gap-8">
        <span className="text-xl font-bold tracking-tighter text-white">VickyBytes</span>
        <div className="hidden md:flex gap-6 items-center font-body tracking-[-0.04em] font-medium">
          <Link
            href="#"
            className="text-primary border-b-2 border-primary pb-1 hover:text-white transition-colors duration-200"
          >
            Streams
          </Link>
          <Link
            href="#"
            className="text-on-surface-variant hover:text-white transition-colors duration-200"
          >
            Schedule
          </Link>
          <Link
            href="#"
            className="text-on-surface-variant hover:text-white transition-colors duration-200"
          >
            Discover
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative hidden lg:block">
          <input
            type="text"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="bg-surface-container-high text-on-surface border-none rounded-xl px-4 py-1.5 text-sm w-64 focus:ring-1 focus:ring-primary focus:outline-none transition-all"
          />
          <span className="material-symbols-outlined absolute right-3 top-1.5 text-on-surface-variant text-lg pointer-events-none">
            search
          </span>
        </div>

        <button className="bg-gradient-to-r from-primary to-primary-container text-on-primary-container font-semibold py-2 px-4 rounded-xl active:scale-95 duration-100 text-sm hover:shadow-[0_0_20px_rgba(105,246,184,0.2)] transition-all">
          Create Event
        </button>

        <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant/20 hover:border-primary/30 transition-colors">
          <Image
            alt="User Profile"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDpR374wXG0HwqyyuEMR_2UhiJ9kYXWSH0QA190wPsM3pFNmHJX4kwdJcSFzhIG38bc_1oRGrlI0e6m1_qOK_flQkIgQORis0zWk1xHkruSwjWll35E_iIGK75tDHmYpcmHTwqimighDy7ZjF_o3z-4v3j2VIx-OY1GrrOINBPma44A9UKFrOXMhD_Cu_C2NjkRaVnGsRnzd_9Ql7ATJ6gBNfaBqqrKp4GmB7rSnK81GUpYab_x5vmW2P_3-mBpy31EMbw-ONTjrY"
            width={32}
            height={32}
            className="w-full h-full object-cover"
          />
        </div>

        <button
          className="md:hidden text-on-surface hover:text-primary transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="material-symbols-outlined text-2xl">
            {isMobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-surface-container-low border-b border-outline-variant/10 md:hidden p-4 flex flex-col gap-4">
          <Link href="#" className="text-primary">
            Streams
          </Link>
          <Link href="#" className="text-on-surface-variant">
            Schedule
          </Link>
          <Link href="#" className="text-on-surface-variant">
            Discover
          </Link>
        </div>
      )}
    </nav>
  );
}

