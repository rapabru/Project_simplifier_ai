import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './index.html',
    './**/*.{ts,tsx,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
