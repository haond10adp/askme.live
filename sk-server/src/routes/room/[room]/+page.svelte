<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import { socket } from '$lib/socket';
	import { joinRoom } from 'trystero/torrent';
	import type { Room } from '../../../../../socket-server/src/index';

	let { data }: { data: PageData } = $props();

	socket.emit('join-room', $page.params.room, {
		username: data.user?.username,
		nickname: data.user?.profile?.nickname,
		topicCount: data.topicCount
	});
	let allRooms: Room[] = $state([]);
	let participants = $derived(allRooms.find((room) => room.id == $page.params.room)?.participants)!;
	socket.on('rooms', (rooms) => (allRooms = rooms));

	$effect(() => {
		const peerAudios = {};
		const config = { appId: 'san_narciso_3d' };
		const room = joinRoom(config, $page.params.room);

		navigator.mediaDevices
			.getUserMedia({
				audio: true,
				video: false
			})
			.then((selfStream) => {
				room.addStream(selfStream);
				room.onPeerJoin((peerId) => room.addStream(selfStream, peerId));
			});

		room.onPeerStream((stream, peerId) => {
			// create an audio instance and set the incoming stream
			const audio = new Audio();
			audio.srcObject = stream;
			audio.autoplay = true;
			document.body.appendChild(audio);
		});
	});
</script>

<h2>Participants:</h2>
<ul>
	{#each participants as participant}
		<li><a href={`/${participant.username}`}>{participant.nickname}</a></li>
	{/each}
</ul>

<style>
	h2 {
		margin-top: 32px;
		margin-bottom: 10px;
	}

	ul li a {
		display: inline-block;
		margin-right: 6px;
		margin-bottom: 8px;
		padding: 2px 10px;
		border: 2px solid var(--color-secondary-5);
		color: var(--color-primary-5);
		border-radius: 16px;
	}
</style>
