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
    1: '#B7EFC5',
    2: '#92E6A7',
    3: '#6EDE8A',
    4: '#4AD66D',
    5: '#2DC653',
    6: '#25A244',
    7: '#208B3A',
    8: '#1A7431',
    9: '#155D27',
    10: '#10451D',
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

const fontSize = {
  'size-8': 'calc(var(--font-size) * 0.5)',
  'size-10': 'calc(var(--font-size) * 0.625)',
  'size-12': 'calc(var(--font-size) * 0.75)',
  'size-14': 'calc(var(--font-size) * 0.875)',
  'size-16': 'calc(var(--font-size) * 1)',
  'size-18': 'calc(var(--font-size) * 1.125)',
  'size-20': 'calc(var(--font-size) * 1.25)',
  'size-24': 'calc(var(--font-size) * 1.5)',
  'size-28': 'calc(var(--font-size) * 1.75)',
  'size-32': 'calc(var(--font-size) * 2)',
  'size-36': 'calc(var(--font-size) * 2.25)',
  'size-48': 'calc(var(--font-size) * 3)',
  'size-60': 'calc(var(--font-size) * 3.75)',
};

const fontWeight = {
  bold: '700',
  'semi-bold': '600',
  medium: '500',
  regular: '400',
  light: '300',
  thin: '200',
};

export const STYLE = {
  colors,
  borderRadius,
  fontSize,
  fontWeight,
};
