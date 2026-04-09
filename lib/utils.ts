import { Event, SortOption } from '@/types';

export function filterEventsByCategory(events: Event[], category: string): Event[] {
  if (category === 'All Events') return events;
  return events.filter(event => event.category.includes(category));
}

export function sortEvents(events: Event[], sortBy: SortOption): Event[] {
  const sorted = [...events];

  switch (sortBy) {
    case 'newest':
      return sorted.reverse();
    case 'upcoming':
      return sorted.sort((a, b) => {
        const aIsLive = a.isLive ? 0 : 1;
        const bIsLive = b.isLive ? 0 : 1;
        return aIsLive - bIsLive;
      });
    case 'popular':
    default:
      return sorted.sort((a, b) => (b.viewers || 0) - (a.viewers || 0));
  }
}

export function searchEvents(events: Event[], query: string): Event[] {
  if (!query.trim()) return events;
  const lowerQuery = query.toLowerCase();
  return events.filter(event =>
    event.title.toLowerCase().includes(lowerQuery) ||
    event.category.toLowerCase().includes(lowerQuery)
  );
}

export function getTimeFormat(time: string): string {
  return time;
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

