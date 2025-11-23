<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { ArrowLeft } from '@lucide/svelte';

	interface Props {
		title: string;
		subtitle?: string;
		onBack?: () => void;
	}

	let { title, subtitle, onBack }: Props = $props();
</script>

<div class="flex items-center gap-3 mb-8">
	{#if onBack}
		<Button
			onclick={onBack}
			variant="outline"
			size="icon"
			class="rounded-full"
		>
			<ArrowLeft size={18} />
		</Button>
	{/if}
	<div>
		<h1 class="text-3xl font-bold">{title}</h1>
		{#if subtitle}
			<p class="text-muted-foreground text-sm">{subtitle}</p>
		{/if}
	</div>
</div>
