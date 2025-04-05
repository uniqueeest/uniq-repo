import type { Config } from 'tailwindcss';
import { STYLE } from '@uniqueeest/token';

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './widgets/**/*.{js,ts,jsx,tsx,mdx}',
    './entities/**/*.{js,ts,jsx,tsx,mdx}',
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
      borderRadius: STYLE.borderRadius,
      fontSize: STYLE.fontSize,
      fontWeight: STYLE.fontWeight,
      spacing: STYLE.spacing,
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
} satisfies Config;
