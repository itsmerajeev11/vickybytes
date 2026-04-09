'use client';

import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative h-[614px] flex items-center px-8 lg:px-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80&w=1400"
          alt="Cinematic wide shot of a live music concert with dramatic stage lighting"
          fill
          priority
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-3xl">
        <span className="inline-block bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.05em] uppercase mb-4">
          The Future of Streaming
        </span>

        <h1 className="text-5xl md:text-7xl font-bold tracking-[-0.04em] text-on-surface leading-[0.95] mb-6 drop-shadow-lg">
          Experience Live Like Never Before
        </h1>

        <p className="text-on-surface-variant text-lg max-w-xl mb-8 leading-relaxed">
          Discover premium high-fidelity streams from the world's most talented creators. Join the Obsidian circle today.
        </p>

        <div className="flex gap-4 flex-wrap">
          <button className="bg-gradient-to-r from-primary to-primary-container text-on-primary-container font-bold py-3 px-8 rounded-xl hover:shadow-[0_0_20px_rgba(105,246,184,0.3)] transition-all active:scale-95 text-sm md:text-base">
            Browse Live Now
          </button>

          <button className="glass border border-outline-variant/20 text-on-surface font-bold py-3 px-8 rounded-xl hover:bg-surface-container-highest transition-all active:scale-95 text-sm md:text-base">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}

