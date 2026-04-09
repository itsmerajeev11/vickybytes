'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Image as ImageIcon, Video, Globe, Lock, Users, Tag, Clock, ChevronDown } from 'lucide-react';

const CATEGORIES = ['Gaming & Esports', 'Music Production', 'Technology', 'Workshops', 'Creative', 'Live Sessions', 'Music', 'Tech'];

export default function CreateEventPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    date: '',
    time: '',
    duration: '1',
    visibility: 'public',
    thumbnail: null as File | null,
    thumbnailPreview: '',
    tags: '',
    streamKey: 'vb-' + Math.random().toString(36).slice(2, 10).toUpperCase(),
  });
  const [submitted, setSubmitted] = useState(false);

  const update = (key: string, val: string) => setForm(f => ({ ...f, [key]: val }));

  const STEPS = ['Event Details', 'Stream Setup', 'Publishing'];

  if (submitted) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🎉</span>
          </div>
          <h2 className="text-3xl font-black text-white mb-3">Event Created!</h2>
          <p className="text-on-surface-variant mb-8">Your event <strong className="text-white">"{form.title || 'Untitled'}"</strong> has been scheduled and is ready to go live.</p>
          <div className="bg-[#1a191b] border border-white/5 rounded-xl p-4 mb-6 text-left">
            <p className="text-xs text-on-surface-variant mb-1">Stream Key</p>
            <p className="font-mono text-primary text-sm font-bold">{form.streamKey}</p>
          </div>
          <div className="flex gap-3 justify-center">
            <Link href="/" className="px-6 py-3 bg-surface-container-high text-white rounded-xl font-semibold text-sm hover:bg-white/10 transition-colors">Back to Home</Link>
            <button onClick={() => { setSubmitted(false); setStep(1); setForm(f => ({ ...f, title: '', description: '' })); }}
              className="px-6 py-3 bg-primary text-black rounded-xl font-bold text-sm hover:opacity-90 transition-opacity"
            >Create Another</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-16 px-4">
      {/* Header with Steps */}
      <div className="max-w-2xl mx-auto pt-8 mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-white">Create Event</h1>
          <p className="text-on-surface-variant text-sm mt-1">Go live and share your talent</p>
        </div>
        <div className="flex items-center gap-2">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all ${step === i + 1 ? 'bg-primary text-black' : step > i + 1 ? 'bg-primary/20 text-primary' : 'bg-surface-container-high text-on-surface-variant'}`}>
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-black ${step === i + 1 ? 'bg-black/20' : ''}`}>{i + 1}</span>
                <span className="truncate">{s}</span>
              </div>
              {i < STEPS.length - 1 && <div className="w-4 h-px bg-white/10" />}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Step 1 */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-black mb-1">Event Details</h1>
              <p className="text-on-surface-variant">Tell us about your event</p>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Event Thumbnail</label>
              <div className="relative h-44 bg-[#1a191b] border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center hover:border-primary/40 transition-colors cursor-pointer group overflow-hidden">
                {form.thumbnailPreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={form.thumbnailPreview} alt="preview" className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <>
                    <ImageIcon size={28} className="text-on-surface-variant mb-2 group-hover:text-primary transition-colors" />
                    <p className="text-sm text-on-surface-variant">Click to upload thumbnail</p>
                    <p className="text-xs text-on-surface-variant mt-1">PNG, JPG up to 10MB • Recommended: 1280×720</p>
                  </>
                )}
                <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={e => {
                    const f = e.target.files?.[0];
                    if (f) update('thumbnailPreview', URL.createObjectURL(f));
                  }}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Event Title <span className="text-[#FF4A4A]">*</span></label>
              <input value={form.title} onChange={e => update('title', e.target.value)}
                placeholder="e.g. Grand Tournament Finals 2024"
                className="w-full bg-[#1a191b] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-on-surface-variant focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Description</label>
              <textarea value={form.description} onChange={e => update('description', e.target.value)}
                placeholder="Describe your event, what viewers can expect..."
                rows={4}
                className="w-full bg-[#1a191b] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-on-surface-variant focus:outline-none focus:border-primary/50 transition-colors resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Category <span className="text-[#FF4A4A]">*</span></label>
              <div className="relative">
                <select value={form.category} onChange={e => update('category', e.target.value)}
                  className="w-full appearance-none bg-[#1a191b] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors cursor-pointer"
                >
                  <option value="">Select a category</option>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Date</label>
                <input type="date" value={form.date} onChange={e => update('date', e.target.value)}
                  className="w-full bg-[#1a191b] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Start Time</label>
                <input type="time" value={form.time} onChange={e => update('time', e.target.value)}
                  className="w-full bg-[#1a191b] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 flex items-center gap-2"><Tag size={14} /> Tags</label>
              <input value={form.tags} onChange={e => update('tags', e.target.value)}
                placeholder="gaming, esports, tournament (comma-separated)"
                className="w-full bg-[#1a191b] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-on-surface-variant focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
            <button onClick={() => setStep(2)}
              className="w-full bg-primary text-black font-bold py-3.5 rounded-xl hover:opacity-90 transition-opacity"
            >Continue to Stream Setup →</button>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-black mb-1">Stream Setup</h1>
              <p className="text-on-surface-variant">Configure your stream settings</p>
            </div>
            <div className="bg-[#1a191b] border border-white/5 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Video size={16} className="text-primary" />
                <p className="font-bold text-white">Stream Key</p>
              </div>
              <div className="bg-black/30 rounded-lg px-4 py-3 font-mono text-primary font-bold flex items-center justify-between">
                <span>{form.streamKey}</span>
                <button onClick={() => navigator.clipboard.writeText(form.streamKey).catch(() => {})}
                  className="text-xs text-on-surface-variant hover:text-white transition-colors font-sans font-semibold"
                >Copy</button>
              </div>
              <p className="text-xs text-on-surface-variant mt-2">Use this key in OBS or Streamlabs to connect your stream.</p>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 flex items-center gap-2"><Clock size={14} /> Expected Duration</label>
              <div className="grid grid-cols-4 gap-2">
                {['1', '2', '3', '4+'].map(d => (
                  <button key={d} onClick={() => update('duration', d)}
                    className={`py-3 rounded-xl font-bold text-sm transition-all ${form.duration === d ? 'bg-primary text-black' : 'bg-[#1a191b] border border-white/10 text-on-surface-variant hover:text-white'}`}
                  >{d} {d === '4+' ? 'hrs+' : d === '1' ? 'hr' : 'hrs'}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Visibility</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { val: 'public', icon: Globe, label: 'Public', desc: 'Anyone can watch' },
                  { val: 'followers', icon: Users, label: 'Followers', desc: 'Followers only' },
                  { val: 'private', icon: Lock, label: 'Private', desc: 'Invite only' },
                ].map(({ val, icon: Icon, label, desc }) => (
                  <button key={val} onClick={() => update('visibility', val)}
                    className={`flex flex-col items-center p-4 rounded-xl border transition-all text-center ${form.visibility === val ? 'border-primary bg-primary/5 text-white' : 'border-white/10 bg-[#1a191b] text-on-surface-variant hover:text-white'}`}
                  >
                    <Icon size={20} className={form.visibility === val ? 'text-primary mb-2' : 'mb-2'} />
                    <p className="text-sm font-bold">{label}</p>
                    <p className="text-xs mt-0.5 opacity-70">{desc}</p>
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="flex-1 py-3.5 rounded-xl border border-white/10 text-white font-semibold hover:bg-white/5 transition-colors">← Back</button>
              <button onClick={() => setStep(3)} className="flex-1 bg-primary text-black font-bold py-3.5 rounded-xl hover:opacity-90">Review & Publish →</button>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-black mb-1">Review & Publish</h1>
              <p className="text-on-surface-variant">Review your event before going live</p>
            </div>
            <div className="bg-[#1a191b] border border-white/5 rounded-xl divide-y divide-white/5">
              {[
                { label: 'Title', val: form.title || '—' },
                { label: 'Category', val: form.category || '—' },
                { label: 'Date & Time', val: form.date && form.time ? `${form.date} at ${form.time}` : '—' },
                { label: 'Duration', val: form.duration + (form.duration === '1' ? ' hour' : ' hours') },
                { label: 'Visibility', val: form.visibility.charAt(0).toUpperCase() + form.visibility.slice(1) },
                { label: 'Tags', val: form.tags || 'None' },
              ].map(({ label, val }) => (
                <div key={label} className="flex justify-between items-center px-5 py-4">
                  <span className="text-sm text-on-surface-variant font-medium">{label}</span>
                  <span className="text-sm text-white font-semibold text-right max-w-[60%]">{val}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="flex-1 py-3.5 rounded-xl border border-white/10 text-white font-semibold hover:bg-white/5 transition-colors">← Back</button>
              <button onClick={() => setSubmitted(true)} className="flex-1 bg-primary text-black font-bold py-3.5 rounded-xl hover:opacity-90 transition-opacity">🎥 Publish Event</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
