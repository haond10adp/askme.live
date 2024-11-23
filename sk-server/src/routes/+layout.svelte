<script lang="ts">
	let { data, children } = $props();
	import { enhance } from '$app/forms';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import '../app.css';
</script>

<ul>
	<li><a href="/">Home</a></li>
	{#if !data.user}
		<li><a href="/login">Login</a></li>
		<li><a href="/signup">Sign up</a></li>
	{/if}
</ul>

{#if data.user}
	<h1>Hello {data.user.profile?.nickname}</h1>
	<a href={'/' + data.user.username}>My profile</a>
	<form method="post" use:enhance action="/logout">
		<button>Log out</button>
	</form>
{/if}

<SvelteToast />

{@render children()}
