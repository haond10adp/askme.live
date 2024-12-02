<script lang="ts">
	let { data, children } = $props();
	import { enhance } from '$app/forms';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import '../app.css';
</script>

<nav>
	<ul>
		<li><a href="/">AskMeLive<sup>.site</sup></a></li>
		{#if !data.user}
			<li class="push"><a href="/login">Login</a></li>
			<li><a href="/signup">Sign up</a></li>
		{:else}
			<li class="push"><a href={'/' + data.user.username}>My profile</a></li>
			<li>
				<form method="post" use:enhance action="/logout">
					<button>Log out ↪</button>
				</form>
			</li>
		{/if}
	</ul>
</nav>

<SvelteToast />

<main>
	{@render children()}
</main>

<style>
	nav ul {
		padding: 0 14px;
		max-width: 960px;
		margin: 0 auto;
		display: flex;
		margin-top: 10px;
		align-items: baseline;
	}

	.push {
		margin-left: auto;
	}
	nav ul li:first-child {
		font-family: 'Cherry Bomb One', system-ui;
		font-size: 24px;
	}

	nav ul li {
		margin-right: 10px;
	}

	nav li button {
		background: none;
		color: inherit;
		border: none;
		padding: 0;
		font: inherit;
		cursor: pointer;
		outline: inherit;
	}

	main {
		max-width: 960px;
		margin: 0 auto;
		padding: 0 14px;
	}
</style>
