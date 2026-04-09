'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Bookmark, Settings, Bell, LogOut, Edit2, Star, Users, Eye } from 'lucide-react';
import { EVENTS } from '@/lib/mockData';

const USER = {
  name: 'Rajeev S.',
  username: '@rajeev_streams',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100&h=100',
  bio: 'Live event enthusiast. Love gaming, music, and tech streams. Always online for the good stuff. 🎮🎵',
  followers: '1.2K',
  following: '348',
  joined: 'April 2024',
};

const TABS = ['Liked', 'Saved', 'History'];
const LIKED_EVENTS = EVENTS.slice(0, 4);
const SAVED_EVENTS = EVENTS.slice(3, 7);
const HISTORY_EVENTS = EVENTS.slice(0, 8);

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('Liked');
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(USER.bio);
  const [editBio, setEditBio] = useState(USER.bio);

  const eventList = activeTab === 'Liked' ? LIKED_EVENTS : activeTab === 'Saved' ? SAVED_EVENTS : HISTORY_EVENTS;

  return (
    <div className="pb-16 px-4 max-w-4xl mx-auto pt-8">
      {/* Profile Card */}
      <div className="bg-[#131314] border border-white/5 rounded-2xl overflow-hidden mb-8">
        {/* Cover */}
        <div className="h-32 bg-gradient-to-r from-primary/20 via-purple-900/30 to-blue-900/20 relative">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800')] bg-cover bg-center opacity-10" />
        </div>

        <div className="px-6 pb-6">
          {/* Avatar + Actions */}
          <div className="flex items-end justify-between -mt-10 mb-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-[#131314] bg-surface-container-high">
                <Image 
                  src={USER.avatar} 
                  alt={USER.name} 
                  width={80} 
                  height={80} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Reliable fallback if Unsplash fails
                    (e.target as any).src = 'https://ui-avatars.com/api/?name=RS&background=201f21&color=00E5A0';
                  }}
                />
              </div>
              <div className="absolute bottom-1 right-1 w-4 h-4 bg-primary rounded-full border-2 border-[#131314]" />
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => { setIsEditing(true); setEditBio(bio); }}
                className="flex items-center gap-1.5 px-4 py-2 border border-white/10 rounded-xl text-sm font-semibold text-white hover:bg-white/5 transition-colors"
              >
                <Edit2 size={14} /> Edit Profile
              </button>
              <button className="flex items-center gap-1.5 px-4 py-2 border border-white/10 rounded-xl text-sm font-semibold text-on-surface-variant hover:text-red-400 hover:border-red-400/20 transition-colors">
                <LogOut size={14} /> Sign Out
              </button>
            </div>
          </div>

          {/* Name & Bio */}
          <div className="mb-4">
            <h1 className="text-2xl font-black text-white">{USER.name}</h1>
            <p className="text-sm text-primary font-medium">{USER.username}</p>
          </div>

          {isEditing ? (
            <div className="mb-4">
              <textarea value={editBio} onChange={e => setEditBio(e.target.value)} rows={3}
                className="w-full bg-[#1a191b] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary/50 resize-none"
              />
              <div className="flex gap-2 mt-2">
                <button onClick={() => { setBio(editBio); setIsEditing(false); }} className="px-5 py-2 bg-primary text-black rounded-lg font-bold text-sm">Save</button>
                <button onClick={() => setIsEditing(false)} className="px-5 py-2 border border-white/10 rounded-lg text-sm hover:bg-white/5">Cancel</button>
              </div>
            </div>
          ) : (
            <p className="text-on-surface-variant text-sm leading-relaxed mb-4">{bio}</p>
          )}

          {/* Stats */}
          <div className="flex items-center gap-6">
            {[
              { icon: Users, label: 'Followers', val: USER.followers },
              { icon: Users, label: 'Following', val: USER.following },
              { icon: Heart, label: 'Liked', val: LIKED_EVENTS.length.toString() },
              { icon: Bookmark, label: 'Saved', val: SAVED_EVENTS.length.toString() },
            ].map(({ icon: Icon, label, val }) => (
              <div key={label} className="text-center">
                <p className="text-lg font-black text-white">{val}</p>
                <p className="text-xs text-on-surface-variant">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-white/5 pb-px">
        {TABS.map(tab => (
          <button key={tab} onChange={() => setActiveTab(tab)} onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 font-semibold text-sm transition-all relative ${
              activeTab === tab ? 'text-white' : 'text-on-surface-variant hover:text-white'
            }`}
          >
            {tab}
            {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full -mb-px" />}
          </button>
        ))}
      </div>

      {/* Event List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {eventList.map(event => (
          <Link href={`/event/${event.id}`} key={event.id}
            className="group bg-[#1a191b] border border-white/5 rounded-xl overflow-hidden hover:border-primary/20 transition-all hover:-translate-y-0.5"
          >
            <div className="relative aspect-video overflow-hidden">
              <Image src={event.image} alt={event.imageAlt} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
              {event.isLive && <span className="absolute top-2 left-2 bg-[#FF4A4A] text-white text-[9px] font-bold px-2 py-0.5 rounded">LIVE</span>}
              {activeTab === 'Liked' && (
                <div className="absolute bottom-2 right-2 w-7 h-7 bg-black/60 backdrop-blur rounded-full flex items-center justify-center">
                  <Heart size={12} className="fill-[#FF4A4A] text-[#FF4A4A]" />
                </div>
              )}
              {activeTab === 'History' && (
                <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/60 backdrop-blur px-2 py-1 rounded-full">
                  <Eye size={10} className="text-white" />
                  <span className="text-[10px] text-white font-semibold">Watched</span>
                </div>
              )}
            </div>
            <div className="p-3">
              <p className="text-[9px] font-bold uppercase tracking-wider text-on-surface-variant mb-1">{event.category}</p>
              <p className="text-sm font-semibold text-white line-clamp-2 group-hover:text-primary transition-colors">{event.title}</p>
              <div className="flex items-center gap-1 mt-1.5">
                <Star size={10} className="text-on-surface-variant" />
                <span className="text-xs text-on-surface-variant">{event.time}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
