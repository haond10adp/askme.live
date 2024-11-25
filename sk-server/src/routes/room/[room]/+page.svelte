<script lang="ts">
	import { page } from '$app/stores';
	import { backendLink } from '$lib/config';
	import { io } from 'socket.io-client';
	import type { PageData } from './$types';
	import { joinRoom } from 'trystero/torrent';

	let { data }: { data: PageData } = $props();

	interface Room {
		id: string;
		title: string;
		participants: string[];
	}
	const socket = io(backendLink);

	let allRooms: Room[] = $state([]);
	let participants = $derived(allRooms.find((room) => room.id == $page.params.room)?.participants)!;

	socket.on('rooms', (rooms) => (allRooms = rooms));

	socket.emit('join-room', $page.params.room, data.user?.username);
	function handleClose() {
		socket.emit('leave-room', $page.params.room, data.user?.username);
	}

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
		});
	});
</script>

<svelte:window onbeforeunload={handleClose} />

<h2>Participants:</h2>
<ul>
	{#each participants as participant}
		<li><a href={`/${participant}`}>{participant}</a></li>
	{/each}
</ul>
