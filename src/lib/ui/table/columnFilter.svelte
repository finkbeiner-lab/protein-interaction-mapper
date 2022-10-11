<script>
	import { NoSchemaIntrospectionCustomRule } from 'graphql';
	import { onMount } from 'svelte';
	import Grid from 'svelte-grid';
	import gridHelp from 'svelte-grid/build/helper/index.mjs';
	import { get } from 'svelte/store';

	const { item } = gridHelp;

	export let table;
	let tableState, filterItems;

	function positionGridItem(width, height, index, columnBreakpoints = [1, 2]) {
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

	let items = [
		{
			id: '1',
			5: item({
				x: 0,
				y: 0,
				w: 2,
				h: 2
			}),
			3: item({ x: 0, y: 0, w: 1, h: 2 }),
			1: item({ x: 0, y: 0, w: 1, h: 1 })
		},

		{
			id: '2',
			5: item({
				x: 2,
				y: 0,
				w: 2,
				h: 2
			}),
			3: item({ x: 1, y: 0, w: 1, h: 2 }),
			1: item({ x: 0, y: 1, w: 1, h: 1 })
		},

		{
			id: '3',
			5: item({
				x: 0,
				y: 2,
				w: 2,
				h: 2
			}),
			3: item({ x: 0, y: 2, w: 1, h: 2 }),
			1: item({ x: 0, y: 2, w: 1, h: 1 })
		}
	];

	// [breakpoint, x-coordinate]
	const cols = [
		[1100, 5],
		[1000, 2],
		[500, 1]
	];
</script>

{#if filterItems}
	<div class="demo-container size">
		<Grid
			bind:items={filterItems}
			rowHeight={100}
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
		.size {
			max-width: 1100px;
			width: 100%;
		}
	</style>
{/if}
