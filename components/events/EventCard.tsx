'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CalendarDays, Heart, Share2 } from 'lucide-react';
import { Event } from '@/types';

interface EventCardProps {
  event: Event;
  onViewEvent: (event: Event) => void;
  isFavorited?: boolean;
  onToggleFavorite?: (eventId: string) => void;
}

export default function EventCard({
  event,
  onViewEvent,
  isFavorited = false,
  onToggleFavorite
}: EventCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const router = useRouter();

  const handleViewEvent = () => {
    router.push(`/event/${event.id}`);
  };

  const handleShare = async () => {
    const sharePayload = {
      title: event.title,
      text: `Check out ${event.title} on VickyBytes`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(sharePayload);
        return;
      } catch {
        // Fall back to clipboard below.
      }
    }

    await navigator.clipboard.writeText(`${sharePayload.title} — ${sharePayload.url}`);
  };

  return (
    <div className="group bg-surface-container-low rounded-lg overflow-hidden transition-all hover:translate-y-[-4px]">
      <div className="relative aspect-video overflow-hidden bg-surface-container-high">
        {imageFailed ? (
          <div className="w-full h-full bg-surface-container-high flex items-center justify-center">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="11" stroke="rgba(255,255,255,0.25)" />
              <path d="M10 8L17 12L10 16V8Z" fill="rgba(255,255,255,0.8)" />
            </svg>
          </div>
        ) : (
          <Image
            src={event.image}
            alt={event.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={() => setImageFailed(true)}
          />
        )}

        <div className="absolute top-3 left-3 flex gap-2">
          {event.isLive && (
            <span className="bg-[#FF4A4A] px-2 py-0.5 rounded text-[10px] font-bold uppercase text-white tracking-wider flex items-center">
              LIVE
            </span>
          )}
          {event.viewers && (
            <span className="bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold uppercase text-white tracking-wider">
              {(event.viewers / 1000).toFixed(1)}K VIEWERS
            </span>
          )}
        </div>

        <div className="absolute bottom-3 right-3 flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite?.(event.id);
            }}
            className="rounded-full glass border border-outline-variant/20 w-8 h-8 flex items-center justify-center hover:bg-error/20 transition-colors"
            aria-label="Add to favorites"
          >
            <Heart size={18} className={isFavorited ? 'fill-error text-error' : 'text-white'} />
          </button>
          <button
            onClick={handleShare}
            className="rounded-full glass border border-outline-variant/20 w-8 h-8 flex items-center justify-center hover:bg-primary/20 transition-colors"
            aria-label="Share event"
          >
            <Share2 size={18} className="text-white" />
          </button>
        </div>
      </div>

      <div className="p-5">
        <span className="text-[10px] font-bold tracking-[0.05em] uppercase text-on-surface-variant mb-2 block">{event.category}</span>

        <h3 className="text-white font-semibold text-lg mb-4 line-clamp-1 cursor-pointer hover:text-primary transition-colors" onClick={handleViewEvent}>
          {event.title}
        </h3>

        <div className="flex items-center gap-2 text-on-surface-variant text-xs mb-6 font-medium">
          <CalendarDays size={14} className="text-on-surface-variant opacity-80"/>
          <span>{event.time}</span>
        </div>

        <button
          onClick={handleViewEvent}
          className="w-full py-2.5 rounded-xl bg-primary text-black hover:opacity-90 font-bold text-sm active:scale-95 transition-all duration-300 shadow-[0_0_20px_rgba(0,229,160,0.15)]"
        >
          View Event
        </button>
      </div>
    </div>
  );
}
