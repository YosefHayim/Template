import perfectionist from 'eslint-plugin-perfectionist';
import unusedImports from 'eslint-plugin-unused-imports';

export default [
	{
		plugins: {
			perfectionist,
			'unused-imports': unusedImports,
		},
		rules: {
			// ── Perfectionist: alphabetically sort interface members ──────────────
			'perfectionist/sort-interfaces': [
				'error',
				{
					type: 'alphabetical',
					order: 'asc',
					ignoreCase: true,
				},
			],

			// ── Unused imports: auto-remove unused imports and declarations ────────
			'@typescript-eslint/no-unused-vars': 'off',
			'unused-imports/no-unused-imports': 'error',
			'unused-imports/no-unused-vars': [
				'warn',
				{
					vars: 'all',
					varsIgnorePattern: '^_',
					args: 'after-used',
					argsIgnorePattern: '^_',
				},
			],
		},
	},
];
