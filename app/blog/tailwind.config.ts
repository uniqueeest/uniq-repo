import type { Config } from 'tailwindcss';
import { STYLE } from '@uniqueeest/token';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: STYLE.colors.gray[2],
        gray: STYLE.colors.gray,
        blue: STYLE.colors.blue,
        green: STYLE.colors.green,
        red: STYLE.colors.red,
        white: STYLE.colors.white,
        black: STYLE.colors.black,
      },
      spacing: STYLE.spacing,
      borderRadius: STYLE.borderRadius,
      fontSize: STYLE.fontSize,
      fontWeight: STYLE.fontWeight,
    },
  },
  plugins: [],
} satisfies Config;
