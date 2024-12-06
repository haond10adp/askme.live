<script lang="ts">
	import { goto } from '$app/navigation';
	import { socket } from '$lib/socket';

	let title = $state('');
	let error = $state('');
	function submit(e: Event) {
		e.preventDefault();
		if (title.length > 60) {
			error = 'Title must be less than 60 characters';
			return;
		}
		socket.emit('new-room', { title });
		goto('/');
	}
</script>

<form onsubmit={submit}>
	<h2>Create a room</h2>
	<div class="input-wrapper">
		<input class="input" type="text" id="title" bind:value={title} required />
		<label class="label" for="title">Title</label>
		{#if error}
			<p class="error">{error}</p>
		{/if}
	</div>
	<button type="submit">Submit</button>
</form>

<style>
	button {
		margin-top: 10px;
		padding: 6px 14px;
		font-size: 16px;
	}
	h2 {
		margin-top: 40px;
	}

	form {
		display: block;
	}

	form input {
		margin-left: 0;
	}
	form div {
		margin-top: 14px;
	}

	form label {
		margin-left: 0;
	}

	/* google like form */
	.input-wrapper {
		position: relative;
	}

	.input-wrapper .input {
		padding: 8px 16px;
		border: 1px solid grey;
		border-radius: 3px;
		width: 100%;
		font-family: 'Playfair Display';
	}

	.input-wrapper .input:focus {
		outline: none;
		border: 1px solid var(--color-primary-4);
	}

	.input-wrapper .input:focus + .label {
		top: -8px;
		left: 8px;
		font-size: 16px;
		color: var(--color-primary-4);
	}

	.input-wrapper .input:valid + .label {
		top: -8px;
		left: 8px;
		font-size: 16px;
		color: var(--color-primary-4);
	}

	.input-wrapper .label {
		position: absolute;
		left: 16px;
		top: 12px;
		padding: 0 4px;
		background-color: #fff;
		font-size: 18px;
		line-height: 1;
		color: grey;
		transition: all 0.15s ease-out;
	}
</style>
