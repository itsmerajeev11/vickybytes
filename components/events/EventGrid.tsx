'use client';

import { Event } from '@/types';
import EventCard from './EventCard';

interface EventGridProps {
  events: Event[];
  onViewEvent: (event: Event) => void;
  isLoading?: boolean;
  favorites?: Set<string>;
  onToggleFavorite?: (eventId: string) => void;
}

export default function EventGrid({
  events,
  onViewEvent,
  isLoading,
  favorites = new Set(),
  onToggleFavorite
}: EventGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="bg-surface-container-low rounded-lg animate-pulse">
            <div className="aspect-video bg-surface-container-high rounded-t-lg"></div>
            <div className="p-5 space-y-3">
              <div className="h-3 bg-surface-container-high rounded w-20"></div>
              <div className="h-5 bg-surface-container-high rounded w-full"></div>
              <div className="h-3 bg-surface-container-high rounded w-32"></div>
              <div className="h-10 bg-surface-container-high rounded mt-4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <span className="text-5xl mb-4">🔍</span>
        <h3 className="text-2xl font-bold text-white mb-2">No events found</h3>
        <p className="text-gray-400">Try adjusting your filters or search query</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onViewEvent={onViewEvent}
          isFavorited={favorites.has(event.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}
