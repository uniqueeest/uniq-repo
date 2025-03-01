import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

import { createFontSizeScale } from './convert-units';

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': Object.keys(createFontSizeScale(128)).map(
        (size) => `text-${size}`,
      ),
    },
  },
});

export const cn = (...inputs: ClassValue[]) => {
  return customTwMerge(clsx(...inputs));
};
