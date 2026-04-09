'use client';

import { Event } from '@/types';
import EventCard from './EventCard';

interface EventGridProps {
  events: Event[];
  onViewEvent: (event: Event) => void;
  isLoading?: boolean;
}

export default function EventGrid({ events, onViewEvent, isLoading }: EventGridProps) {
  if (isLoading) {
    return (
      <section className="px-8 lg:px-20 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="bg-surface-container-low rounded-xl animate-pulse">
              <div className="aspect-video bg-surface-container-high rounded-t-xl"></div>
              <div className="p-5 space-y-3">
                <div className="h-3 bg-surface-container-high rounded w-20"></div>
                <div className="h-5 bg-surface-container-high rounded w-full"></div>
                <div className="h-3 bg-surface-container-high rounded w-32"></div>
                <div className="h-10 bg-surface-container-high rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (events.length === 0) {
    return (
      <section className="px-8 lg:px-20 py-16">
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <span className="material-symbols-outlined text-5xl text-on-surface-variant mb-4">search</span>
          <h3 className="text-2xl font-bold text-on-surface mb-2">No events found</h3>
          <p className="text-on-surface-variant">Try adjusting your filters or search query</p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-8 lg:px-20 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
        {events.map((event) => (
          <EventCard key={event.id} event={event} onViewEvent={onViewEvent} />
        ))}
      </div>

      {events.length > 0 && (
        <div className="mt-20 flex justify-center">
          <button className="glass border border-outline-variant/20 text-on-surface px-12 py-4 rounded-xl font-bold hover:bg-surface-container-highest transition-all flex items-center gap-2 active:scale-95">
            Load More Events
            <span className="material-symbols-outlined">expand_more</span>
          </button>
        </div>
      )}
    </section>
  );
}

