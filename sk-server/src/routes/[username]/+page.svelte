<script lang="ts">
	import { enhance } from '$app/forms';
	import { init } from '$lib/utils';

	let { data, form } = $props();
	let { user, pathUser } = data;
	let isUserInfoEditing = $state(false);
</script>

<h2>User Info</h2>
{#if user?.username == pathUser.username}
	<button onclick={() => (isUserInfoEditing = true)}>Edit</button>
{/if}

{#if isUserInfoEditing}
	<form
		action="?/editUser"
		method="post"
		use:enhance={() => {
			return async ({ result, update }) => {
				if (result.type == 'success') isUserInfoEditing = false;
				await update();
			};
		}}
	>
		<label>
			<span>Nickname</span>
			<input
				type="text"
				name="nickname"
				use:init
				class:input-error={form?.errors?.nickname}
				value={form?.profile?.nickname ?? pathUser.profile?.nickname}
			/>
		</label>
		{#if form?.errors?.nickname}
			{#each form.errors.nickname as error}
				<p class="error">{error}</p>
			{/each}
		{/if}
		<label>
			<span>Gender</span>
			<select name="gender" value={form?.profile?.gender ?? pathUser.profile?.gender}>
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
		<button type="submit">Save</button>
		<button
			onclick={() => {
				isUserInfoEditing = false;
				delete form?.errors;
			}}>Cancel</button
		>
	</form>
{:else}
	<ul>
		<li>Nickname: {form?.profile?.nickname ?? pathUser.profile?.nickname}</li>
		<li>Gender: {form?.profile?.gender ?? pathUser.profile?.gender}</li>
	</ul>
{/if}

<h2>Topics</h2>
{#if user && user.username == pathUser.username}
	<a href={`/${user.username}/new`}>Create a new topic</a>
{/if}

{#each pathUser.topics as topic}
	<ul>
		<li><a href="./{pathUser.username}/{topic.name}">{topic.name}</a></li>
	</ul>
{/each}
