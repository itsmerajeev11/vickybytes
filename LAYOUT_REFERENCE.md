# Final Layout Structure - Quick Reference

## Complete Page Structure

```
HTML Root (dark mode enabled)
│
└── BODY
    ├── Class: "w-full bg-background text-on-surface pt-16 overflow-x-hidden antialiased"
    │
    ├── NAV (TopNavBar) [FIXED at top-0]
    │   ├── Class: "fixed top-0 left-0 w-full z-50 bg-[#0a0a0a] h-16"
    │   └── Inner Flex Container
    │       ├── Class: "w-full max-w-[1200px] mx-auto flex justify-between"
    │       ├── Logo & Links (left)
    │       └── Search, Button, Profile (right)
    │
    ├── MAIN (Page Content) [Offset by pt-16 on body]
    │   ├── Class: "w-full bg-background"
    │   │
    │   ├── SECTION: Hero [FULL WIDTH]
    │   │   ├── Class: "w-full"
    │   │   ├── Background Image (edge-to-edge)
    │   │   └── Content Container
    │   │       ├── Class: "max-w-[1200px] mx-auto px-6"
    │   │       └── [Hero Content - Title, Buttons]
    │   │
    │   ├── SECTION: Filters [FULL WIDTH]
    │   │   ├── Class: "w-full bg-background"
    │   │   └── Content Container
    │   │       ├── Class: "max-w-[1200px] mx-auto px-6 mt-12"
    │   │       └── [Category Pills + Sort Dropdown]
    │   │
    │   ├── SECTION: Event Grid [FULL WIDTH]
    │   │   ├── Class: "w-full bg-background"
    │   │   └── Content Container
    │   │       ├── Class: "max-w-[1200px] mx-auto px-6 mt-8 py-8"
    │   │       └── [4-Column Event Grid]
    │   │
    │   └── SECTION: Load More [FULL WIDTH]
    │       ├── Class: "w-full bg-background"
    │       └── Content Container
    │           ├── Class: "max-w-[1200px] mx-auto px-6 mt-16 pb-16"
    │           └── [Centered Load More Button]
    │
    ├── EventModal (Overlay - from ReactPortal)
    │
    └── FOOTER [FULL WIDTH]
        ├── Class: "w-full bg-[#0a0a0a]"
        └── Content Container
            ├── Class: "w-full max-w-[1200px] mx-auto px-6 py-12"
            ├── Logo & Copyright (left)
            └── Links (right)
```

## Key CSS Patterns

### Full-Width Section Pattern
```tsx
<section className="w-full bg-background">
  <div className="max-w-[1200px] mx-auto px-6">
    {/* Content constrained to 1200px max, centered */}
  </div>
</section>
```

### Responsive Padding
- Desktop: px-6 = 24px padding per side (1200px + 48px = 1248px total)
- Tablet: px-6 = 24px padding per side (adapts with screen width)
- Mobile: px-6 = 24px padding per side (full width minus padding)

### Viewport Width Behavior
| Screen Size | Container Width | Padding | Total |
|---|---|---|---|
| <640px | Full Width | 24px | Full - 48px |
| 640px-1200px | Screen Width | 24px | Screen - 48px |
| >1200px | 1200px | 24px | 1200px |

## Color Scheme
- **Background**: `#0e0e0f` (surface)
- **Surface Low**: `#131314` (navbar)
- **Surface**: `#0a0a0a` (footer)
- **Primary**: `#00E5A0` (bright green - buttons, active states)
- **Text**: `#ffffff` (on-surface)
- **Text Secondary**: `rgba(255,255,255,0.7)` (on-surface-variant)

## Spacing System
- **Navbar Height**: h-16 = 64px (offset with pt-16 on body)
- **Hero Bottom Padding**: pb-12 = 48px
- **Filter Padding**: pt-8 pb-6 = 32px + 24px
- **Grid Padding**: mt-8 py-8 = 32px + 32px
- **Load More Margin**: mt-16 pb-16 = 64px + 64px
- **Footer Padding**: py-12 = 48px

## Breakpoints (Tailwind)
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## Typography
- **Font Family**: Inter (all elements)
- **Logo**: text-xl font-bold
- **Hero Title**: text-5xl lg:text-6xl font-bold
- **Card Title**: text-[16px] font-bold
- **Labels**: text-[10px] font-bold uppercase
- **Body**: text-sm, text-lg

## Interactive Elements
- **Buttons**: 
  - Primary: bg-[#00E5A0] text-black font-semibold
  - Secondary: bg-white/[0.08] text-white
  - Hover: 200ms transition duration
  
- **Inputs**:
  - bg-white/[0.07] border-white/[0.15]
  - Focus: ring-[#00E5A0]

- **Cards**:
  - rounded-xl overflow-hidden
  - hover:scale-[1.02] transition
  - border border-white/10

## Mobile Responsive Changes
- Hero text: text-5xl on mobile, text-6xl on lg
- Filter pills: flex-wrap with gap-3
- Grid: 1 column (mobile) → 2 (tablet) → 3 (lg) → 4 (xl)
- Footer: flex-col on mobile, flex-row on md+

## Performance Notes
- Images use Next.js Image component with sizes prop
- Lazy loading implemented on cards
- No layout shift due to fixed dimensions
- CSS classes optimize for Tailwind purging
- Smooth scroll behavior on anchor links

