'use client';

import { useState, useMemo, useEffect } from 'react';
import HeroSection from '@/components/layout/HeroSection';
import FilterSection from '@/components/events/FilterSection';
import EventGrid from '@/components/events/EventGrid';
import EventModal from '@/components/common/EventModal';
import Footer from '@/components/layout/Footer';
import { EVENTS } from '@/lib/mockData';
import { filterEventsByCategory, sortEvents, searchEvents } from '@/lib/utils';
import { useFavorites } from '@/lib/useFavorites';
import { useSearch } from '@/context/SearchContext';
import { Event, EventCategory, SortOption } from '@/types';
import { useSearchParams } from 'next/navigation';

export default function HomeContent() {
  const searchParams = useSearchParams();
  const { searchQuery } = useSearch();

  const initialCategory = (searchParams.get('category') as EventCategory) || 'All Events';
  const initialFilter = searchParams.get('filter');

  const [activeCategory, setActiveCategory] = useState<EventCategory>(initialCategory);
  const [sortBy, setSortBy] = useState<SortOption>('popular');

  // Sync state with URL params
  useEffect(() => {
    setActiveCategory((searchParams.get('category') as EventCategory) || 'All Events');
  }, [searchParams]);

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [displayCount, setDisplayCount] = useState(12);

  const { favorites, toggleFavorite, isLoaded } = useFavorites();

  const filteredEvents = useMemo(() => {
    let result = EVENTS;
    if (initialFilter === 'live') {
      result = result.filter(e => e.isLive);
    } else if (initialFilter === 'saved') {
      result = result.filter(e => favorites.has(e.id));
    }

    result = searchEvents(result, searchQuery);
    result = filterEventsByCategory(result, activeCategory);
    result = sortEvents(result, sortBy);
    return result;
  }, [searchQuery, activeCategory, sortBy, initialFilter, favorites]);

  const displayedEvents = filteredEvents.slice(0, displayCount);

  const handleLoadMore = () => {
    setDisplayCount(prev => prev + 9);
  };

  return (
    <div className="bg-background">
      <section id="streams" className="relative">
        <HeroSection />
      </section>

      <section id="schedule">
        <FilterSection
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
      </section>

      <section id="discover" className="bg-background py-10">
        <div className="w-full px-8 lg:px-10">
          <EventGrid
            events={displayedEvents}
            onViewEvent={setSelectedEvent}
            isLoading={!isLoaded}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        </div>
      </section>

      {displayCount < filteredEvents.length && (
        <section className="bg-background pb-12">
          <div className="w-full px-8 lg:px-10">
            <div className="flex justify-center">
              <button
                onClick={handleLoadMore}
                className="glass border border-outline-variant/20 text-on-surface px-12 py-3.5 rounded-xl font-semibold text-sm hover:bg-surface-container-highest transition-all flex items-center gap-2"
              >
                Load More Events
              </button>
            </div>
          </div>
        </section>
      )}

      <Footer />
      <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </div>
  );
}

