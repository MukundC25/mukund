# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2025-11-28

### Initial Release

#### Added - Core Infrastructure
- **commit 1**: `feat: Initialize Next.js 16 project with TypeScript and Tailwind CSS v4`
  - Set up App Router structure
  - Configured TypeScript with strict mode
  - Added Tailwind CSS with PostCSS

- **commit 2**: `feat: Add Framer Motion and Lucide icons`
  - Installed framer-motion for animations
  - Added lucide-react for iconography
  - Installed @headlessui/react for accessible components

#### Added - Resume Parsing
- **commit 3**: `feat: Create resume PDF parser script`
  - Added pdf-parse dependency
  - Created scripts/parse-resume.js
  - Extracts personal info, experience, projects, skills, education
  - Outputs structured resume.json with confidence scores

- **commit 4**: `feat: Generate resume.json from Mukund_resume.pdf`
  - Parsed all resume sections
  - Added achievements and competitive programming stats
  - Marked confidence scores for each section

#### Added - Theme & Styling
- **commit 5**: `feat: Configure dark theme with amber/gold accents`
  - Set primary background: #0B0B0C
  - Set accent color: #FFB86B (warm amber)
  - Added support accent: #76C893 (muted green)
  - Created CSS variables for theming
  - Added utility classes (.text-gradient, .glow-accent, .glass)

- **commit 6**: `feat: Add reduced motion support`
  - Created useReducedMotion hook
  - Added CSS media query for prefers-reduced-motion
  - All animations respect user preference

#### Added - Layout Components
- **commit 7**: `feat: Create animated Navbar component`
  - Sticky header with glass effect on scroll
  - Logo with micro-animation
  - Nav links with animated underline on hover
  - Mobile slide-in menu with focus trap
  - Social links and "Hire Me" CTA

- **commit 8**: `feat: Create Footer component`
  - Brand section with name and title
  - Coding profiles links (LeetCode, CodeChef, Codeforces)
  - Social links with hover animations
  - "Available for work" status indicator
  - Copyright with heart icon

#### Added - Section Components
- **commit 9**: `feat: Create Hero section with animated text`
  - Staggered text reveal animation
  - Floating accent orbs (parallax effect)
  - Stats display (700+ problems, Top 5%, 3+ projects)
  - CTAs: "View My Work", "Get In Touch"
  - Download resume link
  - Scroll indicator animation

- **commit 10**: `feat: Create About section`
  - Info cards (Location, Education, Experience)
  - Education details with GPA
  - Hover animations on cards

- **commit 11**: `feat: Create Experience timeline`
  - Timeline layout with animated dots
  - Expandable bullet points
  - Tech stack tags
  - Date formatting

- **commit 12**: `feat: Create Projects grid`
  - 3D tilt effect on hover
  - Glow effect with accent color
  - GitHub and live demo links
  - Tech stack badges
  - Highlights list

- **commit 13**: `feat: Create Skills section`
  - Categorized skill chips (Languages, Frameworks, AI/ML, Tools, Databases)
  - Staggered animation on scroll
  - Achievements section with competitive programming stats

- **commit 14**: `feat: Create Contact form`
  - Form validation (name, email, message)
  - Focus animations on inputs
  - Success/error state handling
  - Contact info cards
  - Social links
  - "Available for opportunities" badge

#### Added - UI Components
- **commit 15**: `feat: Create animated Button component`
  - Primary, secondary, ghost variants
  - Size options (sm, md, lg)
  - Loading state with spinner
  - Hover scale animation

#### Added - API Routes
- **commit 16**: `feat: Add contact form API endpoint`
  - POST /api/contact - stores messages
  - GET /api/contact - lists messages
  - Email validation
  - Error handling

- **commit 17**: `feat: Add resume and health API endpoints`
  - GET /api/resume - returns parsed resume JSON
  - GET /api/health - health check with version

#### Added - SEO & Accessibility
- **commit 18**: `feat: Add SEO metadata and JSON-LD`
  - Title, description, keywords
  - Open Graph tags
  - Twitter card tags
  - JSON-LD Person schema
  - Robots meta

- **commit 19**: `feat: Ensure accessibility compliance`
  - Semantic HTML (main, nav, section, article)
  - ARIA attributes for dynamic content
  - Keyboard navigation
  - Focus indicators
  - Color contrast ≥ 4.5:1

#### Added - Testing & CI
- **commit 20**: `feat: Add Jest testing setup`
  - Jest configuration with next/jest
  - Testing Library setup
  - Mock for matchMedia and IntersectionObserver
  - Resume data tests
  - Hero component tests

- **commit 21**: `feat: Add GitHub Actions CI/CD`
  - Lint job
  - Test job
  - Build job
  - Deploy preview (PR)
  - Deploy production (main)

#### Added - Documentation
- **commit 22**: `docs: Create comprehensive README`
  - Project overview
  - Tech stack
  - Project structure
  - Setup instructions
  - API documentation
  - Deployment guide
  - Customization guide

- **commit 23**: `docs: Add FILES.md with file purposes`
  - Complete list of created files
  - Purpose description for each file

- **commit 24**: `docs: Add CHANGELOG.md`
  - Simulated git commit history
  - Feature descriptions

---

## Next Steps (Suggested)

1. **Add project screenshots**
   - Create `/frontend/public/projects/` directory
   - Add screenshots for FinMate, Apta, Conversational AI

2. **Connect MongoDB Atlas**
   - Set MONGODB_URI in .env.local
   - Create Mongoose models for ContactMessage
   - Update /api/contact to persist messages

3. **Add email notifications**
   - Install nodemailer
   - Configure SMTP settings
   - Send notification on new contact

4. **Add analytics**
   - Set up Google Analytics or Plausible
   - Track page views and events

5. **Create case study pages**
   - Add /projects/[slug] dynamic routes
   - Detailed project descriptions
   - Image galleries
   - Technical deep-dives
