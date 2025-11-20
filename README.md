# GENOS Leaderboard

Official gamified leaderboard platform for GENOS, the Artificial Intelligence Club at ENSAM Meknès.

## About GENOS

GENOS is the AI Club at École Nationale Supérieure d'Arts et Métiers (ENSAM) Meknès, dedicated to fostering innovation, learning, and collaboration among AI enthusiasts and engineering students.

## About This Platform

The GENOS Leaderboard is a web application designed to:

- **Track member points** based on participation and contributions
- **Rank members** on a competitive leaderboard
- **Boost engagement** through gamification
- **Celebrate achievements** and milestones
- **Foster community** among AI club members

## Features

- 🏆 **Real-time Leaderboard** - Live rankings of all members
- 📊 **Member Dashboard** - Personal stats and progress tracking
- 👤 **Member Profiles** - Detailed view of achievements and point history
- 🔐 **Secure Authentication** - ENSAM email-based login (@edu.umi.ac.ma)
- ⚡ **Admin Panel** - Point management and member administration
- 📱 **Responsive Design** - Works seamlessly on all devices

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **UI Framework**: Tailwind CSS + shadcn/ui
- **Backend**: Supabase (PostgreSQL + Auth)
- **Hosting**: Vercel
- **Analytics**: Vercel Analytics

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

1. Clone the repository:
```bash
git clone <YOUR_GIT_URL>
cd club-rank-master
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file with your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:8080`

## Development

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Project Structure

```
club-rank-master/
├── public/              # Static files
│   ├── sitemap.xml     # SEO sitemap
│   └── robots.txt      # Search engine directives
├── src/
│   ├── components/     # Reusable UI components
│   ├── hooks/          # Custom React hooks (including SEO)
│   ├── integrations/   # External services (Supabase)
│   ├── lib/            # Utilities and configurations
│   ├── pages/          # Application pages/routes
│   └── App.tsx         # Main application component
└── package.json
```

## SEO Optimization

This project includes comprehensive SEO features:

- **Meta Tags**: Dynamic title, description, keywords per page
- **Open Graph**: Social media sharing optimization
- **Twitter Cards**: Enhanced Twitter sharing
- **Structured Data**: JSON-LD for Organization, WebApplication schemas
- **Sitemap**: XML sitemap for search engines
- **Robots.txt**: Proper crawling directives
- **Semantic HTML**: ARIA labels and proper heading hierarchy

## Authentication

Only users with `@edu.umi.ac.ma` email addresses can access the platform. Authentication is handled through Google OAuth via Supabase.

## Deployment

The application is configured for deployment on Vercel:

```bash
# Build the project
npm run build

# Deploy to Vercel
vercel deploy
```

## Contributing

This is an internal project for GENOS members. If you're a member and want to contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

Copyright © 2025 GENOS - AI Club ENSAM Meknès. All rights reserved.

## Contact

For questions or support:
- Email: [Your club email]
- GitHub: [Your repository]

---

**Built with ❤️ by GENOS for the AI community at ENSAM Meknès**
