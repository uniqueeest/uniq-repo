const FONT_BASE = 16;
const SPACE_BASE = 4;

export function pxToRem(px: number, base: number = 16): string {
  return `${px / base}rem`;
}

export function createFontSizeScale(max: number): Record<string, string> {
  const sizes = Array.from({ length: max }, (_, i) => i + 1);

  return sizes.reduce(
    (acc, size) => {
      const multiplier = size / FONT_BASE;
      acc[`size-${size}`] = `calc(var(--font-size) * ${multiplier})`;
      return acc;
    },
    {} as Record<string, string>,
  );
}

export function createSpaceScale(max: number): Record<string, string> {
  const sizes = Array.from({ length: max }, (_, i) => i + 1);

  return sizes.reduce(
    (acc, size) => {
      const multiplier = size / SPACE_BASE;
      acc[`space-${size}`] = `calc(var(--spacing) * ${multiplier})`;
      return acc;
    },
    {} as Record<string, string>,
  );
}
