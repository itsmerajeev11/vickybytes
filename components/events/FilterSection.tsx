'use client';

import { EventCategory, SortOption } from '@/types';
import { CATEGORIES, SORT_OPTIONS } from '@/lib/mockData';
import { ChevronDown } from 'lucide-react';

interface FilterSectionProps {
  activeCategory: EventCategory;
  onCategoryChange: (category: EventCategory) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export default function FilterSection({
  activeCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
}: FilterSectionProps) {
  return (
    <section className="bg-background py-6 border-b border-white/5 relative z-20">
      <div className="w-full px-8 lg:px-10">
        <div className="flex flex-col lg:flex-row gap-8 justify-between items-end">
          <div className="w-full lg:w-2/3">
            <div className="flex gap-3 overflow-x-auto no-scrollbar">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => onCategoryChange(category)}
                  className={`px-5 h-10 rounded text-sm flex items-center justify-center font-semibold whitespace-nowrap transition-all duration-200 ${
                    activeCategory === category
                      ? 'bg-primary text-black'
                      : 'bg-surface-container-high text-on-surface-variant hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 w-full lg:w-auto">
            <div className="relative flex-1 lg:flex-none lg:w-56">
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value as SortOption)}
                className="appearance-none bg-surface-container-high border border-outline-variant/10 text-on-surface px-6 h-12 pr-10 rounded text-base font-bold focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer w-full"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
