<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SpeechEdit, SpeechEditError } from '$lib/forms';
	import { init } from '$lib/utils';
	import TextArea from '$lib/components/TextAreaAutosize.svelte';
	import type { PageData } from './$types';

	interface MyProps {
		data: PageData;
		form?: SpeechEdit;
		errors?: SpeechEditError;
		id: string;
		title: string;
		ideas: string[];
		note: string;
	}

	let { data, form, errors, id, title, ideas, note }: MyProps = $props();

	let isEditing = $state(false);
	let hidden = $state(false);
</script>

<p class="title">{title}</p>
<p>You should say:</p>
<ul>
	{#each ideas as idea}
		<li>{idea}</li>
	{/each}
</ul>
{#if isEditing}
	<form
		action="?/editSpeech"
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
			<TextArea name="note" value={form?.note ?? note} minRows={3} maxRows={10}></TextArea>
		</label>
		{#if errors?.note}
			{#each errors.note as error}
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
{:else if data.user?.username == data.pathUser?.username}
	<div class="indent">
		<p>{form?.note ?? note}</p>
		<button
			onclick={() => {
				isEditing = true;
				errors = undefined;
			}}>Edit</button
		>
		<form class="remove" action="?/removeSpeech" method="post" use:enhance>
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

<style>
	form.remove {
		display: inline-block;
	}

	ul {
		padding-left: 2em;
	}

	ul li:last-of-type {
		margin-left: -2em;
	}
	p.title {
		font-weight: bold;
	}
	p {
		white-space: pre-line;
	}
</style>
