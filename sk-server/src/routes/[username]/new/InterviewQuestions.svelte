<script lang="ts">
	import { enhance } from '$app/forms';
	import type { InterviewCreate } from '$lib/forms';
	import type { Topic } from '$lib/Topic';
	import type { PageData } from './$types';
	import { toast } from '@zerodevx/svelte-toast';
	import TextArea from '$lib/components/TextAreaAutosize.svelte';
	import { typewriter } from '$lib/transition';

	interface MyProps {
		data: PageData;
		topic: Topic;
		form?: InterviewCreate;
		index: number;
		hidden: boolean;
	}

	let { index = $bindable(), hidden = $bindable(), topic, form }: MyProps = $props();

	let answer = $state(form?.answer ?? '');
	let moreDetail = $state(form?.moreDetail ?? '');
</script>

<form
	action="?/newInterviewQuestion"
	method="post"
	use:enhance={() => {
		return async ({ result, update }) => {
			if (result.type == 'success') {
				toast.push('Interview Question added', {
					theme: {
						'--toastColor': 'mintcream',
						'--toastBackground': 'rgba(72,187,120,0.9)',
						'--toastBarBackground': '#2F855A'
					}
				});
				if (index < topic.interviewQuestions.length - 1) {
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

	<button
		onclick={(event) => {
			event.preventDefault();
			document.getElementById('answer')?.focus();
			if (index < topic.interviewQuestions!.length - 1) {
				index++;
				answer = '';
				moreDetail = '';
				hidden = true;
			} else {
				index = 0;
			}
		}}>Skip</button
	>
	<label>
		<p>
			Question {index + 1}/{topic.interviewQuestions.length}:
			{#key index}
				<span in:typewriter={{ speed: 5 }}>{topic.interviewQuestions[index]}</span>
			{/key}
		</p>
		<input type="hidden" name="question" value={topic.interviewQuestions[index]} />
	</label>
	{#if form?.errors?.question}
		{#each form?.errors.question as error}
			<p class="error" class:hidden>{error}</p>
		{/each}
	{/if}
	<label>
		<span>Answer</span>
		<input type="text" name="answer" id="answer" bind:value={answer} size="40" />
	</label>
	{#if form?.errors?.answer}
		{#each form?.errors.answer as error}
			<p class="error" class:hidden>{error}</p>
		{/each}
	{/if}
	<label>
		<span>More detail</span>
		<TextArea name="moreDetail" bind:value={moreDetail} minRows={3} maxRows={10} />
	</label>
	<br />
	{#if form?.errors?.moreDetail}
		{#each form?.errors.moreDetail as error}
			<p class="error" class:hidden>{error}</p>
		{/each}
	{/if}

	<button
		type="submit"
		onclick={() => {
			hidden = false;
		}}>Save</button
	>
</form>

<style>
	form {
		margin-top: 1em;
	}
</style>
