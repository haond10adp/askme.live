<script lang="ts">
	import { goto } from '$app/navigation';
	import { socket } from '$lib/socket';

	let title = $state();
	function submit(e: Event) {
		e.preventDefault();
		socket.emit('new-room', { title });
		goto('/');
	}
</script>

<form onsubmit={submit}>
	<h2>Create a room</h2>
	<div class="input-wrapper">
		<input class="input" type="text" id="title" bind:value={title} />
		<label class="label" for="title">Title</label>
	</div>
	<button type="submit">Submit</button>
</form>

<style>
	h2 {
		margin-top: 40px;
	}
	form div {
		margin-top: 10px;
	}
</style>
