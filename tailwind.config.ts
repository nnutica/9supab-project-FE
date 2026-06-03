import type { Config } from 'tailwindcss';
import daisyui from 'daisyui';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'navy-dark': '#0F172A',
        'navy-light': '#334155',
        surface: '#F8FAFC',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'var(--font-noto-thai)', 'sans-serif'],
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        supab: {
          'primary': '#1E293B',
          'primary-content': '#F8FAFC',
          'secondary': '#334155',
          'secondary-content': '#F8FAFC',
          'accent': '#38BDF8',
          'accent-content': '#0F172A',
          'neutral': '#1E293B',
          'neutral-content': '#F8FAFC',
          'base-100': '#F8FAFC',
          'base-200': '#E2E8F0',
          'base-300': '#CBD5E1',
          'base-content': '#0F172A',
          'info': '#38BDF8',
          'success': '#22C55E',
          'warning': '#F59E0B',
          'error': '#EF4444',
        },
      },
    ],
  },
};

export default config;
