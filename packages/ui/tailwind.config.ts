import type { Config } from 'tailwindcss';
const config: Config = {
  content: [
    '../../apps/storybook/**/*.{js,ts,jsx,tsx,mdx}',
    './.stories/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
};
export default config;
