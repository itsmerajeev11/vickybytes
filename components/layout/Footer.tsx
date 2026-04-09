'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#000000] border-t border-[#484849]/20 w-full py-12">
      <div className="flex flex-col md:flex-row justify-between items-center px-12 gap-6 max-w-[1200px] mx-auto">
        <div className="flex flex-col gap-2">
          <span className="text-lg font-bold text-white">VickyBytes</span>
          <p className="font-['Inter'] text-sm tracking-wide text-on-surface-variant">© 2026 VickyBytes. All rights reserved.</p>
        </div>

        <div className="flex gap-8">
          <Link href="/terms" className="font-['Inter'] text-sm tracking-wide text-on-surface-variant hover:text-primary transition-colors">Terms</Link>
          <Link href="/privacy" className="font-['Inter'] text-sm tracking-wide text-on-surface-variant hover:text-primary transition-colors">Privacy</Link>
          <Link href="https://twitter.com/vickybytes" target="_blank" className="font-['Inter'] text-sm tracking-wide text-on-surface-variant hover:text-primary transition-colors">Twitter</Link>
          <Link href="https://instagram.com/vickybytes" target="_blank" className="font-['Inter'] text-sm tracking-wide text-on-surface-variant hover:text-primary transition-colors">Instagram</Link>
        </div>
      </div>
    </footer>
  );
}
