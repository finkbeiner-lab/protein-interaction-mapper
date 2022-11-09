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
	on:clickoutside={() => (clicked = false)}
	on:mouseenter={() => (selectable = true)}
	on:mouseleave={() => (selectable = false)}
>
	<span>{name}</span>

	<aside>
		<div class="editor__controls">
			{#if context.column.getCanSort() && selectable | clicked}
				<button
					title={context.column.getIsSorted().toString() == 'asc'
						? 'sort descending'
						: 'sort ascending'}
					class="controls__sort"
					on:mousedown|stopPropagation={context.column.toggleSorting()}
				>
					{#if context.column.getIsSorted().toString() == 'asc'}
						⬆️
					{:else if context.column.getIsSorted().toString() == 'desc'}
						⬇️
					{:else}
						↕️
					{/if}
				</button>
				{#if context.header.column.getCanGroup()}
					<button
						title={context.header.column.getIsGrouped() ? 'ungroup' : 'group'}
						on:mousedown|stopPropagation={context.header.column.getToggleGroupingHandler()}
					>
						{#if context.header.column.getIsGrouped()}
							📤(${context.header.column.getGroupedIndex()})
						{:else}
							📥
						{/if}
					</button>
				{/if}
			{/if}
		</div>

		{#if clicked}
			<div class="editor__menu">
				<input
					type="text"
					placeholder="search column..."
					bind:value={filterInput}
					on:input={() => {
						context.column.setFilterValue(filterInput);
					}}
				/>
			</div>
		{/if}
	</aside>
</div>

<style lang="scss">
	@use 'sass:map';
	@import '../../../styles/color';

	span {
		margin: auto;
	}

	button {
		cursor: pointer;
		position: relative;
	}

	aside {
		position: fixed;
		margin: 0 1rem;
		background-color: map.get($palette, 'glaucous');

		align-self: center;
		display: flex;
		flex-direction: column;
	}

	.editor {
		cursor: pointer;
		z-index: 1;
		position: relative;

		&__controls {
			display: flex;
		}
		&__menu {
			padding: 0.5em;
			display: flex;
		}
	}
</style>
