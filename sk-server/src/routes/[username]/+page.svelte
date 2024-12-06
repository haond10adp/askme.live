<script lang="ts">
	import { enhance } from '$app/forms';
	import { init } from '$lib/utils';

	let { data, form } = $props();
	let { user, pathUser } = data;
	let isUserInfoEditing = $state(false);
</script>

<h2>
	User Info
	{#if user?.username == pathUser.username}
		<button class="edit" onclick={() => (isUserInfoEditing = true)}>
			<img src="/icons8-edit.svg" alt="" />Edit
		</button>
	{/if}
</h2>

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
				<div class="error">
					<span></span>
					<p class="error">{error}</p>
				</div>
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
				<div class="error">
					<span></span>
					<p class="error">{error}</p>
				</div>
			{/each}
		{/if}
		<div>
			<span></span>
			<div class="bt-group">
				<button type="submit">Save</button>
				<button
					onclick={() => {
						isUserInfoEditing = false;
						delete form?.errors;
					}}>Cancel</button
				>
			</div>
		</div>
	</form>
{:else}
	<ul class="info">
		<li>
			<span>Nickname:</span>
			<span>{form?.profile?.nickname ?? pathUser.profile?.nickname}</span>
		</li>
		<li>
			<span>Gender:</span>
			<span>{form?.profile?.gender ?? pathUser.profile?.gender}</span>
		</li>
	</ul>
{/if}

<h2>
	Topics
	{#if user && user.username == pathUser.username}
		<a href={`/${user.username}/new`}>+Create a new topic</a>
	{/if}
</h2>

{#each pathUser.topics as topic}
	<ul class="topic-list">
		<li><a href="./{pathUser.username}/{topic.name}">{topic.name}</a></li>
	</ul>
{/each}

<style>
	h2 {
		margin-top: 32px;
		display: flex;
		align-items: baseline;
		margin-bottom: 10px;
	}
	button.edit {
		font-size: 16px;
		margin-left: 10px;
		color: var(--color-primary-4);
		background: white;
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
	form select,
	form .bt-group {
		display: table-cell;
		margin-bottom: 6px;
	}

	form input,
	form select,
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

	img {
		width: 24px;
		height: 24px;
	}
	button {
		margin-top: 10px;
		margin-right: 2px;
	}
	h2 a {
		font-size: 18px;
		font-family: 'Poppins', sans-serif;
		text-decoration: underline;
		margin-left: 10px;
	}

	ul.topic-list li {
		list-style-type: square;
		margin-left: 32px;
	}
	ul.topic-list li a {
		color: var(--color-primary-4);
	}
	ul.topic-list li::marker {
		color: var(--color-primary-5);
	}
</style>
