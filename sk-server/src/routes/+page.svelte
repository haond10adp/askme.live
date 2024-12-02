<script lang="ts">
	import { backendLink } from '$lib/socket';
	import { io } from 'socket.io-client';
	import type { Room } from '../../../socket-server/src/index';
	import { afterNavigate, invalidateAll } from '$app/navigation';

	const { data } = $props();
	const socket = io(backendLink);

	let allRooms: Room[] = $state([]);
	socket.on('rooms', (rooms) => (allRooms = rooms));
</script>

{#if data.user}
	<p class="welcome">Hello {data.user.profile?.nickname}</p>
{/if}

<h2>
	Public rooms
	<a class="create" href="/create">+Create a room</a>
</h2>
<ul>
	{#each allRooms as room}
		<li>
			<div>
				<h3>
					{room.title}:
				</h3>
				{#each room.participants! as participant}
					<a href={`/${participant.username}`}>{participant.nickname} ({participant.topicCount})</a
					><a href="">This is a very long</a><a href="">This is a very long</a>
				{/each}
				{#if data.user}
					<p class="join">
						<a href="/room/{room.id}" target="_blank">⇥ Take part in</a>
					</p>
				{/if}
			</div>
		</li>
	{/each}
</ul>

<style>
	p.welcome {
		font-size: 20px;
	}
	p.join {
		/* text-align: right; */
		text-decoration: underline dotted;
		font-family: 'Poppins', sans-serif;
		font-size: 20px;
	}

	div {
		margin-top: 6px;
	}
	h3 {
		font-size: 18px;
		margin-bottom: 6px;
	}
	ul li div > a {
		display: inline-block;
		margin-right: 6px;
		margin-bottom: 8px;
		padding: 2px 10px;
		border: 1px solid green;
		border-radius: 16px;
	}
	h2 {
		letter-spacing: 1px;
		margin-top: 20px;
		margin-bottom: 4px;
	}
	h2 a {
		font-size: 18px;
		text-decoration: underline;
		font-family: 'Poppins', sans-serif;
		letter-spacing: 0;
	}
</style>
