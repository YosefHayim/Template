import { createWriteStream } from 'node:fs';
import { resolve } from 'node:path';
import type { WizardState } from '@wizard/types.js';
import { generateConfigContent, generateExampleContent } from '@wizard/utils/file-generation.js';
import { runValidationTests } from '@wizard/utils/validation.js';
import prompts from 'prompts';

export async function stepGenerateFiles(state: WizardState): Promise<void> {
	const response = await prompts({
		type: 'multiselect',
		name: 'generate',
		message: 'Generate configuration files:',
		choices: [
			{ title: 'Yes, generate files', value: 'yes' },
			{ title: 'No, exit without generating', value: 'no' },
		],
		instructions: false,
		hint: 'Space to select, Enter to submit',
		onState: (state: any) => {
			if (state.aborted) throw new Error('Aborted');
		},
	});

	if (!response.generate.includes('yes')) {
		process.exit(0);
	}

	await generateFiles(state);

	// Run validation tests after file generation
	await runValidationTests();
}

async function generateFiles(state: WizardState): Promise<void> {
	const configContent = generateConfigContent(state);
	const exampleContent = generateExampleContent(state);

	const configPath = resolve(process.cwd(), 'billing-config.ts');
	const examplePath = resolve(process.cwd(), 'example.ts');

	// Write config file
	const configStream = createWriteStream(configPath);
	configStream.write(configContent);
	configStream.end();

	// Write example file
	const exampleStream = createWriteStream(examplePath);
	exampleStream.write(exampleContent);
	exampleStream.end();

	// Wait for both streams to finish
	await Promise.all([
		new Promise<void>((resolve) => configStream.on('finish', resolve)),
		new Promise<void>((resolve) => exampleStream.on('finish', resolve)),
	]);
}
