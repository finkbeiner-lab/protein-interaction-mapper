<script>
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { clickoutside } from '@svelte-put/clickoutside';

	export let name, context;
	let clicked,
		selectable = false;
	$: filterInput = '';

	// TODO: fix undefined table values so sorting works for all columns
</script>

<div
	class="editor"
	use:clickoutside
	on:mousedown={() => (clicked = true)}
	on:mouseenter={() => (selectable = true)}
	on:mouseleave={() => (selectable = false)}
	on:clickoutside={() => (clicked = false)}
>
	<span>{name}</span>

	<aside>
		<div class="editor__controls">
			{#if context.column.getCanSort() && selectable | clicked}
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
		{#if clicked}
			<input
				type="text"
				placeholder="search column..."
				bind:value={filterInput}
				on:input={() => {
					context.column.setFilterValue(filterInput);
				}}
			/>
		{/if}
	</aside>
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
