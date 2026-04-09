'use client';

import { Event } from '@/types';
import Image from 'next/image';

interface EventModalProps {
  event: Event | null;
  onClose: () => void;
}

export default function EventModal({ event, onClose }: EventModalProps) {
  if (!event) return null;

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
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-surface-container rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-editorial"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <div className="flex justify-between items-center p-6 border-b border-outline-variant/10">
          <h2 className="text-2xl font-bold text-on-surface">{event.title}</h2>
          <button
            onClick={onClose}
            className="text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined text-3xl">close</span>
          </button>
        </div>

        {/* Event Image */}
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={event.image}
            alt={event.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="w-full h-full object-cover"
          />
          {event.isLive && (
            <div className="absolute top-4 left-4">
              <span className="bg-error px-3 py-1.5 rounded-lg text-xs font-bold uppercase text-on-error flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-on-error rounded-full animate-pulse"></span> LIVE
              </span>
            </div>
          )}
        </div>

        {/* Event Details */}
        <div className="p-6 space-y-6">
          {/* Category & Viewers */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-[0.05em] uppercase text-on-surface-variant bg-surface-container-high px-3 py-1.5 rounded-lg">
              {event.category}
            </span>
            {event.isLive && event.viewers && (
              <span className="text-sm font-semibold text-tertiary">
                {(event.viewers / 1000).toFixed(1)}k viewers watching
              </span>
            )}
          </div>

          {/* Time */}
          <div className="flex items-center gap-3 text-on-surface-variant">
            <span className="material-symbols-outlined">calendar_today</span>
            <span className="text-lg">{event.time}</span>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-on-surface">About this event</h3>
            <p className="text-on-surface-variant leading-relaxed">
              Join us for an incredible {event.category} experience. {event.title} promises to be an unforgettable session with world-class production and engaging content. Don't miss out!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4 border-t border-outline-variant/10">
            <button
              onClick={onClose}
              className="flex-1 bg-gradient-to-r from-primary to-primary-container text-on-primary-container font-bold py-3 rounded-lg hover:shadow-[0_0_20px_rgba(105,246,184,0.3)] transition-all active:scale-95"
            >
              {event.isLive ? 'Join Now' : 'Notify Me'}
            </button>
            <button onClick={handleShare} className="flex-1 glass border border-outline-variant/20 text-on-surface font-bold py-3 rounded-lg hover:bg-surface-container-highest transition-all active:scale-95">
              Share Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
