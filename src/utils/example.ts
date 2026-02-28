/**
 * Clamp a number between a minimum and maximum value.
 */
export function clamp(value: number, min: number, max: number): number {
	if (min > max) {
		throw new RangeError(`clamp: min (${min}) must be less than or equal to max (${max})`);
	}
	return Math.min(Math.max(value, min), max);
}

/**
 * Convert a string to a URL-friendly slug.
 */
export function slugify(text: string): string {
	return text
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, '')
		.replace(/[\s_]+/g, '-')
		.replace(/-+/g, '-');
}
