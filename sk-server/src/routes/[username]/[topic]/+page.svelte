<script lang="ts">
	import type { InterviewEdit, SpeechEdit, GeneralEdit } from '$lib/forms';
	import { flip } from 'svelte/animate';
	import InterviewQuestion from './InterviewQuestion.svelte';
	import Speech from './Speech.svelte';
	import GeneralQuestion from './GeneralQuestion.svelte';
	import type { PageData } from './$types';

	interface MyProps {
		data: PageData;
		form?: {
			interview: InterviewEdit;
			speech: SpeechEdit;
			general: GeneralEdit;
		};
	}

	let { data, form }: MyProps = $props();
	let currentInterview = form?.interview;
	let currentInterviewErrors = $derived(form?.interview?.errors);
	let currentSpeech = form?.speech;
	let currentSpeechErrors = $derived(form?.speech?.errors);
	let currentGeneral = form?.general;
	let currentGeneralErrors = $derived(form?.general?.errors);
</script>

<h2>{data.topic?.name}</h2>

<h3>Interview Questions</h3>
<ul>
	{#each data.topic.interviewQuestions as { id, question, answer, moreDetail } (id)}
		<li animate:flip={{ duration: 500 }}>
			<InterviewQuestion
				{data}
				form={currentInterview}
				errors={currentInterviewErrors}
				{id}
				{question}
				{answer}
				{moreDetail}
			/>
		</li>
	{/each}
</ul>

<h3>Speeches</h3>
<ul>
	{#each data.topic.speeches as { id, title, ideas, note } (id)}
		<li animate:flip={{ duration: 500 }}>
			<Speech
				{data}
				form={currentSpeech}
				errors={currentSpeechErrors}
				{id}
				{title}
				{ideas}
				{note}
			/>
		</li>
	{/each}
</ul>

<h3>General Questions</h3>
<ul>
	{#each data.topic.generalQuestions as { id, question, answer, moreDetail } (id)}
		<li animate:flip={{ duration: 500 }}>
			<GeneralQuestion
				{data}
				form={currentGeneral}
				errors={currentGeneralErrors}
				{id}
				{question}
				{answer}
				{moreDetail}
			/>
		</li>
	{/each}
</ul>

<style>
	h2 {
		margin-top: 32px;
	}
	h3 {
		margin-top: 16px;
	}
</style>
