import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('env', () => {
	beforeEach(() => {
		vi.resetModules();
	});

	afterEach(() => {
		vi.unstubAllEnvs();
	});

	describe('NODE_ENV', () => {
		it('returns "test" in the default vitest environment', async () => {
			const { env } = await import('@/env');
			expect(env.NODE_ENV).toBe('test');
		});

		it('returns "development" when NODE_ENV is development', async () => {
			vi.stubEnv('NODE_ENV', 'development');
			const { env } = await import('@/env');
			expect(env.NODE_ENV).toBe('development');
		});

		it('returns "production" when NODE_ENV is production', async () => {
			vi.stubEnv('NODE_ENV', 'production');
			const { env } = await import('@/env');
			expect(env.NODE_ENV).toBe('production');
		});

		it('defaults to "development" when NODE_ENV is empty', async () => {
			vi.stubEnv('NODE_ENV', '');
			const { env } = await import('@/env');
			expect(env.NODE_ENV).toBe('development');
		});

		it('throws for an invalid NODE_ENV value', async () => {
			vi.stubEnv('NODE_ENV', 'staging');
			await expect(import('@/env')).rejects.toThrow('Invalid NODE_ENV: "staging"');
		});
	});
});
