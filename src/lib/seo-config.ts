/**
 * SEO Configuration for GENOS Leaderboard
 * Central configuration for SEO-related constants and utilities
 */

export const SEO_CONFIG = {
  siteName: 'GENOS Leaderboard',
  siteUrl: 'https://genos-leaderboard.vercel.app',
  organization: {
    name: 'GENOS',
    fullName: 'GENOS - AI Club ENSAM Meknès',
    description: 'GENOS is the Artificial Intelligence Club at ENSAM Meknès, dedicated to fostering innovation, learning, and collaboration among AI enthusiasts and engineering students.',
    location: 'Meknès, Morocco',
    school: 'École Nationale Supérieure d\'Arts et Métiers Meknès',
    schoolShort: 'ENSAM Meknès',
  },
  defaultMeta: {
    keywords: 'GENOS, ENSAM Meknès, AI Club, artificial intelligence, leaderboard, gamification, member rankings, Morocco AI, engineering students, tech community, competition platform',
    author: 'GENOS - AI Club ENSAM Meknès',
    themeColor: '#9b87f5',
  },
  social: {
    twitter: '@genos_ensam',
    facebook: 'genos.ensam',
    // Add other social media handles as available
  },
  geo: {
    region: 'MA',
    placename: 'Meknès, Morocco',
    position: '33.8730;-5.5472',
    icbm: '33.8730, -5.5472',
  },
};

/**
 * Generate page-specific meta tags
 */
export const generatePageMeta = (page: {
  title: string;
  description: string;
  keywords?: string;
  path?: string;
  ogImage?: string;
}) => {
  const fullTitle = page.title; // Don't duplicate site name
  const canonical = page.path ? `${SEO_CONFIG.siteUrl}${page.path}` : SEO_CONFIG.siteUrl;
  const ogImageUrl = page.ogImage ? `${SEO_CONFIG.siteUrl}${page.ogImage}` : undefined;
  
  return {
    title: fullTitle,
    description: page.description,
    keywords: page.keywords || SEO_CONFIG.defaultMeta.keywords,
    canonical,
    ogImage: ogImageUrl,
  };
};

/**
 * Page-specific SEO configurations
 */
export const PAGE_SEO = {
  home: {
    title: 'GENOS Leaderboard | AI Club ENSAM Meknès - Gamified Member Rankings',
    description: 'Official leaderboard platform of GENOS, the AI Club at ENSAM Meknès. Track member points, compete on rankings, and boost engagement through gamification. Join our community of AI enthusiasts and innovators.',
    keywords: 'GENOS, ENSAM Meknès, AI Club, artificial intelligence, leaderboard, gamification, member rankings, Morocco AI',
    path: '/',
    ogImage: '/images/og/genos-og-home.png',
  },
  login: {
    title: 'Login - GENOS Leaderboard',
    description: 'Sign in to GENOS Leaderboard with your ENSAM Meknès email. Access your profile, track your points, and compete with fellow AI Club members.',
    keywords: 'GENOS login, ENSAM login, AI Club access, member portal',
    path: '/login',
    ogImage: '/images/og/genos-og-default.png',
  },
  dashboard: {
    title: 'Dashboard - GENOS Leaderboard',
    description: 'View your GENOS member dashboard. Track your points, see your ranking, and monitor your progress in the AI Club at ENSAM Meknès.',
    keywords: 'GENOS dashboard, member dashboard, points tracking, AI Club profile',
    path: '/dashboard',
    ogImage: '/images/og/genos-og-default.png',
  },
  leaderboard: {
    title: 'Leaderboard - GENOS Rankings',
    description: 'Explore the complete GENOS leaderboard. See how members rank, discover top performers, and find your position among AI Club members at ENSAM Meknès.',
    keywords: 'GENOS leaderboard, member rankings, top performers, AI Club competition, ENSAM rankings',
    path: '/leaderboard',
    ogImage: '/images/og/genos-og-leaderboard.png',
  },
  profile: {
    title: 'Member Profile - GENOS Leaderboard',
    description: 'View member profiles on GENOS Leaderboard. See achievements, points earned, and contributions to the AI Club at ENSAM Meknès.',
    keywords: 'GENOS profile, member profile, achievements, AI Club member',
    path: '/profile',
    ogImage: '/images/og/genos-og-default.png',
  },
  admin: {
    title: 'Admin Panel - GENOS Leaderboard',
    description: 'GENOS Admin Panel for managing member points, rankings, and club activities at ENSAM Meknès.',
    keywords: 'GENOS admin, admin panel, member management',
    path: '/admin',
    noindex: true, // Admin pages should not be indexed
  },
};

/**
 * Generate BreadcrumbList structured data
 */
export const generateBreadcrumbs = (items: Array<{ name: string; url?: string }>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.url && { item: `${SEO_CONFIG.siteUrl}${item.url}` }),
    })),
  };
};

/**
 * Generate Person structured data for member profiles
 */
export const generatePersonSchema = (profile: {
  name: string;
  email?: string;
  image?: string;
  description?: string;
  jobTitle?: string;
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    ...(profile.email && { email: profile.email }),
    ...(profile.image && { image: profile.image }),
    ...(profile.description && { description: profile.description }),
    ...(profile.jobTitle && { jobTitle: profile.jobTitle }),
    affiliation: {
      '@type': 'Organization',
      name: SEO_CONFIG.organization.fullName,
    },
    memberOf: {
      '@type': 'Organization',
      name: SEO_CONFIG.organization.name,
    },
  };
};
