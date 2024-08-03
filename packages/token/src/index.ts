const colors = {
	inherit: 'inherit',
	current: 'currentColor',
	transparent: 'tranparent',

	white: '#ffffff',
	black: '#000000',

	gray: {
		1: 'hsl(0, 0%, 99%)',
		2: 'hsl(0, 0%, 97.3%)',
		3: 'hsl(0, 0%, 95.1%)',
		4: 'hsl(0, 0%, 93%)',
		5: 'hsl(0, 0%, 90.9%)',
		6: 'hsl(0, 0%, 88.7%)',
		7: 'hsl(0, 0%, 85.8%)',
		8: 'hsl(0, 0%, 78%)',
		9: 'hsl(0, 0%, 56.1%)',
		10: 'hsl(0, 0%, 52.3%)',
		11: 'hsl(0, 0%, 43.5%)',
		12: 'hsl(0, 0%, 9%)',
	},

	blue: {
		1: 'hsl(206, 100%, 99.2%)',
		2: 'hsl(210, 100%, 98%)',
		3: 'hsl(209, 100%, 96.5%)',
		4: 'hsl(210, 98.8%, 94%)',
		5: 'hsl(209, 95%, 90.1%)',
		6: 'hsl(209, 81.2%, 84.5%)',
		7: 'hsl(208, 77.5%, 76.9%)',
		8: 'hsl(206, 81.9%, 65.3%)',
		9: 'hsl(206, 100%, 50%)',
		10: 'hsl(208, 100%, 47.3%)',
		11: 'hsl(211, 100%, 43.2%)',
		12: 'hsl(211, 100%, 15%)',
	},

	green: {
		1: 'hsl(136, 50%, 98.9%)',
		2: 'hsl(138, 62.5%, 96.9%)',
		3: 'hsl(139, 55.2%, 94.5%)',
		4: 'hsl(140, 48.7%, 91%)',
		5: 'hsl(141, 43.7%, 86%)',
		6: 'hsl(143, 40.3%, 79%)',
		7: 'hsl(146, 38.5%, 69%)',
		8: 'hsl(151, 40.2%, 54.1%)',
		9: 'hsl(151, 55%, 41.5%)',
		10: 'hsl(152, 57.5%, 37.6%)',
		11: 'hsl(153, 67%, 28.5%)',
		12: 'hsl(155, 40%, 14%)',
	},

	red: {
		1: 'hsl(359, 100%, 99.4%)',
		2: 'hsl(359, 100%, 98.6%)',
		3: 'hsl(360, 100%, 96.8%)',
		4: 'hsl(360, 97.9%, 94.8%)',
		5: 'hsl(360, 90.2%, 91.9%)',
		6: 'hsl(360, 81.7%, 87.8%)',
		7: 'hsl(359, 74.2%, 81.7%)',
		8: 'hsl(359, 69.5%, 74.3%)',
		9: 'hsl(358, 75%, 59%)',
		10: 'hsl(358, 69.4%, 55.2%)',
		11: 'hsl(358, 65%, 48.7%)',
		12: 'hsl(354, 50%, 14.6%)',
	},
};

const spacing = {
	'0': '0px',
	'2': '2px',
	'4': '4px',
	'6': '6px',
	'8': '8px',
	'12': '12px',
	'16': '16px',
	'20': '20px',
	'24': '24px',
	'28': '28px',
	'32': '32px',
	'36': '36px',
	'40': '40px',
	'44': '44px',
	'48': '48px',
	'64': '64px',
	'76': '76px',
	'88': '88px',
	'100': '100px',
	'128': '128px',
	'256': '256px',
	'384': '384px',
	'512': '512px',
	'768': '768px',
	'1024': '1024px',
	'1440': '1440px',
	'1/3': '33.3%',
	half: '50%',
	full: '100%',
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
	spacing,
	fontSize,
	fontWeight,
};
