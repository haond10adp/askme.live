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
	<input type="hidden" name="isDouble" checked={topic.isDouble} hidden />

	<div>
		<span></span>
		<div class="bt-group">
			<button
				onclick={(event) => {
					event.preventDefault();
					const answerInput = document.getElementsByClassName('answer')[0] as HTMLInputElement;
					answerInput.focus();
					if (index < topic.interviewQuestions!.length - 1) {
						index++;
						answer = '';
						moreDetail = '';
						hidden = true;
					} else {
						index = 0;
					}
				}}
				>Skip
			</button>
			<span class="number">{index + 1}/{topic.interviewQuestions.length}</span>
		</div>
	</div>
	<div>
		<span>Question</span>
		{#key index}
			<span class="question" in:typewriter={{ speed: 5 }}>{topic.interviewQuestions[index]}</span>
		{/key}
		<input type="hidden" name="question" value={topic.interviewQuestions[index]} />
	</div>
	{#if form?.errors?.question}
		{#each form?.errors.question as error}
			<div class="error" class:hidden>
				<span></span>
				<p class="error">{error}</p>
			</div>
		{/each}
	{/if}
	<label>
		<span>Answer</span>
		<input type="text" name="answer" id="answer" class="answer" bind:value={answer} size="40" />
	</label>
	{#if form?.errors?.answer}
		{#each form?.errors.answer as error}
			<div class="error" class:hidden>
				<span></span>
				<p class="error">{error}</p>
			</div>
		{/each}
	{/if}
	<label>
		<span class="detail">More detail</span>
		<TextArea name="moreDetail" bind:value={moreDetail} minRows={3} maxRows={10} />
	</label>
	{#if form?.errors?.moreDetail}
		{#each form?.errors.moreDetail as error}
			<div class="error" class:hidden>
				<span></span>
				<p class="error">{error}</p>
			</div>
		{/each}
	{/if}
	<div>
		<span></span>
		<div class="bt-group">
			<button
				type="submit"
				onclick={() => {
					hidden = false;
				}}>Save</button
			>
		</div>
	</div>
</form>

<style>
	form {
		display: table;
	}

	form label,
	form > div {
		display: table-row;
	}

	form span,
	form input,
	form .bt-group {
		display: table-cell;
		margin-bottom: 6px;
	}

	form input {
		width: 94%;
	}

	form input,
	form .bt-group,
	form p,
	form .question {
		margin-left: 12px;
	}
	form .question {
		display: inline-block;
		font-weight: bold;
	}
	form .number {
		display: inline;
	}

	form p {
		margin-bottom: 10px;
	}

	form .bt-group {
		padding-left: 12px;
		padding-top: 10px;
		padding-bottom: 4px;
	}

	.detail {
		width: 5ch;
	}

	button[type='submit'] {
		margin-bottom: 10px;
		display: block;
		margin-top: -10px;
	}

	input {
		font-family: 'Pacifico', cursive;
		font-size: 20px;
	}
</style>
