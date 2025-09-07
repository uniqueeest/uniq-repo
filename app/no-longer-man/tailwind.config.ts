import type { Config } from 'tailwindcss';
import { heroui } from '@heroui/theme';
import { STYLE } from '@uniqueeest/token';

export default {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
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
    },
  },
  plugins: [heroui()],
} satisfies Config;
