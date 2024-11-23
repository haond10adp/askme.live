<script lang="ts">
	import { backendLink } from '$lib/config';
	import { io } from 'socket.io-client';

	interface Room {
		id: string;
		title: string;
		participants: string[];
	}
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
				{#each room.participants as participant}
					<a href={`/${participant}`}>{participant}</a>
				{/each}
			</div>
			<a href="/room/{room.id}">Join</a>
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
