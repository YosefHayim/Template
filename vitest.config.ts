import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	resolve: {
		alias: {
			'@': resolve(__dirname, './src'),
		},
	},
	test: {
		globals: true,
		environment: 'node',
		include: ['src/**/*.{test,spec}.{ts,tsx}', 'tests/**/*.{test,spec}.{ts,tsx}'],
		exclude: ['node_modules', 'dist', '.taskmaster'],
		coverage: {
			provider: 'v8',
			reporter: ['text', 'text-summary', 'lcov', 'html'],
			reportsDirectory: './coverage',
			include: ['src/**/*.{ts,tsx}'],
			exclude: [
				'src/**/*.{test,spec}.{ts,tsx}',
				'src/**/*.d.ts',
				'src/**/types.ts',
				'src/**/index.ts',
			],
			thresholds: {
				statements: 70,
				branches: 70,
				functions: 70,
				lines: 70,
			},
		},
		setupFiles: ['./tests/setup.ts'],
		testTimeout: 10000,
	},
});
