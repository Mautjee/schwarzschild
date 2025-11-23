<script lang="ts">
	interface Props {
		currentStep: string;
		steps: string[];
	}

	let { currentStep, steps }: Props = $props();

	function isStepActive(step: string, currentStep: string): boolean {
		const currentIndex = steps.indexOf(currentStep);
		const stepIndex = steps.indexOf(step);
		return stepIndex <= currentIndex;
	}
</script>

<div class="flex gap-2 mb-8">
	{#each steps as step (step)}
		<div
			class={`h-1 flex-1 rounded-full transition-colors ${
				isStepActive(step, currentStep) ? 'bg-primary' : 'bg-muted'
			}`}
		></div>
	{/each}
</div>
