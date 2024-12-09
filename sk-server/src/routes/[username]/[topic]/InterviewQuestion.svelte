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
				<div class="error" class:hidden>
					<span></span>
					<p class="error">{error}</p>
				</div>
			{/each}
		{/if}
		<label>
			<span>Answer</span>
			<input type="text" name="answer" use:init value={answer} size="50" />
		</label>
		{#if errors?.answer}
			{#each errors.answer as error}
				<div class="error" class:hidden>
					<span></span>
					<p class="error">{error}</p>
				</div>
			{/each}
		{/if}
		<label>
			<span class="detail">More detail</span>
			<div class="textarea error">
				<TextArea
					name="moreDetail"
					value={form?.moreDetail ?? moreDetail}
					minRows={3}
					maxRows={10}
				/>
			</div>
		</label>
		{#if errors?.moreDetail}
			{#each errors.moreDetail as error}
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
				<button
					onclick={() => {
						isEditing = false;
					}}>Cancel</button
				>
			</div>
		</div>
	</form>
{:else}
	<p>
		{form?.question ?? question}
	</p>

	{#if data.user?.username == data.pathUser?.username}
		<div class="indent">
			<p>{form?.answer ?? answer}</p>
			<p>{form?.moreDetail ?? moreDetail}</p>
			<button
				onclick={() => {
					isEditing = true;
					errors = undefined;
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
		</div>
	{/if}
{/if}

<style>
	form.remove {
		display: inline-block;
	}

	form {
		display: table;
	}

	form label,
	form > div {
		display: table-row;
	}

	form span,
	form input,
	form .bt-group,
	form .textarea {
		display: table-cell;
		margin-bottom: 6px;
	}

	form input,
	form .textarea {
		width: 96%;
	}

	.textarea {
		margin-left: 1em;
	}

	form input,
	form .bt-group,
	form p {
		margin-left: 12px;
	}

	form p {
		margin-bottom: 10px;
	}

	form .bt-group {
		padding-left: 12px;
		padding-bottom: 14px;
	}
	.detail {
		width: 5ch;
	}

	input[name='answer'] {
		font-family: 'Pacifico', cursive;
		font-size: 20px;
	}
</style>
