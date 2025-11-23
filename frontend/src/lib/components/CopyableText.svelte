<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Check, Copy } from '@lucide/svelte';

	interface Props {
		label?: string;
		text: string;
		isCopied?: boolean;
		onCopy?: () => void;
	}

	let { label, text, isCopied = false, onCopy }: Props = $props();

	function handleCopy() {
		navigator.clipboard.writeText(text);
		onCopy?.();
	}
</script>

<div class="space-y-3">
	{#if label}
		<p class="text-sm font-medium">{label}</p>
	{/if}
	<div
		class="p-3 bg-card border border-border rounded-md font-mono text-sm break-all flex items-center justify-between"
	>
		<span>{text}</span>
		<Button
			variant="ghost"
			size="sm"
			onclick={handleCopy}
			class="ml-2"
		>
			{#if isCopied}
				<Check size={16} />
			{:else}
				<Copy size={16} />
			{/if}
		</Button>
	</div>
</div>
