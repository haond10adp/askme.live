<script lang="ts">
	import { backendLink } from '$lib/config';
	import { io } from 'socket.io-client';

	const { data } = $props();

	import type { Room } from '../../../socket-server/src/index';

	let allRooms: Room[] = $state([]);

	const socket = io(backendLink);
	socket.on('rooms', (rooms) => (allRooms = rooms));
</script>

<h2>Public rooms</h2>
<a href="/create">Create a room</a>
<ul>
	{#each allRooms as room}
		<li>
			<div>
				{room.title}:
				{#each room.participants! as participant}
					<a href={`/${participant.username}`}>{participant.nickname} ({participant.topicCount})</a>
				{/each}
			</div>
			{#if data.user}
				<a href="/room/{room.id}">Join</a>
			{/if}
		</li>
	{/each}
</ul>

<style>
	ul li div a {
		display: inline-block;
		margin-left: 1em;
		padding: 0.4em;
		border: 1px solid green;
	}
</style>
