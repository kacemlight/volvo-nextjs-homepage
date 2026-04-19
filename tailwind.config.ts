import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        volvo: {
          blue: '#003DA5',
          dark: '#1a1a1a',
          light: '#f5f5f5',
        },
      },
    },
  },
  plugins: [],
};

export default config;