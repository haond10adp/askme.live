<script lang="ts">
	import { enhance } from '$app/forms';
	import type { InterviewEdit, InterviewError } from '$lib/forms';
	import { init } from '$lib/utils';
	import TextArea from '$lib/components/TextAreaAutosize.svelte';
	import type { PageData } from './$types';

	interface MyProps {
		data: PageData;
		form?: InterviewEdit;
		errors?: InterviewError;
		id: string;
		question: string;
		answer: string;
		moreDetail: string;
	}
	let { data, form, errors, id, question, answer, moreDetail }: MyProps = $props();

	let isEditing = $state(false);
	let hidden = $state(false);
</script>

{#if isEditing}
	<form
		action="?/editInterview"
		method="post"
		use:enhance={() => {
			return async ({ result, update }) => {
				if (result.type == 'success') isEditing = false;
				await update();
			};
		}}
	>
		<input type="hidden" name="id" value={form?.id ?? id} />
		<label>
			<span>Question</span>
			<input
				type="text"
				name="question"
				value={form?.question ?? question}
				size={question.length}
			/>
		</label>
		{#if errors?.question}
			{#each errors.question as error}
				<p class="error" class:hidden>{error}</p>
			{/each}
		{/if}
		<label>
			<span>Answer</span>
			<input type="text" name="answer" use:init value={answer} size="50" />
		</label>
		{#if errors?.answer}
			{#each errors.answer as error}
				<p class="error" class:hidden>{error}</p>
			{/each}
		{/if}
		<label>
			<span>More detail</span>
			<!-- <textarea name="moreDetail">{form?.moreDetail ?? moreDetail}</textarea> -->
			<TextArea name="moreDetail" value={form?.moreDetail ?? moreDetail} minRows={3} maxRows={10} />
		</label>
		{#if errors?.moreDetail}
			{#each errors.moreDetail as error}
				<p class="error" class:hidden>{error}</p>
			{/each}
		{/if}
		<button
			type="submit"
			onclick={() => {
				hidden = false;
			}}>Save</button
		>
		<button
			onclick={() => {
				isEditing = false;
			}}>Cancel</button
		>
	</form>
{:else}
	<p>{form?.question ?? question}</p>

	{#if data.user?.username == data.pathUser?.username}
		<p>{form?.answer ?? answer}</p>
		<p>{form?.moreDetail ?? moreDetail}</p>
		<button
			onclick={() => {
				isEditing = true;
				hidden = true;
			}}>Edit</button
		>
		<form class="remove" action="?/removeInterview" method="post" use:enhance>
			<input type="hidden" name="id" value={id} />
			<button
				onclick={(e) => {
					const result = confirm('Are you sure you want to delete?');
					if (!result) e.preventDefault();
				}}>Remove</button
			>
		</form>
	{/if}
{/if}

<style>
	form.remove {
		display: inline-block;
	}
</style>
