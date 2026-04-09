'use client';

import { useState, useEffect } from 'react';

const FAVORITES_KEY = 'vickybytes_favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setFavorites(new Set(parsed));
        }
      }
    } catch {
      localStorage.removeItem(FAVORITES_KEY);
    }
    setIsLoaded(true);
  }, []);

  const toggleFavorite = (eventId: string) => {
    setFavorites(prev => {
      const updated = new Set(prev);
      if (updated.has(eventId)) {
        updated.delete(eventId);
      } else {
        updated.add(eventId);
      }
      localStorage.setItem(FAVORITES_KEY, JSON.stringify([...updated]));
      return updated;
    });
  };

  const isFavorited = (eventId: string) => favorites.has(eventId);

  return { favorites, isFavorited, toggleFavorite, isLoaded };
}

