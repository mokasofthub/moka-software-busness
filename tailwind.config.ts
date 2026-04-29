import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#4f46e5',
        'primary-light': '#6366f1',
        accent: '#06b6d4',
        'bg-base': '#111827',
        'bg-card': '#1f2937',
        'bg-card-hover': '#273449',
        'border-default': '#374151',
        'text-muted': '#9ca3af',
        success: '#10b981',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-space)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #4f46e5, #06b6d4)',
      },
      borderRadius: {
        card: '14px',
      },
    },
  },
  plugins: [],
};

export default config;
