export const COLORS = {
  primary: '#2c5f7c',
  secondary: '#f0a500',
  accent: '#4CAF50',
  textDark: '#2c3e50',
  textLight: '#6c757d',
  bgLight: '#f8f9fa',
};

export const OUTCOMES_DATA = {
  lifePlan: {
    title: 'Life Plan Excel',
    icon: '📊',
    color: '#4CAF50',
    url: 'https://livinfulfilled.com/wp-content/uploads/2025/09/Living-Fulfilled-Life-Plan-Spreadsheet.xlsx',
    type: 'excel',
    description: 'Comprehensive spreadsheet to plan and track your life goals'
  },
  blueprint: {
    title: 'One Day Blueprint',
    icon: '📝',
    color: '#2196F3',
    url: 'https://livinfulfilled.com/wp-content/uploads/2025/09/One-Page-Living-Fulfilled-Life-Blueprint.pdf',
    type: 'pdf',
    description: 'Your complete life blueprint on a single page'
  },
  visionBoard: {
    title: 'Vision Board',
    icon: '🎨',
    color: '#FF9800',
    url: 'https://livinfulfilled.com/wp-content/uploads/2025/09/Living-Fulfilled-Transformation-in-Visuals.pdf',
    type: 'pdf',
    description: 'Visual representation of your transformation journey'
  }
};

export const ANIMATION_VARIANTS = {
  fadeIn: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  },
  fadeInUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  },
  scaleIn: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 0.5 }
  },
  slideInLeft: {
    initial: { x: -50, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.6 }
  },
  slideInRight: {
    initial: { x: 50, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.6 }
  }
};

export const VIEWPORT_CONFIG = {
  once: true,
  margin: "-100px"
};

export const LOGO_URL = 'https://livinfulfilled.com/wp-content/uploads/2025/09/logo-1.png';
export const COACH_IMAGE_URL = 'https://livinfulfilled.com/wp-content/uploads/2025/08/sat-image.jpeg';

export default {
  COLORS,
  OUTCOMES_DATA,
  ANIMATION_VARIANTS,
  VIEWPORT_CONFIG,
  LOGO_URL,
  COACH_IMAGE_URL
};