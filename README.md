# VickyBytes — Live Event Streaming Platform

A premium live event streaming platform UI built for the Frontend Engineering Assignment.

## 🚀 Live Demo

**🔗 [View Live on Render](https://vickybytes.onrender.com)**

---

## 📖 Project Overview

VickyBytes is a full-featured **Live Event Streaming Platform** that lets users discover, filter, and watch live and upcoming events across categories like Gaming, Music, Tech, Workshops, and Creative. Clicking any event card navigates to a dedicated streaming page with an embedded video player and a real-time simulated live chat.

---

## ✅ Features

### Part 1 — Event Listing Page
- **15 rich event cards** with image, title, category, schedule, like toggle, and share button
- **Functional search bar** — filters events in real-time by title/category
- **Category filters** — All Events, Music, Tech, Gaming, Workshops, Creative
- **Sort options** — Popular, Newest, Upcoming
- **Responsive grid layout** — 1 col mobile → 2 col tablet → 4 col desktop
- **Live badges** with animated pulse and viewer counts
- **Favorites system** — persisted across page sessions via localStorage

### Part 2 — Event Streaming Page
- **YouTube video embeds** — responsive 16:9 video player per event
- **Live chat panel** — real-time simulated messages with auto-scroll
  - Bot messages appear every 2.5s for live events
  - Chat input with send button and emoji indicator
  - Color-coded usernames, timestamp on hover
- **Streamer info section** — avatar, name, follow button
- **Event description** with tags
- **Related events** sidebar with thumbnail previews
- **Like & Share** — like toggles with animated count, share copies link to clipboard
- **Live viewer count** that fluctuates in real-time

### Bonus / Extras
- Smooth hover animations and card lift effects on the listing page
- Immersive hero section with full-bleed concert background
- Transparent navbar overlaying the hero for a cinematic effect
- SEO metadata (title, description, keywords, viewport) via Next.js Metadata API
- Mobile-first responsive design throughout

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2.2 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Icons | Lucide React |
| Images | Next.js `<Image>` with Unsplash + Google |
| Avatars | DiceBear Avataaars API |
| Video | YouTube IFrame embed |
| State | React useState / useEffect / useRef |
| Storage | localStorage (favorites) |
| Routing | Next.js App Router dynamic routes |

---

## 📁 Folder Structure

```
vickybytes/
├── app/
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Home / Listing page
│   ├── globals.css          # Global styles + Tailwind v4 theme
│   └── event/
│       └── [id]/
│           └── page.tsx     # Dynamic event streaming page
├── components/
│   ├── layout/
│   │   ├── TopNavBar.tsx    # Fixed navigation bar
│   │   ├── HeroSection.tsx  # Full-bleed hero with CTA
│   │   └── Footer.tsx       # Site footer
│   ├── events/
│   │   ├── EventCard.tsx    # Individual event card
│   │   ├── EventGrid.tsx    # Responsive grid of cards
│   │   └── FilterSection.tsx # Category filters + sort
│   └── common/
│       └── EventModal.tsx   # Quick-view modal (legacy)
├── lib/
│   ├── mockData.ts          # 15 enriched events with descriptions
│   ├── utils.ts             # Filter/sort/search helpers
│   └── useFavorites.ts      # localStorage favorites hook
└── types/
    └── index.ts             # TypeScript interfaces
```

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js 18+
- npm or yarn

### Install & Run

```bash
# Clone the repository
git clone <your-repo-url>
cd vickybytes

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## 🌐 Deployment

**Currently deployed on Render**: https://vickybytes.onrender.com

### Deploy on Render

1. Push your repository to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com)
3. Create a new **Web Service**
4. Connect your GitHub repository
5. Configure:
   - **Build Command**: `npm install; npm run build`
   - **Start Command**: `npm start`
6. Click **Deploy**

### Deploy on Vercel (Alternative)

```bash
npm install -g vercel
vercel
```

Or connect your GitHub repository to Vercel for automatic CI/CD deployments.

---

## 📝 Notes

- No backend or external APIs used — all data is mock/simulated
- Chat messages are locally simulated (no WebSocket/Firebase)
- YouTube embeds use public video IDs for demonstration purposes
