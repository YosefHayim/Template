// Environment variable validation
//
// Validates required environment variables at startup.
// Add your env vars below. This prevents runtime errors from missing config.
//
// Usage:
//   import { env } from '@/env';
//   console.log(env.DATABASE_URL);
//
// For stronger validation, consider using a schema library like Zod:
//   import { z } from 'zod';
//   const envSchema = z.object({ DATABASE_URL: z.string().url() });
//   export const env = envSchema.parse(process.env);

function getEnvVar(name: string, required = true): string {
	const value = process.env[name];
	if (required && !value) {
		throw new Error(`Missing required environment variable: ${name}`);
	}
	return value ?? '';
}

export const env = {
	NODE_ENV: getEnvVar('NODE_ENV', false) || 'development',
	// Add your environment variables here:
	// DATABASE_URL: getEnvVar('DATABASE_URL'),
	// API_KEY: getEnvVar('API_KEY'),
} as const;
