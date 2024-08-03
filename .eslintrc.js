export default {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier'],
	parserOptions: {
		project: './tsconfig.eslint.json',
		tsconfigRootDir: __dirname,
	},
	plugins: ['react', '@typescript-eslint', 'react-hooks', 'jsx-a11y'],
	rules: {
		indent: [
			'warn',
			'tab',
			{ SwitchCase: 1, ignoredNodes: ['TemplateLiteral *'] },
		],
		semi: ['error', 'always'],
		quotes: ['error', 'single'],
		'comma-dangle': ['error', 'always-multiline'],
		'object-curly-spacing': ['error', 'always'],
		'arrow-parens': ['error', 'always'],
		'no-unused-vars': 'warn',
		'react/jsx-uses-react': 'off',
		'react/react-in-jsx-scope': 'off',
		'react/jsx-no-useless-fragment': ['error', { allowAsChild: false }],
		overrides: [
			{
				files: ['*.ts', '*.tsx'],
				rules: {
					'no-undef': 'off',
				},
			},
		],
	},
};
