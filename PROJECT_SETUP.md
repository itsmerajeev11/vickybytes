# VickyBytes - Premium Live Streaming Platform

A modern, fully-functional Next.js + React + Tailwind CSS streaming platform with a sleek dark design. This is a complete end-to-end implementation with filtering, searching, favorites system, and responsive design.

## 🎯 Features

### Core Features
- ✅ **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- ✅ **Event Filtering** - Filter events by category (Music, Tech, Gaming, Workshops, Creative)
- ✅ **Search Functionality** - Real-time search across all events
- ✅ **Sorting Options** - Sort by Popular, Newest, or Upcoming
- ✅ **Live Events Badge** - Visual indicators for live events with viewer counts
- ✅ **Event Modal** - Detailed event view with action buttons
- ✅ **Pagination** - Load more events on demand
- ✅ **Dark Theme** - Beautiful dark color scheme with custom Material Design 3 colors

### Unique Features 🌟
- ✅ **Favorites System** - Save favorite events with persistent localStorage
- ✅ **Interactive Event Cards** - Hover effects with image zoom and transitions
- ✅ **Glass Effect UI** - Modern glassmorphism design elements
- ✅ **Material Icons** - Professional icon library integration
- ✅ **Smooth Animations** - Polished transitions and animations throughout

## 🛠️ Tech Stack

- **Framework**: Next.js 16.2.2 with App Router
- **React**: 19.x
- **Styling**: Tailwind CSS 4.x
- **Language**: TypeScript
- **Image Optimization**: Next.js Image component
- **Icons**: Google Material Symbols
- **Fonts**: Inter from Google Fonts
- **State Management**: React Hooks (useState, useEffect, useMemo)
- **Storage**: LocalStorage API

## 📁 Project Structure

```
vickybytes/
├── app/
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Main home page
│   ├── globals.css          # Global styles and CSS utilities
│   └── favicon.ico          # App icon
├── components/
│   ├── layout/
│   │   ├── TopNavBar.tsx    # Navigation bar with search
│   │   ├── HeroSection.tsx  # Hero banner
│   │   └── Footer.tsx       # Footer section
│   ├── events/
│   │   ├── EventCard.tsx    # Individual event card
│   │   ├── FilterSection.tsx # Category filters and sorting
│   │   └── EventGrid.tsx    # Grid layout for events
│   └── common/
│       └── EventModal.tsx   # Event details modal
├── lib/
│   ├── mockData.ts          # Sample event data
│   ├── utils.ts             # Utility functions
│   └── useFavorites.ts      # Favorites hook with localStorage
├── types/
│   └── index.ts             # TypeScript type definitions
├── tailwind.config.ts       # Tailwind configuration
├── next.config.ts           # Next.js configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
npm start
```

## 📋 Features Explained

### 1. **Event Filtering**
- Click category buttons to filter events
- Categories include: All Events, Music, Tech, Gaming, Workshops, Creative
- Filters work seamlessly with search and sorting

### 2. **Search**
- Real-time search across event titles and categories
- Visible on desktop; part of mobile menu
- Works with all filters and sort options

### 3. **Sorting**
- **Popular**: Events sorted by viewer count (descending)
- **Newest**: Recently added events first
- **Upcoming**: Live events prioritized

### 4. **Favorites System** (Unique Feature)
- Click heart icon on any event card to favorite
- Favorites are saved to browser's localStorage
- Persists across sessions
- Visual feedback with color change

### 5. **Live Events**
- Real-time badge showing "LIVE" status
- Viewer count displayed for live events
- Pulsing animation on live indicator

### 6. **Event Details Modal**
- Click "View Event" to open detailed modal
- Displays full event information
- Action buttons: "Join Now" (live) or "Notify Me" (upcoming)
- Share functionality

### 7. **Responsive Design**
- Mobile-first approach
- Grid adjusts: 1 column (mobile) → 2 (tablet) → 3-5 (desktop)
- Navigation collapses on mobile
- Touch-friendly button sizing

## 🎨 Design System

### Colors (Material Design 3 - Dark)
- **Primary**: #69f6b8 (Teal Green)
- **Primary Container**: #06b77f
- **Error**: #ff716c (Red)
- **Tertiary**: #77e6ff (Cyan)
- **Surface**: #0e0e0f (Almost Black)
- **Surface Container**: #1a191b (Dark Gray)

### Typography
- **Font Family**: Inter (all contexts)
- **Font Weights**: 400, 500, 600, 700, 800

### Border Radius
- **Default**: 2px
- **lg**: 4px
- **xl**: 8px
- **full**: 12px

## 🔧 Customization

### Adding New Events
Edit `lib/mockData.ts`:

```typescript
{
  id: '16',
  title: 'Your Event Title',
  category: 'Category Name',
  image: 'https://...',
  imageAlt: 'Description',
  time: 'Time Info',
  isLive: false,
  viewers: 0,
}
```

### Adding New Categories
1. Update `types/index.ts` EventCategory type
2. Add to `CATEGORIES` array in `lib/mockData.ts`
3. FilterSection will auto-update

### Customizing Colors
Edit `tailwind.config.ts` colors section:

```typescript
colors: {
  'primary': '#your-color',
  // ... other colors
}
```

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px
- **Large Desktop**: > 1280px

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Color contrast compliance
- Focus states on buttons and inputs

## 🚀 Performance Optimizations

- Image optimization with Next.js Image component
- CSS-in-JS via Tailwind (no runtime overhead)
- Memoized filtering/sorting logic
- Lazy loading of event images
- Efficient state management

## 📦 Key Libraries

```json
{
  "next": "16.2.2",
  "react": "19.x",
  "react-dom": "19.x",
  "tailwindcss": "4.x"
}
```

## 🐛 Troubleshooting

### Images not loading
- Ensure domains are configured in `next.config.ts`
- Check image URLs are valid

### Favorites not persisting
- Check browser localStorage is enabled
- Clear browser cache if needed

### Build errors
- Run `npm install` to ensure all dependencies
- Clear `.next` directory: `rm -rf .next`
- Rebuild: `npm run build`

## 📞 Support

For issues or feature requests, please check the code comments or create an issue in the repository.

## 📄 License

This project is open source and available under the MIT License.

---

**Created with ❤️ using Next.js, React, and Tailwind CSS**

