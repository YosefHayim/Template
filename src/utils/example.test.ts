import { describe, expect, it } from 'vitest';
import { clamp, slugify } from '@/utils/example';

describe('clamp', () => {
	it('returns value when within range', () => {
		expect(clamp(5, 0, 10)).toBe(5);
	});

	it('clamps to min when below range', () => {
		expect(clamp(-5, 0, 10)).toBe(0);
	});

	it('clamps to max when above range', () => {
		expect(clamp(15, 0, 10)).toBe(10);
	});

	it('handles equal min and max', () => {
		expect(clamp(5, 3, 3)).toBe(3);
	});

	it('throws when min > max', () => {
		expect(() => clamp(5, 10, 0)).toThrow(RangeError);
	});
});

describe('slugify', () => {
	it('converts to lowercase with hyphens', () => {
		expect(slugify('Hello World')).toBe('hello-world');
	});

	it('removes special characters', () => {
		expect(slugify('Hello, World!')).toBe('hello-world');
	});

	it('collapses multiple hyphens', () => {
		expect(slugify('foo---bar')).toBe('foo-bar');
	});

	it('trims whitespace', () => {
		expect(slugify('  hello  ')).toBe('hello');
	});

	it('handles empty string', () => {
		expect(slugify('')).toBe('');
	});
});
