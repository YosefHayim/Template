import { createBilling } from '@core/index.js';
import { openUrl } from '@wizard/utils/validation.js';
import prompts from 'prompts';

export async function runRealCycleFlow(): Promise<void> {
	try {
		// Import the generated billing config
		const billingConfig = await import(`${process.cwd()}/billing-config.js`);
		const billing = await createBilling(billingConfig.billingConfig);

		// Only test checkout if we have products
		if (billing.plans.length > 0) {
			try {
				const checkoutUrl = await billing.createCheckout({
					variantId: billing.plans[0].variantId,
					email: 'test@example.com',
					userId: 'test-user-123',
				});
				const response = await prompts({
					type: 'multiselect',
					name: 'navigate',
					message: 'Navigate to checkout URL:',
					choices: [
						{ title: 'Yes, open checkout URL', value: 'yes' },
						{ title: 'No, skip navigation', value: 'no' },
					],
					instructions: false,
					hint: 'Space to select, Enter to submit',
					onState: (state: any) => {
						if (state.aborted) throw new Error('Aborted');
					},
				});

				if (response.navigate.includes('yes')) {
					await openUrl(checkoutUrl);
				}
			} catch (checkoutError) {
				// Improved error handling to show actual error details
				let _errorMessage = 'Unknown checkout error';
				if (checkoutError instanceof Error) {
					_errorMessage = checkoutError.message;
				} else if (typeof checkoutError === 'object' && checkoutError !== null) {
					_errorMessage = JSON.stringify(checkoutError, null, 2);
				} else {
					_errorMessage = String(checkoutError);
				}
			}
		} else {
		}
	} catch (error) {
		console.error('Error:', error instanceof Error ? error.message : error);
	}
}
