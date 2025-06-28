import { createFontSizeScale, createSpaceScale } from '@uniqueeest/utils';

const colors = {
  inherit: 'inherit',
  current: 'currentColor',
  transparent: 'transparent',

  white: '#ffffff',
  black: '#000000',

  gray: {
    1: '#FCFCFC',
    2: '#F8F8F8',
    3: '#F3F3F3',
    4: '#EBEBEB',
    5: '#E0E0E0',
    6: '#D1D1D1',
    7: '#BABABA',
    8: '#999999',
    9: '#666666',
    10: '#171717',
  },

  blue: {
    1: '#A9D6E5',
    2: '#89C2D9',
    3: '#61A5C2',
    4: '#468FAF',
    5: '#2C7DA0',
    6: '#2A6F97',
    7: '#014F86',
    8: '#01497C',
    9: '#013A63',
    10: '#012A4A',
  },

  green: {
    1: '#E6F0C2',
    2: '#D1E191',
    3: '#B5D46A',
    4: '#9AC246',
    5: '#7FA034',
    6: '#6B8E23',
    7: '#556B2F',
    8: '#3E5223',
    9: '#2C3A18',
    10: '#1A260F',
  },

  red: {
    1: '#FFF0F3',
    2: '#FFCCD5',
    3: '#FFB3C1',
    4: '#FF8FA3',
    5: '#FF758F',
    6: '#FF4D6D',
    7: '#C9184A',
    8: '#A4133C',
    9: '#800F2F',
    10: '#590D22',
  },
};

const borderRadius = {
  none: '0px', // 0px
  sm: 'var(--radius)', // 2px
  md: 'calc(var(--radius) * 2)', // 4px
  lg: 'calc(var(--radius) * 3)', // 6px
  xl: 'calc(var(--radius) * 4)', // 8px
  '2xl': 'calc(var(--radius) * 6)', // 12px
  '3xl': 'calc(var(--radius) * 8)', // 16px
  '4xl': 'calc(var(--radius) * 12)', // 24px
  full: '9999px',
  circle: '50%',
};

const fontSize = createFontSizeScale(128);

const fontWeight = {
  bold: '700',
  'semi-bold': '600',
  medium: '500',
  regular: '400',
  light: '300',
  thin: '200',
};

const spacing = createSpaceScale(128);

export const STYLE = {
  colors,
  borderRadius,
  fontSize,
  fontWeight,
  spacing,
};
