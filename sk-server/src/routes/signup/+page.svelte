<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	let { form }: { form: ActionData } = $props();
</script>

<h1>Sign up</h1>
<form method="post" use:enhance>
	<label>
		<span>Username</span>
		<input
			type="text"
			name="username"
			value={form?.username ?? ''}
			class:input-error={form?.errors?.username}
		/>
	</label>
	{#if form?.errors?.username}
		{#each form.errors.username as error}
			<p class="error">{error}</p>
		{/each}
	{/if}
	{#if form?.userError}
		<p class="error">{form.userError}</p>
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
	<label>
		<span>Nickname </span>
		<input
			type="text"
			name="nickname"
			value={form?.nickname ?? ''}
			class:input-error={form?.errors?.nickname}
		/>
	</label>
	{#if form?.errors?.nickname}
		{#each form.errors.nickname as error}
			<p class="error">{error}</p>
		{/each}
	{/if}
	<label>
		<span>Gender</span>
		<select name="gender" value={form?.gender ?? ''}>
			<option value="">--Choose gender--</option>
			<option value="male">Male</option>
			<option value="female">Female</option>
			<option value="non-binary">Non-binary</option>
		</select>
	</label>
	{#if form?.errors?.gender}
		{#each form.errors.gender as error}
			<p class="error">{error}</p>
		{/each}
	{/if}
	<button type="submit">Submit</button>
</form>
