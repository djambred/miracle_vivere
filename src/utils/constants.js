export const API_URL = import.meta.env.VITE_API_URL || '/api';

export const PORTFOLIO_CATEGORIES = [
  'Web Development',
  'Mobile App',
  'UI/UX Design',
  'Branding',
  'Photography',
  'Video Production',
  'Graphic Design',
  'Other'
];

export const SEO_PAGES = [
  { value: 'home', label: 'Home Page' },
  { value: 'about', label: 'About Page' },
  { value: 'portfolio', label: 'Portfolio Page' },
  { value: 'contact', label: 'Contact Page' }
];

export const DEFAULT_SEO = {
  title: 'Miracle Vivere - Creative Portfolio',
  description: 'Explore my creative portfolio showcasing innovative designs and projects.',
  keywords: ['portfolio', 'design', 'creative', 'web development'],
  ogImage: '/og-image.jpg'
};