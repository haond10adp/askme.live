<script lang="ts">
	import { goto } from '$app/navigation';
	import { backendLink } from '$lib/config';
	import { io } from 'socket.io-client';

	const socket = io(backendLink);
	let title = $state();
	function submit(e: Event) {
		e.preventDefault();
		socket.emit('new-room', { title });
		goto('/');
	}
</script>

<form onsubmit={submit}>
	<h2>Create a room</h2>
	<label>
		<span>title</span>
		<input type="text" name="title" bind:value={title} />
	</label>
	<button>Submit</button>
</form>
