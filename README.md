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
- Email: [amineamllal@gmail.com]
- GitHub: (https://github.com/Amine-Amllal)

---

**Built with ❤️ by GENOS for the AI community at ENSAM Meknès**
