/**
 * Copy text to clipboard and provide visual feedback
 * @param text Text to copy
 * @param onCopied Callback when copied (called immediately)
 * @param duration How long to show copied state (ms)
 */
export async function copyToClipboard(
	text: string,
	onCopied?: () => void,
	duration: number = 2000
): Promise<void> {
	try {
		await navigator.clipboard.writeText(text);
		onCopied?.();

		// Reset after duration (caller should handle state)
		await new Promise((resolve) => setTimeout(resolve, duration));
	} catch (err) {
		console.error('Failed to copy to clipboard:', err);
		throw err;
	}
}

/**
 * Truncate address for display while keeping start and end visible
 * @param address Full address
 * @param startChars Number of chars to show at start (default 6)
 * @param endChars Number of chars to show at end (default 4)
 */
export function truncateAddress(
	address: string,
	startChars: number = 6,
	endChars: number = 4
): string {
	if (address.length <= startChars + endChars) return address;
	return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
}

/**
 * Get step number display text
 */
export function getStepNumber(step: string): number {
	const stepMap: Record<string, number> = {
		search: 1,
		'wallet-select': 1,
		amount: 2,
		confirm: 3,
		'create-metakey': 2,
		display: 3,
	};
	return stepMap[step] || 1;
}
