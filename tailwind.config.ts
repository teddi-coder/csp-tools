import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/modules/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'hh-bg': '#F1F1F1',
        'hh-black': '#1B1918',
        'hh-blue': '#7DD3FC',
        'hh-green': '#65E499',
        'hh-yellow': '#F4F7A6',
        'hh-pink': '#FFA8D1',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
