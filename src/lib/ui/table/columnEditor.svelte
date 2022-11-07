<script>
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { clickoutside } from '@svelte-put/clickoutside';

	export let name, context;
	let clicked = false;

	console.log(name);
	console.log(context.table.getRowModel());

	// TODO: fix undefined table values so sorting works for all columns
</script>

<div
	class="editor"
	use:clickoutside
	on:mousedown={() => (clicked = true)}
	on:clickoutside={() => (clicked = false)}
>
	<span>{name}</span>
	{#if clicked}
		<aside>
			<div class="editor__controls">
				{#if context.column.getCanSort()}
					<button class="controls__sort" on:mousedown={context.column.toggleSorting()}>
						{#if context.column.getIsSorted().toString() == 'asc'}
							⬆️
						{:else if context.column.getIsSorted().toString() == 'desc'}
							⬇️
						{:else}
							↕️
						{/if}
					</button>
				{/if}
			</div>
			<input type="text" placeholder="search column..." />
		</aside>
	{/if}
</div>

<style lang="scss">
	span {
		margin: auto;
	}

	aside {
		position: fixed;
		margin: 0 2rem;

		align-self: center;
	}

	.editor {
		&__controls {
			display: flex;
		}
	}
</style>
