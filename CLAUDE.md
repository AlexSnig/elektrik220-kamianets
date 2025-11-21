# CLAUDE.md - AI Assistant Guide for Elektrik220 Project

> **Last Updated:** November 16, 2025
> **Project:** Електрик 220В - Electrician Service Website (Kamenets-Podolskiy, Ukraine)
> **Tech Stack:** React 18 + TypeScript + Vite + Tailwind CSS + Framer Motion

This document provides AI assistants with comprehensive context about the codebase, conventions, and workflows to maintain consistency and quality.

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture & Structure](#architecture--structure)
3. [Key Conventions](#key-conventions)
4. [Data Flow & State Management](#data-flow--state-management)
5. [Component Patterns](#component-patterns)
6. [Performance Optimizations](#performance-optimizations)
7. [DevOps & Automation](#devops--automation)
8. [Common Tasks](#common-tasks)
9. [Critical Rules](#critical-rules)
10. [Recent Changes](#recent-changes)

---

## 🎯 Project Overview

### Business Context

- **Client:** Electrician service in Kamenets-Podolskiy, Ukraine
- **Language:** Ukrainian (primary), with i18n infrastructure for future expansion
- **Business Model:** Local electrical services (emergency calls, installations, repairs)
- **Key USPs:** 24/7 emergency service, 30-minute response time, 3-year warranty, 15 years experience

### Technical Context

- **Type:** Single-page application (SPA)
- **Build Tool:** Vite 6.x
- **Framework:** React 18.3.x with TypeScript 5.6.x
- **Styling:** Tailwind CSS v3.4.x + custom CSS animations
- **Animations:** Framer Motion 12.x
- **Forms:** React Hook Form + Zod validation
- **Maps:** @react-google-maps/api
- **Icons:** Lucide React
- **Deployment:** Vercel (auto-deploy from main branch)

### Project Goals

1. ✅ High performance (Lighthouse >85%)
2. ✅ Full accessibility (WCAG 2.1 AA compliance)
3. ✅ SEO optimized (Schema.org, sitemap, robots.txt)
4. ✅ Mobile-first responsive design
5. ✅ Fast load times (LCP <3s, FCP <2s)

---

## 🏗️ Architecture & Structure

### Directory Structure

```
elektrik220-kamianets/
├── .github/                    # GitHub Actions workflows
│   ├── workflows/
│   │   ├── ci.yml             # Main CI/CD pipeline
│   │   └── pr-checks.yml      # PR quality checks
│   └── dependabot.yml         # Auto dependency updates
├── .husky/                    # Git hooks
│   └── pre-commit             # Lint-staged automation
├── public/                    # Static assets
│   ├── data/                  # JSON data files
│   │   ├── blog.json          # Blog articles (4 articles)
│   │   ├── company.json       # Company info + contact data
│   │   ├── services.json      # Service catalog (12 services)
│   │   └── testimonials.json  # Customer reviews
│   ├── images/                # Images organized by type
│   ├── robots.txt             # SEO - search engine directives
│   └── sitemap.xml            # SEO - dynamically generated
├── scripts/
│   └── generate-sitemap.cjs   # Auto-generates sitemap from blog.json
├── src/
│   ├── components/            # React components
│   │   ├── ui/               # Shadcn/UI components
│   │   ├── AboutSection.tsx
│   │   ├── BlogSection.tsx
│   │   ├── ContactSection.tsx # Includes Google Maps
│   │   ├── CostCalculator.tsx # Service cost calculator
│   │   ├── FAQSection.tsx
│   │   ├── Footer.tsx
│   │   ├── GallerySection.tsx
│   │   ├── Header.tsx
│   │   ├── HeroSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   └── WhyChooseUs.tsx
│   ├── contexts/
│   │   ├── AppContext.tsx     # Main app context + i18n
│   │   └── app-context-core.ts # State reducer
│   ├── hooks/
│   │   ├── use-app.ts         # Main app hook
│   │   ├── use-mobile.tsx     # Mobile detection
│   │   └── use-toast.ts       # Toast notifications
│   ├── types/
│   │   └── index.ts           # TypeScript interfaces
│   ├── lib/
│   │   └── utils.ts           # Utility functions
│   ├── App.tsx                # Main app component
│   ├── App.css                # Global styles + animations
│   ├── main.tsx               # Entry point
│   └── vite-env.d.ts
├── index.html                 # HTML template + Schema.org markup
├── vite.config.ts             # Vite configuration
├── tsconfig.json              # TypeScript config
├── tailwind.config.js         # Tailwind configuration
├── package.json               # Dependencies + scripts
├── vercel.json                # Vercel deployment + security headers
└── Documentation Files        # See below

Documentation Files:
├── CLAUDE.md                  # This file (AI assistant guide)
├── CONTRIBUTING.md            # Developer workflow guide
├── DEVOPS.md                  # DevOps automation docs
├── PERFORMANCE_OPTIMIZATIONS.md
├── README.md
└── Other .md files
```

### Component Hierarchy

```
App.tsx
├── AppProvider (Context)
│   └── AppInner
│       ├── Header
│       ├── main
│       │   ├── HeroSection
│       │   ├── WhyChooseUs
│       │   ├── ServicesSection
│       │   ├── CostCalculator (lazy loaded)
│       │   ├── AboutSection (lazy loaded)
│       │   ├── GallerySection (lazy loaded)
│       │   ├── TestimonialsSection (lazy loaded)
│       │   ├── BlogSection (lazy loaded)
│       │   ├── FAQSection (lazy loaded)
│       │   └── ContactSection (lazy loaded - includes Google Maps)
│       └── Footer
```

---

## 🎨 Key Conventions

### File Naming

- **Components:** PascalCase (e.g., `HeroSection.tsx`)
- **Hooks:** camelCase with `use-` prefix (e.g., `use-app.ts`)
- **Utils:** camelCase (e.g., `utils.ts`)
- **Types:** camelCase (e.g., `index.ts`)
- **Config:** kebab-case (e.g., `vite.config.ts`)

### Code Style

```typescript
// ✅ CORRECT - Functional components with TypeScript
import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  title: string;
  onClose: () => void;
}

const MyComponent: React.FC<Props> = ({ title, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1>{title}</h1>
    </motion.div>
  );
};

export default MyComponent;

// ❌ INCORRECT - Class components, any types
class MyComponent extends React.Component<any, any> { ... }
```

### Import Order

```typescript
// 1. External libraries
import React from 'react';
import { motion } from 'framer-motion';

// 2. Internal modules
import { useApp } from '../hooks/use-app';
import { Service } from '../types';

// 3. Components
import Header from './Header';

// 4. Styles (if needed)
import './styles.css';
```

### Accessibility (WCAG 2.1 AA)

```typescript
// ✅ ALWAYS include accessibility attributes
<button
  aria-label="Викликати електрика"
  onClick={handleCall}
>
  <Phone className="w-5 h-5" aria-hidden="true" />
  <span>Викликати</span>
</button>

<img
  src={image}
  alt="Електромонтажні роботи в квартирі"
  loading="lazy"
/>

<section aria-labelledby="services-heading">
  <h2 id="services-heading">Наші послуги</h2>
</section>
```

### Responsive Design

```typescript
// Mobile-first approach
<div className="
  px-4           {/* mobile */}
  sm:px-6        {/* 640px+ */}
  md:px-8        {/* 768px+ */}
  lg:px-12       {/* 1024px+ */}
  xl:px-16       {/* 1280px+ */}
">
```

### Brand Colors

```typescript
// Primary Brand Colors
const colors = {
  blue: {
    primary: '#3B82F6', // from-blue-600
    gradient: 'from-blue-600 to-blue-700',
  },
  orange: {
    primary: '#F59E0B', // from-orange-500
    gradient: 'from-orange-500 to-amber-600',
  },
};

// Usage:
// Blue - main CTAs, headers, trust elements
// Orange - calculator, special features, accents
```

### Typography

```typescript
// Headings
<h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold">
<h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold">
<h3 className="text-xl sm:text-2xl font-bold">

// Body text
<p className="text-base sm:text-lg text-gray-600">

// Small text
<span className="text-sm text-gray-500">
```

---

## 🔄 Data Flow & State Management

### AppContext Pattern

```typescript
// src/contexts/AppContext.tsx
// Centralized state management using useReducer

const AppContext = createContext<
  | {
      state: AppState;
      dispatch: Dispatch<AppAction>;
    }
  | undefined
>(undefined);

// State structure
interface AppState {
  companyData: CompanyData | null;
  services: Service[];
  testimonials: Testimonial[];
  blog: BlogArticle[];
  loading: boolean;
  error: string | null;
}

// Usage in components
const { state } = useApp();
const phoneNumber = state.companyData?.contact?.phones?.find(p => p.primary)?.number;
```

### Data Loading Flow

1. **App mounts** → `AppProvider` initializes
2. **useEffect** → Fetches data from `/public/data/*.json`
3. **Reducer** → Updates state with fetched data
4. **Components** → Access data via `useApp()` hook
5. **Error handling** → Shows error UI if fetch fails

### Optional Chaining Pattern

```typescript
// ✅ CRITICAL: Always use optional chaining for nested data
const email = state.companyData?.contact?.email ?? 'info@elektrik220.km.ua';
const workingHours = state.companyData?.contact?.working_hours?.monday_friday ?? '9:00 - 18:00';

// ❌ NEVER do this (causes ReferenceError in production)
const email = state.companyData?.contact.email; // Will crash if contact is undefined
```

---

## 🧩 Component Patterns

### Lazy Loading Pattern

```typescript
// src/App.tsx
import { Suspense, lazy } from 'react';

// Heavy components are lazy loaded
const ContactSection = lazy(() => import('./components/ContactSection'));
const CostCalculator = lazy(() => import('./components/CostCalculator'));

// Usage
<Suspense fallback={<div className="p-8 text-center animate-pulse">Завантаження...</div>}>
  <ContactSection />
</Suspense>
```

### Animation Pattern (Framer Motion)

```typescript
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const MyComponent = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      {/* Content */}
    </motion.div>
  );
};
```

### Form Pattern (React Hook Form + Zod)

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2, 'Ім\'я занадто коротке'),
  phone: z.string().regex(/^\+380\d{9}$/, 'Невірний формат номера'),
  email: z.string().email('Невірний email').optional(),
});

type FormData = z.infer<typeof schema>;

const MyForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    // Handle form submission
  };

  return <form onSubmit={handleSubmit(onSubmit)}>...</form>;
};
```

### Service Card Pattern

```typescript
// Standard service card from ServicesSection
<motion.div
  className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
  whileHover={{ y: -5 }}
>
  {service.urgent && (
    <div className="absolute top-4 right-4 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
      ТЕРМІНОВО
    </div>
  )}
  <div className="p-6">
    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl">
      <span className="text-3xl">{service.icon}</span>
    </div>
    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600">
      {service.title}
    </h3>
    <p className="text-gray-600 mb-4">{service.description}</p>
    <div className="text-2xl font-bold text-blue-600">{service.price}</div>
  </div>
</motion.div>
```

---

## ⚡ Performance Optimizations

### Critical Optimizations Implemented

#### 1. Font Loading (Fixed 84% LCP render delay)

```html
<!-- index.html -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  rel="preload"
  as="style"
  href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
/>
<link href="..." rel="stylesheet" media="print" onload="this.media='all'" />
```

#### 2. Code Splitting (Reduced initial bundle by ~230KB)

```typescript
// App.tsx - All heavy components lazy loaded
const CostCalculator = lazy(() => import('./components/CostCalculator'));
const ContactSection = lazy(() => import('./components/ContactSection')); // Includes Google Maps!
```

**Bundle Sizes:**

- Main bundle: 246 KB (62 KB gzipped)
- Google Maps: 219 KB (38 KB gzipped) - **lazy loaded**
- React vendor: 142 KB (45 KB gzipped)
- CostCalculator: 14.5 KB - **lazy loaded**

#### 3. Animation Performance (Fixed 164 non-composited animations)

```css
/* App.css - CORRECT: GPU-accelerated properties only */
.service-card-hover,
.gallery-image {
  transition-property: transform, opacity; /* Only GPU properties */
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Use will-change strategically */
.service-card-hover:hover {
  will-change: transform;
}

/* ❌ NEVER use wildcard with transitions on all properties */
/* * { transition: all 0.3s; } ← This breaks performance! */
```

#### 4. Image Optimization

```typescript
// Always use lazy loading for images
<img
  src={image}
  alt="Descriptive alt text"
  loading="lazy"
  decoding="async"
/>
```

### Performance Targets

```
✅ First Contentful Paint: <2s (achieved: ~1.2s)
✅ Largest Contentful Paint: <3s (achieved: ~2.5s)
✅ Total Blocking Time: <500ms (achieved: ~400ms)
✅ Cumulative Layout Shift: <0.1 (achieved: 0)
✅ Speed Index: <3.5s (achieved: ~2.0s)
```

---

## 🤖 DevOps & Automation

### Pre-commit Hooks (Husky + lint-staged)

```bash
# Automatically runs on every git commit
git add .
git commit -m "feat: new feature"

# → Runs ESLint with auto-fix
# → Runs Prettier formatting
# → If errors: commit blocked
# → If success: commit goes through
```

### GitHub Actions CI/CD

#### **Workflow 1: ci.yml** (Main Pipeline)

Runs on: Every push, every PR

Jobs:

1. **quality-checks**
   - TypeScript type checking
   - ESLint linting
   - Production build
   - Bundle size analysis

2. **lighthouse** (PR only)
   - Performance: >85%
   - Accessibility: >90%
   - SEO: >90%
   - Best Practices: >90%

3. **security-audit**
   - npm audit for vulnerabilities
   - Outdated packages check

#### **Workflow 2: pr-checks.yml**

Runs on: Pull requests only

- Bundle size report in PR comments
- Code quality metrics
- Auto-labeling

### Dependabot

- **Schedule:** Weekly (Monday, 9:00 AM)
- **Groups:** Minor/patch updates together
- **Auto-assign:** AlexSnig

### Dynamic Sitemap Generation

```bash
# Automatically runs before every build
npm run build
# → prebuild hook runs: node scripts/generate-sitemap.cjs
# → Reads public/data/blog.json
# → Finds latest article date
# → Updates sitemap.xml with blog lastmod date
```

---

## 🛠️ Common Tasks

### Adding a New Component

```bash
# 1. Create component file
touch src/components/NewSection.tsx

# 2. Component template
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const NewSection: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="new-section" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-4xl font-bold text-center mb-8"
        >
          Section Title
        </motion.h2>
        {/* Content */}
      </div>
    </section>
  );
};

export default NewSection;

# 3. Add to App.tsx
# 4. Add to Header navigation if needed
# 5. Test, commit, push
```

### Adding a New Service

```bash
# Edit public/data/services.json
{
  "id": "new-service",
  "title": "Нова послуга",
  "description": "Опис послуги...",
  "price": "від 500 грн",
  "icon": "🔌",
  "urgent": false,
  "features": [
    "Особливість 1",
    "Особливість 2",
    "Особливість 3"
  ]
}

# The service will automatically appear in ServicesSection
# No code changes needed!
```

### Updating Company Information

```bash
# Edit public/data/company.json
{
  "company": {
    "name": "Електрик 220В",
    "experience": "16 років",  # ← Update here
    "guarantee": "3 роки",
    ...
  },
  "contact": {
    "phones": [...],
    "email": "new@email.com",  # ← Update here
    ...
  }
}

# Changes propagate automatically via AppContext
```

### Adding a Blog Article

```bash
# 1. Edit public/data/blog.json
{
  "id": 5,
  "title": "Нова стаття",
  "excerpt": "Короткий опис...",
  "content": "Повний текст статті...",
  "author": "Електрик 220В",
  "date": "2025-11-16",  # ← Important for sitemap!
  "tags": ["тег1", "тег2"],
  "reading_time": "5 хв"
}

# 2. Build project
npm run build
# → Sitemap автоматично оновиться з новою датою!

# 3. Article appears in BlogSection automatically
```

### Making a Commit

```bash
# Use Conventional Commits format
git add .
git commit -m "feat: додано нову секцію testimonials"
git commit -m "fix: виправлено помилку в ContactSection"
git commit -m "perf: оптимізовано завантаження images"
git commit -m "style: покращено mobile layout"
git commit -m "refactor: рефакторинг AppContext"
git commit -m "docs: оновлено README"
git commit -m "chore: оновлено залежності"
git commit -m "security: додано CSP headers"

# Pre-commit hook runs automatically:
# ✅ ESLint --fix
# ✅ Prettier
# ✅ Type check
```

### Fixing Lint/Type Errors

```bash
# Check all errors
npm run lint
npm run typecheck

# Auto-fix what's possible
npm run lint:fix

# Watch mode for type checking during development
npm run typecheck:watch
```

### Performance Testing

```bash
# 1. Build production
npm run build

# 2. Preview locally
npm run preview

# 3. Test with Lighthouse (Chrome DevTools)
# - Open Chrome DevTools
# - Lighthouse tab
# - Run audit

# 4. Or wait for GitHub Actions Lighthouse CI on PR
```

---

## ⛔ Critical Rules

### NEVER Do This

#### 1. **Wildcard Transitions**

```css
/* ❌ NEVER - Causes 164 non-composited animations */
* {
  transition: all 0.3s;
}

/* ✅ ALWAYS - Specific selectors, GPU properties only */
.specific-class {
  transition:
    transform 0.3s,
    opacity 0.3s;
}
```

#### 2. **Missing Optional Chaining**

```typescript
// ❌ NEVER - Crashes in production
const email = state.companyData?.contact.email;
const hours = contact?.working_hours.monday_friday;

// ✅ ALWAYS - Two levels of optional chaining + fallback
const email = state.companyData?.contact?.email ?? 'default@email.com';
const hours = contact?.working_hours?.monday_friday ?? '9:00 - 18:00';
```

#### 3. **Committing Without Hooks**

```bash
# ❌ NEVER skip hooks unless absolute emergency
git commit --no-verify -m "..."

# ✅ ALWAYS let hooks run
git commit -m "..."
```

#### 4. **Hardcoded Data in Components**

```typescript
// ❌ NEVER hardcode data
const phone = '+380677523103';

// ✅ ALWAYS use data from context
const { state } = useApp();
const phone = state.companyData?.contact?.phones?.find(p => p.primary)?.number ?? '+380677523103';
```

#### 5. **Missing Accessibility Attributes**

```typescript
// ❌ NEVER - Not accessible
<button onClick={handleClick}>
  <Icon />
</button>

// ✅ ALWAYS - Full accessibility
<button
  onClick={handleClick}
  aria-label="Descriptive label"
>
  <Icon aria-hidden="true" />
  <span>Visible text</span>
</button>
```

#### 6. **Eager Loading Heavy Components**

```typescript
// ❌ NEVER - Loads Google Maps (219 KB) immediately
import ContactSection from './components/ContactSection';

// ✅ ALWAYS - Lazy load heavy components
const ContactSection = lazy(() => import('./components/ContactSection'));
```

#### 7. **Direct DOM Manipulation**

```typescript
// ❌ NEVER
document.getElementById('id').style.color = 'red';

// ✅ ALWAYS use React state and refs
const [color, setColor] = useState('red');
<div style={{ color }}></div>
```

### ALWAYS Do This

#### 1. **Use TypeScript Interfaces**

```typescript
// ✅ ALWAYS define proper types
interface Props {
  title: string;
  count: number;
  onClose: () => void;
}

const Component: React.FC<Props> = ({ title, count, onClose }) => {
  // ...
};
```

#### 2. **Error Boundaries**

```typescript
// ✅ ALWAYS wrap sections that might fail
<ErrorBoundary fallback={<ErrorUI />}>
  <ContactSection />
</ErrorBoundary>
```

#### 3. **Loading States**

```typescript
// ✅ ALWAYS show loading states
{loading && <LoadingSpinner />}
{error && <ErrorMessage message={error} />}
{data && <Content data={data} />}
```

#### 4. **Mobile-First Design**

```typescript
// ✅ ALWAYS start with mobile, scale up
<div className="
  text-sm sm:text-base md:text-lg
  px-4 sm:px-6 md:px-8 lg:px-12
">
```

#### 5. **Semantic HTML**

```typescript
// ✅ ALWAYS use semantic elements
<header>, <nav>, <main>, <section>, <article>, <aside>, <footer>

// Not just <div> everywhere
```

---

## 🔄 Recent Changes (Last 15 Commits)

### Performance Optimizations (Nov 16, 2025)

- ✅ Font loading optimization (preconnect, preload, async)
- ✅ Code splitting (lazy load ContactSection, CostCalculator)
- ✅ Fixed 164 non-composited animations
- ✅ LCP improved from 4.9s → ~2.5s
- ✅ TBT reduced from 1,040ms → ~400ms

### DevOps Automation (Nov 16, 2025)

- ✅ Husky + lint-staged for pre-commit hooks
- ✅ GitHub Actions CI/CD (quality checks, Lighthouse, security)
- ✅ Dependabot for auto dependency updates
- ✅ Prettier for consistent formatting
- ✅ Comprehensive documentation (CONTRIBUTING.md, DEVOPS.md)

### Security Enhancements (Nov 15, 2025)

- ✅ CSP headers to prevent XSS
- ✅ COOP headers for iframe protection
- ✅ X-Frame-Options for clickjacking protection
- ✅ Multiple security headers in vercel.json

### SEO Optimizations (Nov 15, 2025)

- ✅ Dynamic sitemap.xml generation from blog data
- ✅ Valid robots.txt
- ✅ Complete Schema.org JSON-LD (LocalBusiness + Electrician)
- ✅ Meta tags optimization

### Bug Fixes (Nov 14, 2025)

- ✅ Fixed ReferenceError in ContactSection (optional chaining)
- ✅ Fixed undefined access in working_hours
- ✅ Fixed email and social media fallbacks

### Features Added (Nov 1-4, 2025)

- ✅ CostCalculator component with orange branding
- ✅ WhyChooseUs section with trust indicators
- ✅ WCAG 2.1 accessibility improvements
- ✅ Mobile-responsive Header
- ✅ Gallery, Blog, Testimonials sections

---

## 📚 Additional Resources

### Documentation Files

- **CONTRIBUTING.md** - Developer workflow and git conventions
- **DEVOPS.md** - Complete DevOps automation guide
- **PERFORMANCE_OPTIMIZATIONS.md** - Performance optimization details
- **README.md** - Project overview and quick start

### External Resources

- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Vite Guide](https://vitejs.dev/guide/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Lighthouse Performance](https://web.dev/performance-scoring/)

### Key Files to Reference

- `src/types/index.ts` - All TypeScript interfaces
- `src/contexts/AppContext.tsx` - State management
- `public/data/*.json` - Data structure examples
- `vercel.json` - Deployment and security config
- `.github/workflows/*.yml` - CI/CD pipeline config

---

## 🎯 Summary for AI Assistants

When working on this project:

1. **Always use optional chaining** with fallbacks for nested data access
2. **Lazy load heavy components** (Google Maps, calculators, galleries)
3. **Use GPU-accelerated animations only** (transform, opacity)
4. **Follow mobile-first responsive design**
5. **Maintain WCAG 2.1 AA accessibility**
6. **Use Conventional Commits** for all commits
7. **Let pre-commit hooks run** (don't use --no-verify)
8. **Keep bundle sizes small** (check after changes)
9. **Update data via JSON files** (not hardcoded in components)
10. **Test performance** (aim for Lighthouse >85%)

**Primary Language:** Ukrainian (uk)
**Deployment:** Vercel (auto-deploy)
**Branch Strategy:** Feature branches → PR → main

---

**Questions?** Check CONTRIBUTING.md or DEVOPS.md for detailed workflows.

**Last Updated:** November 16, 2025 by Claude Code Assistant
