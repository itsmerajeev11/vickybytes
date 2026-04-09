'use client';

import { EventCategory, SortOption } from '@/types';
import { CATEGORIES, SORT_OPTIONS } from '@/lib/mockData';

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
    <section className="px-8 lg:px-20 py-12 bg-surface-container-low">
      <div className="flex flex-col lg:flex-row gap-8 justify-between items-end">
        <div className="w-full lg:w-2/3">
          <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`px-6 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${
                  activeCategory === category
                    ? 'bg-primary text-on-primary-container'
                    : 'bg-surface-container-high text-on-surface-variant hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-4 w-full lg:w-auto">
          <div className="relative flex-1 lg:flex-none">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="appearance-none bg-surface-container-high text-on-surface text-sm border border-outline-variant/20 rounded-lg px-4 py-2 pr-10 w-full focus:ring-1 focus:ring-primary focus:outline-none transition-all"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <span className="material-symbols-outlined absolute right-3 top-2 text-on-surface-variant pointer-events-none">
              expand_more
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

