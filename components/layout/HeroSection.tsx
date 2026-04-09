'use client';

import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative h-[680px] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80&w=1400"
          alt="Concert"
          fill
          priority
          sizes="100vw"
          className="w-full h-full object-cover opacity-60"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent"></div>
      </div>

      {/* Content — uses identical container to TopNavBar */}
      <div className="relative z-10 w-full">
        <div className="w-full px-8 lg:px-10 pt-8">
          <div className="max-w-2xl">

            <span className="inline-block bg-[#0A1F13] text-primary border border-primary/20 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.08em] uppercase mb-6">
              The Future of Streaming
            </span>

            <h1 className="text-6xl md:text-[5rem] font-black tracking-[-0.04em] text-white leading-[0.92] mb-6">
              Experience Live Like <br /> Never Before
            </h1>

            <p className="text-on-surface-variant text-lg font-medium max-w-lg mb-10 leading-relaxed">
              Discover premium high-fidelity streams from the world's most talented creators. Join the Obsidian circle today.
            </p>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => {
                  const element = document.getElementById('discover');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                    // Optional: if we want to also trigger the live filter, 
                    // we'd need to sync with the Home component's state or URL.
                    window.history.pushState({}, '', '/?filter=live');
                  }
                }}
                className="bg-primary text-black font-bold py-3.5 px-8 rounded-lg hover:opacity-90 transition-opacity active:scale-95"
              >
                Browse Live Now
              </button>
              <button 
                onClick={() => {
                  const element = document.getElementById('schedule');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="border border-white/20 bg-white/5 text-white font-bold py-3.5 px-8 rounded-lg hover:bg-white/10 transition-colors active:scale-95"
              >
                Learn More
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}