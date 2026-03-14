import type { PromptState, WizardState } from '@wizard/types.js';
import prompts from 'prompts';

export async function stepWebhookSetup(state: WizardState): Promise<void> {
	const response = await prompts({
		type: 'multiselect',
		name: 'webhook',
		message: 'Create webhook endpoint:',
		choices: [
			{ title: 'Yes, create webhook', value: 'yes' },
			{ title: 'No, skip webhook setup', value: 'no' },
		],
		instructions: false,
		hint: 'Space to select, Enter to submit',
		onState: (state: PromptState) => {
			if (state.aborted) throw new Error('Aborted');
		},
	});

	if (!response.webhook.includes('yes')) {
		return;
	}
	const urlResponse = await prompts({
		type: 'text',
		name: 'url',
		message: 'Webhook URL:',
		initial: 'https://your-domain.com/webhook',
		validate: (value: string) => value.length > 0 || 'URL is required',
		onState: (state: PromptState) => {
			if (state.aborted) throw new Error('Aborted');
		},
	});

	state.webhookUrl = urlResponse.url;
	const eventsResponse = await prompts({
		type: 'multiselect',
		name: 'events',
		message: 'Select webhook events:',
		choices: [
			{ title: 'Order Created', value: 'order_created' },
			{ title: 'Order Refunded', value: 'order_refunded' },
			{ title: 'Subscription Created', value: 'subscription_created' },
			{ title: 'Subscription Updated', value: 'subscription_updated' },
			{ title: 'Subscription Cancelled', value: 'subscription_cancelled' },
			{ title: 'Payment Failed', value: 'subscription_payment_failed' },
			{ title: 'License Key Created', value: 'license_key_created' },
			{ title: 'License Key Updated', value: 'license_key_updated' },
		],
		instructions: false,
		hint: 'Space to select, Enter to submit',
		onState: (state: PromptState) => {
			if (state.aborted) throw new Error('Aborted');
		},
	});

	state.webhookEvents = eventsResponse.events;
}
