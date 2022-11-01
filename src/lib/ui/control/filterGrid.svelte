<script>
	import { onMount } from 'svelte';
	import Grid from 'svelte-grid';
	import gridHelp from 'svelte-grid/build/helper/index.mjs';
	import { get } from 'svelte/store';
	import ColumnFilter from './columnFilter.svelte';

	const { item } = gridHelp;

	export let table;
	let tableState, filterItems;
	console.log(tableState);

	function positionGridItem(width, height, index, columnBreakpoints = [1, 4]) {
		const yScaleFactor = height;
		const xScaleFactor = width;
		return Object.fromEntries(
			columnBreakpoints.map((breakpoint) => {
				return [
					breakpoint,
					item({
						x: (index % breakpoint) * xScaleFactor,
						y: index * breakpoint,
						w: xScaleFactor,
						h: yScaleFactor
					})
				];
			})
		);
	}

	function loadTableState(table) {
		tableState = get(table.headerRows)[0].state;

		filterItems = get(tableState.pluginStates.colOrder.columnIdOrder).map((column, index) => {
			const filterItemHeight = 1;
			const filterItemWidth = 2;
			const calculatePosition = (column, filterItemHeight, filterItemWidth) => ({
				id: column,
				tableHook: tableState.pluginStates,
				...positionGridItem(filterItemWidth, filterItemHeight, index)
			});
			return calculatePosition(column, filterItemHeight, filterItemWidth);
		});
		return;
	}

	onMount(() => {
		loadTableState(table);
	});

	// [breakpoint, x-coordinate]
	const cols = [
		[1100, 5],
		[200, 1]
	];
</script>

{#if filterItems}
	<div class="container">
		<Grid
			bind:items={filterItems}
			rowHeight={100}
			let:dataItem
			{cols}
			fastStart={true}
			fillSpace={true}
			on:change={(e) => {
				console.log(e.detail);
			}}
			on:resize={(e) => {
				console.log(e.detail);
			}}
		>
			<ColumnFilter tableHook={tableState} />
		</Grid>
	</div>

	<style>
		.container {
			max-width: 1100px;
			width: auto;
			height: fit-content;
			max-height: 444px;
			overflow: scroll;
		}
	</style>
{/if}
