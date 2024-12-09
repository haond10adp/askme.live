<script lang="ts">
	interface MyProps {
		name: string;
		value: string;
		minRows: number;
		maxRows: number;
	}

	let { value = $bindable(''), minRows = 1, maxRows, name }: MyProps = $props();

	let minHeight = $derived(`${1 + minRows * 1.2}em`);
	let maxHeight = $derived(maxRows ? `${1 + maxRows * 1.2}em` : `auto`);
</script>

<div class="container">
	<pre aria-hidden="true" style="min-height: {minHeight}; max-height: {maxHeight}">{value +
			'\n'}</pre>

	<textarea bind:value {name}></textarea>
</div>

<style>
	.container {
		position: relative;
		margin-left: 12px;
		width: 550px;
	}

	pre {
		margin: 10px;
	}

	pre,
	textarea {
		font-family: 'Pacifico', cursive;
		padding: 0.5em;
		box-sizing: border-box;
		border: 1px solid grey;
		line-height: 1.2;
		overflow: hidden;
	}

	textarea {
		position: absolute;
		width: 550px;
		height: 100%;
		top: 0;
		resize: none;
	}

	@media screen and (max-width: 500px) {
		.container {
			width: 75vw;
		}
		textarea {
			width: 75vw;
		}
	}
</style>
