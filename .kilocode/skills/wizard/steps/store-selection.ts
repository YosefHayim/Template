import type { PromptState, WizardState } from '@wizard/types.js';
import prompts from 'prompts';

export async function stepStoreSelection(state: WizardState): Promise<void> {
	if (state.stores.length === 0) {
		return; // This should trigger the API key step again in the main flow
	}
	const response = await prompts({
		type: 'multiselect',
		name: 'stores',
		message: 'Select stores to use:',
		choices: state.stores.map((store) => ({
			title: `${store.name} (${store.id})`,
			value: store.id,
		})),
		instructions: false,
		hint: 'Space to select, Enter to submit',
		onState: (state: PromptState) => {
			if (state.aborted) throw new Error('Aborted');
		},
	});

	state.selectedStoreIds = response.stores;

	if (state.selectedStoreIds.length === 0) {
		return stepStoreSelection(state);
	}
}
