<script>
	import Grid from 'svelte-grid';
	import gridHelp from 'svelte-grid/build/helper/index.mjs';

	const { item } = gridHelp;

	export let table;

	const id = () => '_' + Math.random().toString(36).substr(2, 9);

	let items = [
		{
			id: '1',
			5: item({
				x: 0,
				y: 0,
				w: 2,
				h: 2
			}),
			3: item({ x: 0, w: 2, h: 2, y: 0 }),
			1: item({ x: 0, y: 0, w: 1, h: 2 })
		},

		{
			id: '2',
			5: item({
				x: 2,
				y: 0,
				w: 3,
				h: 2
			}),
			3: item({ x: 2, w: 1, h: 2, y: 0 }),
			1: item({ x: 0, y: 2, w: 1, h: 2 })
		},

		{
			id: '3',
			5: item({
				x: 0,
				y: 2,
				w: 5,
				h: 2
			}),
			2: item({ x: 0, w: 3, h: 2, y: 2 }),
			1: item({ x: 0, y: 4, w: 1, h: 2 })
		}
	];

	// [breakpoint, x-coordinate]
	const cols = [
		[1100, 5],
		[800, 2],
		[500, 1]
	];
</script>

<div class="demo-container size">
	<Grid bind:items rowHeight={100} let:item let:dataItem {cols} fastStart={true}>
		<div class="demo-widget">{dataItem.id}</div>
	</Grid>
</div>

<style>
	.size {
		max-width: 1100px;
		width: 100%;
	}
</style>
