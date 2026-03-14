import type { PromptState, WizardState } from '@wizard/types.js';
import prompts from 'prompts';

export async function stepConfiguration(state: WizardState): Promise<void> {
	const cacheResponse = await prompts({
		type: 'text',
		name: 'cachePath',
		message: 'Cache file path:',
		initial: state.cachePath,
		onState: (state: PromptState) => {
			if (state.aborted) throw new Error('Aborted');
		},
	});

	state.cachePath = cacheResponse.cachePath || state.cachePath;
	const secretResponse = await prompts({
		type: 'text',
		name: 'webhookSecret',
		message: 'Webhook secret:',
		initial: state.webhookSecret,
		onState: (state: PromptState) => {
			if (state.aborted) throw new Error('Aborted');
		},
	});

	state.webhookSecret = secretResponse.webhookSecret || state.webhookSecret;
	const loggerResponse = await prompts({
		type: 'text',
		name: 'loggerPath',
		message: 'Logger file path:',
		initial: state.loggerPath,
		onState: (state: PromptState) => {
			if (state.aborted) throw new Error('Aborted');
		},
	});

	state.loggerPath = loggerResponse.loggerPath || state.loggerPath;
}
