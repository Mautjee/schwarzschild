import { writable } from 'svelte/store';

function createWalletModal() {
	const { subscribe, set } = writable<boolean>(false);

	return {
		subscribe,
		open: () => set(true),
		close: () => set(false),
		toggle: () => {
			let isOpen = false;
			const unsubscribe = subscribe((value) => {
				isOpen = value;
			});
			unsubscribe();
			set(!isOpen);
		},
	};
}

export const walletModal = createWalletModal();
