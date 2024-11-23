<script lang="ts">
	import { enhance } from '$app/forms';
	import { init } from '$lib/utils';
	import type { ActionData } from './$types';
	let { form }: { form: ActionData } = $props();
</script>

<h1>Log in</h1>
<form method="post" use:enhance>
	<label>
		<span>Username</span>
		<input type="text" name="username" use:init class:input-error={form?.errors?.username} />
	</label>
	{#if form?.errors?.username}
		{#each form.errors.username as error}
			<p class="error">{error}</p>
		{/each}
	{/if}
	{#if form?.usernameError}
		<p class="error">{form.usernameError}</p>
	{/if}
	<label>
		<span>Password</span>
		<input type="password" name="password" class:input-error={form?.errors?.password} />
	</label>
	{#if form?.errors?.password}
		{#each form.errors.password as error}
			<p class="error">{error}</p>
		{/each}
	{/if}
	{#if form?.passwordError}
		<p class="error">{form.passwordError}</p>
	{/if}
	<button type="submit">Submit</button>
</form>

<style>
</style>
