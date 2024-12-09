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

<footer>
	<p>© 2024 | haond10adp@gmail.com</p>
</footer>

<style>
	nav {
		background-color: var(--color-primary-4);
		margin-top: 0;
	}
	nav ul {
		padding: 10px 14px;
		max-width: 960px;
		margin: 0 auto;
		display: flex;
		align-items: baseline;
	}

	.push {
		margin-left: auto;
	}
	nav ul li * {
		color: white;
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
		min-height: 100vh;
	}

	footer p {
		text-align: center;
		margin-top: 30vh;
		padding: 16px;
		font-size: 18px;
	}
</style>
