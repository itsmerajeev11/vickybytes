export interface Event {
  id: string;
  title: string;
  category: string;
  image: string;
  imageAlt: string;
  time: string;
  isLive: boolean;
  viewers?: number;
  featured?: boolean;
  description?: string;
  videoId?: string;
  streamer?: string;
  streamerAvatar?: string;
  tags?: string[];
  likes?: number;
}

export type EventCategory = 'All Events' | 'Music' | 'Tech' | 'Gaming' | 'Workshops' | 'Creative';

export interface User {
  id: string;
  name: string;
  avatar: string;
}

export type SortOption = 'popular' | 'newest' | 'upcoming';

