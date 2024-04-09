import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        dark1: '#0F0F0F',
        dark2: '#31363F',
        primary: '#CCCCCC',
        secondary: '#EEEEEE',
      },
      spacing: {
        none: '0px',
        xxxsmall: '2px',
        xxsmall: '4px',
        xsmall: '8px',
        small: '12px',
        medium: '16px',
        large: '20px',
        xlarge: '24px',
        xxlarge: '28px',
        xxxlarge: '32px',
      },
    },
  },
  plugins: [],
};
export default config;
