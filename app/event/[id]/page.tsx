'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Share2, ArrowLeft, Users, ThumbsUp, Send, Smile } from 'lucide-react';
import { EVENTS } from '@/lib/mockData';
import { Event } from '@/types';

// ─── Simulated chat messages ────────────────────────────────────────────────
const INITIAL_MESSAGES = [
  { id: 1, user: 'AlexR', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AlexR', text: 'Just tuned in! This is amazing 🔥', time: '9:41 PM', color: '#00E5A0' },
  { id: 2, user: 'JamieK', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JamieK', text: 'The quality of this stream is insane', time: '9:42 PM', color: '#ac8aff' },
  { id: 3, user: 'SkyWatcher', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sky', text: 'LFG!! 🎮', time: '9:42 PM', color: '#77e6ff' },
  { id: 4, user: 'ProViewer', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ProV', text: 'Been waiting for this for weeks!', time: '9:43 PM', color: '#ff9f43' },
  { id: 5, user: 'NightOwl', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Night', text: 'Chat is going crazy 😂', time: '9:43 PM', color: '#ee5a24' },
  { id: 6, user: 'TechFan99', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tech99', text: 'This content is top tier', time: '9:44 PM', color: '#00E5A0' },
  { id: 7, user: 'CoolDude', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Cool', text: 'W stream W chat', time: '9:44 PM', color: '#ac8aff' },
  { id: 8, user: 'Viewer42', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=V42', text: 'Absolutely killing it!!!', time: '9:45 PM', color: '#77e6ff' },
];

const BOT_MESSAGES = [
  'This is insane! 🔥',
  'POGGERS',
  'W content as always',
  'Lets gooo!! 🚀',
  '10/10 stream',
  'Chat going crazy rn',
  '❤️❤️❤️',
  'New PB incoming??',
  'This is why I subscribe',
  'LFG!!!',
  'Incredible performance',
  'GG WP',
  '🎉🎉🎉',
  'First time watching, instant follow',
  'The goat is here',
];

const BOT_USERS = [
  { user: 'RandomChatter', color: '#ff9f43' },
  { user: 'StreamFan_89', color: '#00E5A0' },
  { user: 'HypeTrainGo', color: '#ac8aff' },
  { user: 'LurkerMode', color: '#77e6ff' },
  { user: 'ClipItNow', color: '#ee5a24' },
];

export default function EventPage() {
  const params = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<Event | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputMessage, setInputMessage] = useState('');
  const [viewerCount, setViewerCount] = useState(0);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const found = EVENTS.find(e => e.id === params.id);
    if (found) {
      setEvent(found);
      setLikeCount(found.likes ?? 0);
      setViewerCount(found.viewers ?? Math.floor(Math.random() * 3000) + 500);
    }
  }, [params.id]);

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Simulate live chat messages for live events
  useEffect(() => {
    if (!event?.isLive) return;
    const interval = setInterval(() => {
      const bot = BOT_USERS[Math.floor(Math.random() * BOT_USERS.length)];
      const text = BOT_MESSAGES[Math.floor(Math.random() * BOT_MESSAGES.length)];
      const now = new Date();
      const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      const id = Date.now() + Math.random();
      setMessages(msgs => [...msgs.slice(-50), {
        id,
        user: bot.user,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${bot.user}`,
        text,
        time,
        color: bot.color,
      }]);
      // Slightly fluctuate viewer count
      setViewerCount(v => Math.max(100, v + Math.floor(Math.random() * 20) - 8));
    }, 2500);
    return () => clearInterval(interval);
  }, [event?.isLive]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const id = Date.now() + Math.random();
    setMessages(msgs => [...msgs, {
      id,
      user: 'You',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=YouUser',
      text: inputMessage.trim(),
      time,
      color: '#00E5A0',
    }]);
    setInputMessage('');
  };

  const handleLike = () => {
    setIsLiked(prev => !prev);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).catch(() => {});
    alert('Link copied to clipboard!');
  };

  if (!event) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-on-surface-variant">Loading event...</p>
        </div>
      </div>
    );
  }

  const relatedEvents = EVENTS.filter(e => e.id !== event.id && e.category === event.category).slice(0, 4);

  return (
    <div className="min-h-screen bg-background text-on-surface">
      {/* Top Nav */}
      <nav className="fixed top-0 w-full z-50 bg-[#131314]/95 backdrop-blur-sm flex items-center h-16 border-b border-white/5">
        <div className="flex justify-between items-center w-full px-16">
          <div className="flex items-center gap-6">
            <button onClick={() => router.back()} className="flex items-center gap-2 text-on-surface-variant hover:text-white transition-colors">
              <ArrowLeft size={18} />
              <span className="text-sm font-medium hidden sm:inline">Back</span>
            </button>
            <Link href="/" className="text-xl font-bold tracking-tighter text-white">VickyBytes</Link>
          </div>
          <div className="flex items-center gap-4">
            {event.isLive && (
              <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg">
                <Users size={14} className="text-on-surface-variant" />
                <span className="text-sm font-semibold text-white">{viewerCount.toLocaleString()}</span>
                <span className="text-xs text-on-surface-variant">watching</span>
              </div>
            )}
            <button onClick={handleShare} className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-on-surface-variant hover:text-white px-3 py-1.5 rounded-lg transition-all text-sm">
              <Share2 size={14} /> Share
            </button>
            <button onClick={handleLike} className={`flex items-center gap-2 px-4 py-1.5 rounded-lg font-semibold text-sm transition-all ${isLiked ? 'bg-primary text-black' : 'bg-white/5 hover:bg-white/10 text-on-surface-variant hover:text-white'}`}>
              <Heart size={14} fill={isLiked ? 'currentColor' : 'none'} />
              {likeCount.toLocaleString()}
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-16">
        {/* ─── Main Content: Video + Chat ───────────────────────────── */}
        <div className="flex flex-col lg:flex-row h-auto lg:h-[calc(100vh-64px)]">

          {/* ─── Left: Video + Info ───────────────────────────────── */}
          <div className="flex-1 flex flex-col overflow-y-auto">
            {/* Video Player */}
            <div className="relative w-full bg-black" style={{ aspectRatio: '16/9' }}>
              {event.videoId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${event.videoId}?autoplay=0&rel=0&modestbranding=1`}
                  title={event.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              ) : (
                <div className="w-full h-full relative">
                  <Image src={event.image} alt={event.imageAlt} fill className="object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur flex items-center justify-center">
                      <div className="w-0 h-0 border-l-[28px] border-l-white border-y-[18px] border-y-transparent ml-2" />
                    </div>
                  </div>
                </div>
              )}
              {/* Live badge overlay */}
              {event.isLive && (
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="bg-[#FF4A4A] text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                    LIVE
                  </span>
                  <span className="bg-black/70 backdrop-blur text-white text-[10px] font-semibold px-2 py-1 rounded">
                    {viewerCount.toLocaleString()} VIEWERS
                  </span>
                </div>
              )}
            </div>

            {/* Event Info */}
            <div className="px-6 py-5 border-b border-white/5">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2 block">{event.category}</span>
                  <h1 className="text-2xl font-bold text-white leading-tight mb-3">{event.title}</h1>
                  <div className="flex flex-wrap items-center gap-3">
                    {event.tags?.map(tag => (
                      <span key={tag} className="bg-surface-container-high text-on-surface-variant text-xs font-medium px-3 py-1 rounded-full">#{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <button onClick={handleLike} className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all active:scale-95 ${isLiked ? 'bg-primary text-black' : 'bg-surface-container-high hover:bg-surface-container-highest text-white'}`}>
                    <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
                    {isLiked ? 'Liked' : 'Like'}
                  </button>
                  <button onClick={handleShare} className="flex items-center gap-2 px-5 py-2.5 bg-surface-container-high hover:bg-surface-container-highest text-white rounded-lg font-semibold text-sm transition-all active:scale-95">
                    <Share2 size={16} /> Share
                  </button>
                </div>
              </div>

              {/* Streamer Info */}
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/5">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container-high shrink-0">
                  {event.streamerAvatar && (
                    <Image src={event.streamerAvatar} alt={event.streamer ?? ''} width={40} height={40} className="w-full h-full" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{event.streamer}</p>
                  <p className="text-xs text-on-surface-variant">{event.time}</p>
                </div>
                <button className="ml-auto bg-primary text-black text-sm font-bold px-5 py-2 rounded-lg hover:opacity-90 transition-opacity active:scale-95">
                  Follow
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="px-6 py-5 border-b border-white/5">
              <h2 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                <ThumbsUp size={16} className="text-primary" />
                About this event
              </h2>
              <p className="text-on-surface-variant leading-relaxed text-sm">{event.description}</p>
            </div>

            {/* Related Events */}
            {relatedEvents.length > 0 && (
              <div className="px-6 py-5">
                <h2 className="text-base font-bold text-white mb-4">More in {event.category}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {relatedEvents.map(rel => (
                    <Link key={rel.id} href={`/event/${rel.id}`} className="flex gap-3 bg-surface-container-low hover:bg-surface-container rounded-xl p-3 transition-colors group">
                      <div className="relative w-28 h-16 rounded-lg overflow-hidden shrink-0">
                        <Image src={rel.image} alt={rel.imageAlt} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                        {rel.isLive && <span className="absolute top-1 left-1 bg-[#FF4A4A] text-white text-[8px] font-bold px-1.5 py-0.5 rounded">LIVE</span>}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] text-on-surface-variant uppercase tracking-wider mb-1">{rel.category}</p>
                        <p className="text-sm font-semibold text-white leading-snug line-clamp-2">{rel.title}</p>
                        <p className="text-xs text-on-surface-variant mt-1">{rel.time}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ─── Right: Live Chat ─────────────────────────────────── */}
          <div className="w-full lg:w-[340px] xl:w-[380px] flex flex-col border-l border-white/5 bg-surface-container-low h-[500px] lg:h-full shrink-0">
            {/* Chat Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 shrink-0">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  {event.isLive && <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />}
                  <span className="text-sm font-bold text-white">{event.isLive ? 'Live Chat' : 'Chat Replay'}</span>
                </div>
              </div>
              <span className="text-xs text-on-surface-variant">{messages.length} messages</span>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scroll-smooth">
              {messages.map(msg => (
                <div key={msg.id} className="flex gap-2.5 group">
                  <div className="w-6 h-6 rounded-full overflow-hidden shrink-0 mt-0.5">
                    <Image src={msg.avatar} alt={msg.user} width={24} height={24} className="w-full h-full" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 mb-0.5">
                      <span className="text-xs font-bold" style={{ color: msg.color }}>{msg.user}</span>
                      <span className="text-[10px] text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity">{msg.time}</span>
                    </div>
                    <p className="text-sm text-on-surface leading-snug break-words">{msg.text}</p>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input */}
            <div className="px-4 py-3 border-t border-white/5 shrink-0">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <div className="flex-1 flex items-center gap-2 bg-surface-container-high rounded-xl px-3 py-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={e => setInputMessage(e.target.value)}
                    placeholder="Send a message..."
                    maxLength={200}
                    className="flex-1 bg-transparent text-sm text-white placeholder:text-on-surface-variant outline-none"
                  />
                  <button type="button" className="text-on-surface-variant hover:text-white transition-colors shrink-0">
                    <Smile size={16} />
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={!inputMessage.trim()}
                  className="bg-primary text-black p-2.5 rounded-xl hover:opacity-90 transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                >
                  <Send size={16} />
                </button>
              </form>
              <p className="text-[10px] text-on-surface-variant mt-2 text-center">Be kind and respectful in chat ✌️</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
