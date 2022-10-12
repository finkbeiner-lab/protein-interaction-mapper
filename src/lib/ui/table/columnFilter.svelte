<script>
	import { NoSchemaIntrospectionCustomRule } from 'graphql';
	import { onMount } from 'svelte';
	import Grid from 'svelte-grid';
	import gridHelp from 'svelte-grid/build/helper/index.mjs';
	import { get } from 'svelte/store';

	const { item } = gridHelp;

	export let table;
	let tableState, filterItems, filterContainer;

	function positionGridItem(width, height, index, columnBreakpoints = [1, 2, 4]) {
		const yScaleFactor = height;
		const xScaleFactor = width;
		return Object.fromEntries(
			columnBreakpoints.map((breakpoint) => {
				console.log((index % breakpoint) * xScaleFactor);
				return [
					breakpoint,
					item({
						x: (index % breakpoint) * xScaleFactor,
						y: index * yScaleFactor,
						w: xScaleFactor,
						h: yScaleFactor
					})
				];
			})
		);
	}

	function loadTableState(table) {
		tableState = get(table.headerRows)[0].state;
		console.log(tableState.columns);

		filterItems = tableState.columns
			.filter((column) => {
				return column.header != '';
			})
			.map((column, index) => {
				const filterItemHeight = 1;
				const filterItemWidth = 2;
				const calculatePosition = (column, filterItemHeight, filterItemWidth) => ({
					id: column.header,
					...positionGridItem(filterItemWidth, filterItemHeight, index)
				}); // anonymous fxn with column as arg
				return calculatePosition(column, filterItemHeight, filterItemWidth);
			});
		console.log(filterItems);
		return;
	}

	onMount(() => {
		loadTableState(table);
	});

	// [breakpoint, x-coordinate]
	const cols = [
		[1100, 5],
		[300, 2],
		[100, 1]
	];
</script>

{#if filterItems}
	<div class="filterContainer" bind:this={filterContainer}>
		<Grid
			bind:items={filterItems}
			rowHeight={100}
			scroller={filterContainer}
			let:item
			let:dataItem
			{cols}
			fastStart={true}
			fillSpace={true}
			on:change={(e) => {
				console.log(e.detail);
			}}
		>
			<div class="demo-widget">{dataItem.id}</div>
		</Grid>
	</div>

	<style>
		.filterContainer {
			max-width: 1100px;
			width: auto;
			max-height: fit-content;
		}
	</style>
{/if}
