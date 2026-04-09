'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#000000] border-t border-[#484849]/20 w-full py-12">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 lg:px-20 gap-6">
        <div className="flex flex-col gap-2">
          <span className="text-lg font-bold text-white">VickyBytes</span>
          <p className="font-body text-sm tracking-wide text-on-surface-variant">© 2024 VickyBytes. All rights reserved.</p>
        </div>

        <div className="flex gap-8">
          <Link href="#" className="font-body text-sm tracking-wide text-on-surface-variant hover:text-primary transition-colors">Terms</Link>
          <Link href="#" className="font-body text-sm tracking-wide text-on-surface-variant hover:text-primary transition-colors">Privacy</Link>
          <Link href="#" className="font-body text-sm tracking-wide text-on-surface-variant hover:text-primary transition-colors">Twitter</Link>
          <Link href="#" className="font-body text-sm tracking-wide text-on-surface-variant hover:text-primary transition-colors">Instagram</Link>
        </div>
      </div>
    </footer>
  );
}

