<script lang="ts">
	import { topics } from './template';

	import InterviewQuestions from './InterviewQuestions.svelte';
	import Speeches from './Speeches.svelte';

	import type { PageData } from './$types';
	import type { InterviewCreate, SpeechCreate, GeneralCreate } from '$lib/forms';
	import GeneralQuestions from './GeneralQuestions.svelte';

	interface MyProps {
		data: PageData;
		form?: {
			interviewCreate: InterviewCreate;
			speechCreate: SpeechCreate;
			generalCreate: GeneralCreate;
		};
	}

	let { data, form }: MyProps = $props();

	let templateTopic = $state('');
	let topic = $derived(topics.find((element) => element.name == templateTopic));
	let templateItems = topics.map((topic) => topic.name);
	let useTemplate = $state(true);

	//bound states
	let indexInterview = $state(0);
	let indexSpeech = $state(0);
	let indexGeneral = $state(0);
	let isErrorHidden = $state(false);
</script>

<label>
	<input type="checkbox" bind:checked={useTemplate} />
	Use template
</label>

{#if useTemplate}
	<form>
		<select
			onchange={(e) => {
				e.currentTarget?.form?.requestSubmit();
				indexInterview = 0;
				indexSpeech = 0;
				isErrorHidden = true;
			}}
			name="topic"
			bind:value={templateTopic}
		>
			<option value="">--Please choose an option--</option>
			{#each templateItems as item}
				<option value={item}>{item}</option>
			{/each}
		</select>
	</form>
	{#if topic}
		<details>
			<summary>Add a new interview question </summary>
			<InterviewQuestions
				{topic}
				form={form?.interviewCreate}
				{data}
				bind:index={indexInterview}
				bind:hidden={isErrorHidden}
			/>
		</details>
		<details>
			<summary>Add a new speech</summary>
			<Speeches
				{topic}
				form={form?.speechCreate}
				bind:index={indexSpeech}
				bind:hidden={isErrorHidden}
			/>
		</details>
		<details>
			<summary>Add a new general question</summary>
			<GeneralQuestions
				{topic}
				{data}
				form={form?.generalCreate}
				bind:index={indexGeneral}
				bind:hidden={isErrorHidden}
			/>
		</details>
	{/if}
{:else}
	<label>
		<span>Title</span>
		<input type="text" name="topic" />
	</label>
	<label>
		<span>Double topic</span>
		<input type="checkbox" name="isDouble" />
	</label>
{/if}

<style>
	summary {
		margin-top: 1em;
		font-size: xx-large;
		text-decoration: underline;
		cursor: pointer;
	}
</style>
