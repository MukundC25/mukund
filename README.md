# Mukund Chavan — Portfolio Website

A modern, dark-themed, motion-heavy portfolio website built with Next.js, TypeScript, Tailwind CSS, and Framer Motion. Features smooth animations, responsive design, and accessibility-first approach.

![Portfolio Preview](./frontend/public/preview.png)

## Features

- **Dark Theme** — Neutral/warm palette with amber/gold accents (no bluish/pink/violet)
- **Motion-Heavy UI** — Smooth animations using Framer Motion with reduced-motion support
- **Responsive Design** — Mobile-first approach, works on all devices
- **Accessible** — Semantic HTML, keyboard navigation, ARIA attributes, 4.5:1+ contrast
- **SEO Optimized** — Meta tags, Open Graph, Twitter cards, JSON-LD structured data
- **Contact Form** — Working form with API endpoint
- **Resume Parser** — Automated PDF parsing to JSON

## Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **UI Components**: Headless UI

### Backend (API Routes)
- **Runtime**: Next.js API Routes
- **Database**: MongoDB Atlas (optional, in-memory for demo)

## Project Structure

```
mukund/
├── README.md
├── data/
│   └── resume.json          # Parsed resume data
├── scripts/
│   └── parse-resume.js      # Resume PDF parser
├── frontend/
│   ├── app/
│   │   ├── layout.tsx       # Root layout with SEO
│   │   ├── page.tsx         # Home page
│   │   ├── globals.css      # Global styles & theme
│   │   └── api/
│   │       ├── contact/     # Contact form endpoint
│   │       ├── resume/      # Resume JSON endpoint
│   │       └── health/      # Health check
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx   # Animated sticky navbar
│   │   │   └── Footer.tsx   # Footer with social links
│   │   ├── sections/
│   │   │   ├── Hero.tsx     # Hero with animated text
│   │   │   ├── About.tsx    # About & education
│   │   │   ├── Experience.tsx # Timeline experience
│   │   │   ├── Projects.tsx # Project cards grid
│   │   │   ├── Skills.tsx   # Skills & achievements
│   │   │   └── Contact.tsx  # Contact form
│   │   └── ui/
│   │       └── Button.tsx   # Animated button
│   ├── hooks/
│   │   └── useReducedMotion.ts
│   ├── lib/
│   │   ├── motion-config.ts # Animation settings
│   │   └── resume-data.ts   # Resume data types
│   ├── data/
│   │   └── resume.json      # Resume data
│   ├── public/
│   │   └── Mukund_resume.pdf
│   └── __tests__/           # Jest tests
├── .github/
│   └── workflows/
│       └── ci.yml           # GitHub Actions CI/CD
└── Mukund_resume.pdf        # Source resume
```

## Local Setup

### Prerequisites
- Node.js 20+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/MukundC25/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Set up environment variables** (optional)
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local`:
   ```env
   # MongoDB (optional - for persistent contact storage)
   MONGODB_URI=mongodb+srv://...
   
   # Email notifications (optional)
   SMTP_HOST=smtp.gmail.com
   SMTP_USER=your@email.com
   SMTP_PASS=your-app-password
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000)

### Parse Resume (if updating)

```bash
cd ..
node scripts/parse-resume.js
cp data/resume.json frontend/data/
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run test` | Run Jest tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage |

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/resume` | GET | Returns parsed resume JSON |
| `/api/contact` | POST | Submit contact form |
| `/api/contact` | GET | List messages (admin) |
| `/api/health` | GET | Health check |

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Set environment variables
4. Deploy

### Manual Deployment

```bash
cd frontend
npm run build
npm run start
```

## Theme Customization

Edit `frontend/app/globals.css`:

```css
:root {
  --background: #0B0B0C;
  --accent: #FFB86B;        /* Primary accent (amber/gold) */
  --accent-green: #76C893;  /* Secondary accent (green) */
  /* ... */
}
```

## Animation Configuration

Edit `frontend/lib/motion-config.ts`:

```typescript
export const motionConfig = {
  duration: {
    fast: 0.14,
    base: 0.45,
    slow: 0.7
  },
  stagger: {
    children: 0.08
  }
};
```

## Accessibility

- ✅ Semantic HTML (`main`, `nav`, `section`, `article`)
- ✅ Keyboard navigation for all interactive elements
- ✅ ARIA attributes for dynamic content
- ✅ Color contrast ratio ≥ 4.5:1
- ✅ `prefers-reduced-motion` support
- ✅ Focus indicators

## Performance

- ✅ Next.js Image optimization
- ✅ Code splitting
- ✅ Lazy loading
- ✅ Minimal bundle size

Target Lighthouse scores:
- Performance: > 90 (desktop)
- Accessibility: > 95
- Best Practices: > 95
- SEO: > 95

## Resume Data (resume.json)

```json
{
  "meta": { "sourceFile": "...", "parsedAt": "..." },
  "personal": { "name": "...", "title": "...", "contacts": {...} },
  "summary": "...",
  "experience": [...],
  "projects": [...],
  "education": [...],
  "skills": { "languages": [], "frameworks": [], ... },
  "achievements": [...],
  "notes": { "confidence": {...} }
}
```

## Changelog

### v1.0.0 (2025-11-28)
- Initial release
- Resume PDF parsing
- Hero section with animated text
- Experience timeline
- Projects grid with hover effects
- Skills & achievements section
- Contact form with API
- Responsive navbar with mobile menu
- Footer with social links
- Dark theme with amber accents
- Framer Motion animations
- Reduced motion support
- SEO & JSON-LD
- Jest tests
- GitHub Actions CI

## Next Steps

1. **Add project screenshots** — Add images to `/frontend/public/projects/`
2. **Connect MongoDB** — For persistent contact storage
3. **Add email notifications** — Using nodemailer
4. **Add analytics** — Google Analytics or Plausible
5. **Add blog section** — Using MDX
6. **Add case studies** — Detailed project pages

## License

MIT © Mukund Chavan

---

Built with ❤️ using Next.js, Tailwind CSS, and Framer Motion
