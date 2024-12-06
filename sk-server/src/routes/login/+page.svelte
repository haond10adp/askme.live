<script lang="ts">
	import { enhance } from '$app/forms';
	import { init } from '$lib/utils';
	import type { ActionData } from './$types';
	let { form }: { form: ActionData } = $props();
</script>

<h2>Log in</h2>
<form method="post" use:enhance>
	<label>
		<span>Username</span>
		<input type="text" name="username" use:init class:input-error={form?.errors?.username} />
	</label>
	{#if form?.errors?.username}
		{#each form.errors.username as error}
			<div class="error">
				<span></span>
				<p class="error">{error}</p>
			</div>
		{/each}
	{/if}
	{#if form?.usernameError}
		<div class="error">
			<span></span>
			<p class="error">{form.usernameError}</p>
		</div>
	{/if}
	<label>
		<span>Password</span>
		<input type="password" name="password" class:input-error={form?.errors?.password} />
	</label>
	{#if form?.errors?.password}
		{#each form.errors.password as error}
			<div class="error">
				<span></span>
				<p class="error">{error}</p>
			</div>
		{/each}
	{/if}
	{#if form?.passwordError}
		<div class="error">
			<span></span>
			<p class="error">{form.passwordError}</p>
		</div>
	{/if}
	<div>
		<span></span>
		<div class="bt-group">
			<button type="submit">Log in</button>
		</div>
	</div>
</form>

<style>
	h2 {
		margin-top: 32px;
		display: flex;
		align-items: baseline;
		margin-bottom: 10px;
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
	form .bt-group {
		display: table-cell;
		margin-bottom: 6px;
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
	}
</style>
