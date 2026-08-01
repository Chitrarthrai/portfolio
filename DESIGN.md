---
name: Chitrarth Rai Portfolio - Fluid Obsidian Kinetic Glassmorphism
version: "2.0"
author: "Chitrarth Rai"
role: "Software Engineer @ Neophyte AI | React Native & MERN Specialist"
colors:
  background: '#000319'
  background-dim: '#000212'
  surface: '#0A0D24'
  surface-card: 'linear-gradient(135deg, rgba(16, 19, 46, 0.8) 0%, rgba(6, 9, 31, 0.9) 100%)'
  surface-glass: 'rgba(16, 19, 46, 0.75)'
  primary: '#CBACF9'
  primary-glow: 'rgba(203, 172, 249, 0.45)'
  secondary: '#60A5FA'
  secondary-glow: 'rgba(96, 165, 250, 0.4)'
  accent-emerald: '#34D399'
  accent-amber: '#FBBF24'
  accent-crimson: '#E11D48'
  on-background: '#FFFFFF'
  on-surface-variant: '#C1C2D3'
  on-muted: '#BEC1DD'
  outline: 'rgba(255, 255, 255, 0.08)'
  outline-hover: 'rgba(203, 172, 249, 0.3)'

typography:
  display-hero:
    fontFamily: Manrope
    fontSize: 72px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: '-0.03em'
  display-hero-mobile:
    fontFamily: Manrope
    fontSize: 36px
    fontWeight: '800'
    lineHeight: '1.15'
    letterSpacing: '-0.02em'
  headline-section:
    fontFamily: Manrope
    fontSize: 44px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: '-0.02em'
  body-lead:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '400'
    lineHeight: '1.6'
  body-base:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  technical-code:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: '1.5'
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '700'
    letterSpacing: '0.1em'

elevation-depth:
  level-0: 'Flat background #000319'
  level-1: 'Backdrop blur 16px, 1px border rgba(255,255,255,0.08)'
  level-2: 'Backdrop blur 24px, 1px border rgba(203,172,249,0.2), box-shadow 0 20px 40px -15px rgba(0,0,0,0.8)'

roundedness:
  pill: '9999px'
  card-lg: '24px'
  card-md: '16px'
  card-sm: '12px'

spacing-fluidity:
  layout: '100% fluid width, zero hardcoded max-width pixel bounds'
  padding-horizontal: 'px-4 sm:px-6 md:px-10 lg:px-16 2xl:px-24'
  gutter: 'gap-4 sm:gap-6 lg:gap-8'

animations:
  spring-hover: 'scale(1.04) with smooth 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
  shimmer-button: 'background-position sweep 2s linear infinite'
  stagger-entrance: '0.04s delay per child item'
---

# Complete Architectural & Design Specification — Chitrarth Rai Portfolio

## 1. Brand Identity & Product Vision
This design system defines the digital brand identity for **Chitrarth Rai**, a Software Engineer at Neophyte AI specializing in Full-Stack Web (MERN, Next.js) and High-Performance Mobile Application Development (React Native, Kotlin Native Modules, C++ ONNX Runtime, SSL Pinning, VAPT Hardening).

The aesthetic is **Obsidian Kinetic Glassmorphism**: an engineered luxury interface with deep obsidian space backgrounds (`#000319`), full-viewport interactive canvas physics, tactile glass cards, and crisp monospaced engineering metadata.

---

## 2. Interactive Background Canvas Architecture (`HoverSquareGrid.tsx`)
- **Full Viewport Width (`100vw x 100vh`)**: Positioned `fixed inset-0 pointer-events-none z-0` to eliminate all side gutters.
- **Dynamic Organic Square Matrix**: Tile dimensions dynamically calculated between `44px` and `72px` with `10px` rounded corners.
- **Ambient Hover Glow**: Mouse movement calculates distance `dist` to cursor `(mouseX, mouseY)`. Tiles within radius `R = 200px` smoothly expand (`scale(1.08)`) and glow with electric violet (`#CBACF9`) and cyan (`#60A5FA`).

---

## 3. Structural Component Systems

### Component A: Hero Section (`Hero.tsx`)
- **Interactive Background**: `HoverSquareGrid` canvas + ambient spotlights (`white`, `purple`, `blue`).
- **Glowing Pill Badge**: `REACT NATIVE & MERN FULL-STACK SPECIALIST` in uppercase monospaced text with a subtle `rgba(203, 172, 249, 0.1)` fill and 1px border.
- **Fluid Headline**: `TextGenerateEffect` animating `"Building Scalable, Data-Driven Applications"` in `Manrope` 800-weight typography (`text-3xl` mobile to `text-7xl` desktop).
- **Responsive Dual Action CTAs**:
  - Primary: `Explore App Showcase` with shimmering gradient and arrow icon.
  - Secondary: `Download Resume` (links to GitHub PDF) in `#161a31` dark glass.

### Component B: Engineering Metrics Showcase (`MetricsShowcase.tsx`)
- 4 grid cards presenting quantified engineering impact:
  1. `40+` Microservices & Software Projects
  2. `40%` Camera Frame Processing Latency Reduction (ONNX & Kotlin)
  3. `60%` Analytics Query Latency Optimization (MongoDB & Azure)
  4. `<100ms` Supabase WebSocket Real-Time Latency
- Hover effect: Cards shift `-5px` vertically with a glowing radial spotlight blur.

### Component C: Mobile Application Showcase (`AppShowcase.tsx`)
- **Interactive Smartphone Device Mockup**:
  - Realistic phone frame previewing flagship apps (*Neo Disha*, *FinanceTask*, *CheckIt*).
  - Simulates camera notch, live performance stats, and active app feature tabs.
- **Native Code Drawer**:
  - Syntax-highlighted drawer presenting verified React Native + Kotlin Native Module C++ code snippets.

### Component D: About & Technical Knowledge (`Grid.tsx` / `BentoGrid.tsx`)
- Modular bento grid layout featuring an interactive 3D WebGL Globe, dynamic tech stack pills, and email copy confetti trigger.

### Component E: Technical Skills Pills (`Skills.tsx`)
- 3 column categories: *Languages & Frameworks*, *Databases & Infrastructure*, *Tools & Practices*.
- Animated entrance pills staggered with Framer Motion (`staggerChildren: 0.04`).

### Component F: Work Experience Timeline (`Experience.tsx`)
- Vertical timeline for Neophyte AI experience featuring expandable sub-project cards (*Reliance Digital Shelf Analytics*, *Reliance HR Tech Platform*, *Camera Optimization*).

### Component G: Featured Project Cards (`RecentProjects.tsx`)
- Category filter buttons (*All*, *Personal*, *Reliance*, *Open Source*).
- 3D tilt cards with GitHub repository links and technology icons.

### Component H: Education (`Education.tsx`)
- IIIT Bhubaneswar Electronics & Telecommunication academic card grid.

### Component I: Footer & Direct Contact (`Footer.tsx`)
- Direct contact form with mailto fallback trigger, interactive Lottie confetti email copy button, and social media links (GitHub, LinkedIn, Email).

---

## 4. Innovation Directives for StitchMCP
1. **Adaptive Device Previews**: Expand mobile mockups to include rotatable 3D device frames and tablet viewport previews.
2. **Real-Time Data Viz**: Integrate interactive live canvas charts for backend query latency benchmarks.
3. **Cybernetic Light Accents**: Apply fine 1px light-leak edge strokes along card hover boundaries.
