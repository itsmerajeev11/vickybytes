'use client';

import Link from 'next/link';
import Image from 'next/image';
import { TrendingUp, Zap, Star, Users } from 'lucide-react';
import { EVENTS } from '@/lib/mockData';

const FEATURED = EVENTS.filter(e => e.featured);
const TRENDING = [...EVENTS].sort((a, b) => (b.viewers ?? 0) - (a.viewers ?? 0)).slice(0, 6);
const RECOMMENDED = EVENTS.filter(e => !e.isLive).slice(0, 6);

const CREATOR_PICKS = [
  { name: 'ProGamer_X', category: 'Gaming & Esports', followers: '124K', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100&h=100', color: '#00E5A0' },
  { name: 'SynthWave_Studio', category: 'Music Production', followers: '89K', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100', color: '#ac8aff' },
  { name: 'DevEthics_Lab', category: 'Technology', followers: '67K', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=100&h=100', color: '#77e6ff' },
  { name: 'DesignWithMe', category: 'Workshops', followers: '45K', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100&h=100', color: '#ff9f43' },
];

function EventCard({ event }: { event: typeof EVENTS[0] }) {
  return (
    <Link href={`/event/${event.id}`} className="group bg-[#1a191b] border border-white/5 hover:border-primary/20 rounded-xl overflow-hidden transition-all hover:-translate-y-1">
      <div className="relative aspect-video overflow-hidden">
        <Image src={event.image} alt={event.imageAlt} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        {event.isLive && (
          <div className="absolute top-2 left-2 flex gap-1.5">
            <span className="bg-[#FF4A4A] text-white text-[9px] font-bold px-2 py-0.5 rounded">LIVE</span>
            {event.viewers && <span className="bg-black/70 backdrop-blur text-white text-[9px] font-bold px-2 py-0.5 rounded">{(event.viewers / 1000).toFixed(1)}K</span>}
          </div>
        )}
      </div>
      <div className="p-4">
        <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant mb-1">{event.category}</p>
        <h3 className="text-sm font-bold text-white group-hover:text-primary transition-colors line-clamp-2 mb-2">{event.title}</h3>
        <p className="text-xs text-on-surface-variant">{event.time}</p>
      </div>
    </Link>
  );
}

export default function DiscoverPage() {
  return (
    <div className="pb-16 px-8 lg:px-16 max-w-7xl mx-auto space-y-14">
      <div className="pt-8">
        {/* Hero Banner */}
        {FEATURED[0] && (
          <section>
            <div className="relative h-64 rounded-2xl overflow-hidden">
              <Image src={FEATURED[0].image} alt={FEATURED[0].imageAlt} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-center px-10">
                <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 w-fit">
                  <Zap size={10} /> Editor's Pick
                </span>
                <h2 className="text-3xl font-black text-white mb-2">{FEATURED[0].title}</h2>
                <p className="text-on-surface-variant text-sm mb-4 max-w-md line-clamp-2">{FEATURED[0].description}</p>
                <Link href={`/event/${FEATURED[0].id}`} className="bg-primary text-black font-bold px-6 py-2.5 rounded-lg w-fit hover:opacity-90 transition-opacity text-sm">
                  Watch Now
                </Link>
              </div>
              {FEATURED[0].isLive && (
                <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-[#FF4A4A] text-white text-xs font-bold px-3 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> LIVE
                </div>
              )}
            </div>
          </section>
        )}

        {/* Trending Now */}
        <section className="mt-12">
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp size={18} className="text-primary" />
            <h2 className="text-xl font-black">Trending Now</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {TRENDING.map(e => <EventCard key={e.id} event={e} />)}
          </div>
        </section>

        {/* Recommended */}
        <section className="mt-12">
          <div className="flex items-center gap-2 mb-5">
            <Star size={18} className="text-primary" />
            <h2 className="text-xl font-black">Recommended for You</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {RECOMMENDED.map(e => <EventCard key={e.id} event={e} />)}
          </div>
        </section>

        {/* Top Creators */}
        <section className="mt-12">
          <div className="flex items-center gap-2 mb-5">
            <Users size={18} className="text-primary" />
            <h2 className="text-xl font-black">Top Creators</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CREATOR_PICKS.map(creator => (
              <div key={creator.name} className="bg-[#1a191b] border border-white/5 rounded-xl p-5 flex flex-col items-center text-center hover:border-white/10 transition-all">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 mb-3" style={{ borderColor: creator.color }}>
                  <Image src={creator.avatar} alt={creator.name} width={64} height={64} />
                </div>
                <p className="font-bold text-white text-sm mb-0.5">{creator.name}</p>
                <p className="text-xs text-on-surface-variant mb-3">{creator.category}</p>
                <p className="text-xs font-semibold mb-4" style={{ color: creator.color }}>{creator.followers} followers</p>
                <button className="w-full py-2 rounded-lg text-xs font-bold bg-surface-container-high text-white hover:bg-white/10 transition-colors">
                  Follow
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
