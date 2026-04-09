'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Clock, CalendarDays, Filter } from 'lucide-react';
import { EVENTS } from '@/lib/mockData';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const TODAY_INDEX = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;

const SCHEDULE_SLOTS = [
  { time: '9:00 AM', events: [EVENTS[9], EVENTS[14]] },
  { time: '11:00 AM', events: [EVENTS[10]] },
  { time: '2:00 PM', events: [EVENTS[7], EVENTS[13]] },
  { time: '4:00 PM', events: [EVENTS[1]] },
  { time: '6:00 PM', events: [EVENTS[3]] },
  { time: '8:00 PM', events: [EVENTS[6]] },
  { time: '9:00 PM', events: [EVENTS[0], EVENTS[8]] },
  { time: '10:00 PM', events: [EVENTS[11]] },
  { time: '11:00 PM', events: [EVENTS[12]] },
];

export default function SchedulePage() {
  const [selectedDay, setSelectedDay] = useState(TODAY_INDEX);
  const [filter, setFilter] = useState('All');

  return (
    <div className="pb-16 px-8 lg:px-16 max-w-6xl mx-auto">
      <div className="pt-8 mb-8">
          <h1 className="text-4xl font-black tracking-tight text-white mb-2">Event Schedule</h1>
          <p className="text-on-surface-variant text-lg">Don't miss what's streaming this week</p>
        </div>

        {/* Day Picker */}
        <div className="flex gap-2 mb-8 overflow-x-auto no-scrollbar pb-2">
          {DAYS.map((day, i) => {
            const date = new Date();
            date.setDate(date.getDate() - TODAY_INDEX + i);
            return (
              <button
                key={day}
                onClick={() => setSelectedDay(i)}
                className={`flex flex-col items-center px-5 py-3 rounded-xl transition-all shrink-0 ${
                  selectedDay === i
                    ? 'bg-primary text-black font-bold'
                    : i === TODAY_INDEX
                    ? 'bg-surface-container-high border border-primary/30 text-primary'
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high hover:text-white'
                }`}
              >
                <span className="text-xs font-semibold">{day}</span>
                <span className="text-xl font-black leading-none mt-0.5">{date.getDate()}</span>
                {i === TODAY_INDEX && <span className="text-[8px] mt-1 font-bold uppercase tracking-wider">Today</span>}
              </button>
            );
          })}
        </div>

        {/* Filter */}
        <div className="flex items-center gap-3 mb-6">
          <Filter size={16} className="text-on-surface-variant" />
          {['All', 'Live', 'Upcoming', 'Music', 'Gaming', 'Tech'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
                filter === f ? 'bg-primary text-black' : 'bg-surface-container-low text-on-surface-variant hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="space-y-4">
          {SCHEDULE_SLOTS.map((slot, idx) => (
            <div key={idx} className="flex gap-6 items-start">
              {/* Time */}
              <div className="w-20 shrink-0 pt-3">
                <div className="flex items-center gap-1.5 text-on-surface-variant">
                  <Clock size={13} />
                  <span className="text-xs font-semibold">{slot.time}</span>
                </div>
              </div>
              {/* Divider */}
              <div className="flex flex-col items-center shrink-0 pt-3">
                <div className="w-2.5 h-2.5 rounded-full bg-surface-container-high border-2 border-primary/40" />
                <div className="w-px flex-1 bg-white/5 mt-1 min-h-[40px]" />
              </div>
              {/* Events */}
              <div className="flex-1 flex flex-wrap gap-3 pb-4">
                {slot.events.map(event => (
                  <Link href={`/event/${event.id}`} key={event.id}
                    className="flex items-center gap-3 bg-surface-container-low border border-white/5 hover:border-primary/20 rounded-xl p-3 transition-all group flex-1 min-w-[200px] max-w-sm"
                  >
                    <div className="relative w-14 h-10 rounded-lg overflow-hidden shrink-0">
                      <Image src={event.image} alt={event.imageAlt} fill className="object-cover" />
                      {event.isLive && (
                        <span className="absolute top-0.5 left-0.5 bg-[#FF4A4A] text-white text-[7px] font-bold px-1 py-0.5 rounded">LIVE</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-on-surface-variant font-medium mb-0.5">{event.category}</p>
                      <p className="text-sm font-semibold text-white group-hover:text-primary transition-colors line-clamp-1">{event.title}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <CalendarDays size={10} className="text-on-surface-variant" />
                        <span className="text-[10px] text-on-surface-variant">{event.time}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
    </div>
  );
}
