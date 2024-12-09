<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SpeechCreate } from '$lib/forms';
	import type { Topic } from '$lib/Topic';
	import { typewriter } from '$lib/transition';
	import { toast } from '@zerodevx/svelte-toast';
	import TextArea from '$lib/components/TextAreaAutosize.svelte';

	interface MyProps {
		topic: Topic;
		form?: SpeechCreate;
		index: number;
		hidden: boolean;
	}
	let { topic, form, index = $bindable(), hidden = $bindable() }: MyProps = $props();
	let speeches = $derived(topic.speeches);
	let note = $state(form?.note ?? '');
</script>

<form
	action="?/newSpeech"
	method="post"
	use:enhance={() => {
		return async ({ result, update }) => {
			if (result.type == 'success') {
				toast.push('Speech added', {
					theme: {
						'--toastColor': 'mintcream',
						'--toastBackground': 'rgba(72,187,120,0.9)',
						'--toastBarBackground': '#2F855A'
					}
				});
				if (index < topic.speeches.length - 1) {
					index++;
				} else {
					index = 0;
				}
			}
			await update();
		};
	}}
>
	<input type="hidden" name="topicName" value={topic.name} />
	<input type="checkbox" name="isDouble" checked={topic.isDouble} hidden />
	<div>
		<button
			onclick={(event) => {
				event.preventDefault();
				if (index < speeches.length - 1) {
					index++;
					note = '';
					hidden = true;
				} else {
					index = 0;
				}
			}}
			>Skip
		</button>
		<span>{index + 1}/{topic.speeches.length}</span>
	</div>
	<label>
		<p>
			{#key index}
				<span in:typewriter={{ speed: 5 }}>{speeches[index].title}</span>
			{/key}
		</p>
		<input type="hidden" name="title" value={speeches[index].title} />
	</label>
	<p>You should say:</p>
	<label>
		<ul>
			{#each speeches[index].ideas as idea, i}
				<li>{idea}</li>
				<input type="hidden" name={`idea${i}`} value={idea} />
			{/each}
		</ul>
	</label>
	<label>
		<span></span>
		<TextArea name="note" bind:value={note} minRows={4} maxRows={10} />
	</label>
	{#if form?.errors?.note}
		{#each form?.errors.note as error}
			<p class="error" class:hidden>{error}</p>
		{/each}
	{/if}

	<button
		type="submit"
		onclick={() => {
			hidden = false;
			if (index > speeches.length) {
				index = 0;
			}
		}}>Save</button
	>
</form>

<style>
	ul {
		padding-left: 2em;
	}

	ul li:last-of-type {
		margin-left: -2em;
	}
	label p span {
		font-weight: bold;
	}
</style>
