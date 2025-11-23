<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
	import CopyableText from './CopyableText.svelte';
	import type { Address } from 'viem';

	interface Props {
		totalBalance: string;
		metakeyValue: string | null;
		connectedAddress: Address | null;
		onBack?: () => void;
	}

	let { totalBalance, metakeyValue, connectedAddress, onBack }: Props = $props();

	let copiedIndex = $state(-1);

	function handleCopy(index: number) {
		copiedIndex = index;
		setTimeout(() => {
			copiedIndex = -1;
		}, 2000);
	}
</script>

<Card>
	<CardHeader>
		<CardTitle>Your Balance</CardTitle>
		<CardDescription>
			Total balance across all your addresses
		</CardDescription>
	</CardHeader>
	<CardContent class="space-y-6">
		<!-- Total Balance -->
		<div
			class="p-6 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg border border-primary/20"
		>
			<p class="text-sm text-muted-foreground mb-2">Total Balance</p>
			<p class="text-4xl font-bold">{totalBalance} ETH</p>
		</div>

		<!-- MetaKey Display -->
		{#if metakeyValue}
			<CopyableText
				label="Your MetaKey"
				text={metakeyValue}
				isCopied={copiedIndex === 0}
				onCopy={() => handleCopy(0)}
			/>
			<p class="text-xs text-muted-foreground">
				Share this MetaKey with others to receive payments securely.
			</p>
		{/if}

		<!-- Connected Address -->
		{#if connectedAddress}
			<CopyableText
				label="Your Address"
				text={connectedAddress}
				isCopied={copiedIndex === 1}
				onCopy={() => handleCopy(1)}
			/>
		{/if}

		<Button class="w-full" onclick={onBack}>Back to Home</Button>
	</CardContent>
</Card>
