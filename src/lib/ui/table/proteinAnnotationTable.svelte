<script>
	import { get, writable } from 'svelte/store';
	import {
		createSvelteTable,
		flexRender,
		getCoreRowModel,
		getSortedRowModel,
		getGroupedRowModel,
		getExpandedRowModel,
		getFilteredRowModel,
		getPaginationRowModel
	} from '@tanstack/svelte-table';

	import { proteinAnnotationSerializer } from '$lib/schema/data';
	import { onMount } from 'svelte';
	import Header from './header.svelte';
	import Cell from './cell.svelte';

	export let proteinData, tableContext, mapState;
	let tableElement;

	function treeMapFilter(mapState, tableContext) {
		if (Object(mapState).hasOwnProperty('label') && typeof mapState.label != 'undefined') {
			let annotation = mapState.currentPath.split('/').at(-2); // annotation name is behind trailing slash
			console.log(annotation);
			console.log(mapState);
			get(tableContext)
				.getAllFlatColumns()
				.filter((column) => {
					if (column.columnDef.header == annotation) {
						column.setFilterValue(mapState.label);
						mapState.filteredColumns.push(column);
					}
				});
		} else if (Object(mapState).hasOwnProperty('currentPath') && mapState.currentPath == '/') {
			console.log(mapState);
			mapState.filteredColumns.forEach((column) => {
				column.setFilterValue('');
			});
		}
	}

	$: treeMapFilter(mapState, tableContext);

	const serializedProteinData = proteinAnnotationSerializer(proteinData, '␞');

	export const defaultColumns = [
		{
			header: 'Index',
			footer: (props) => props.column.id,
			columns: [
				{
					accessorKey: 'Gene_Symbol',
					header: 'Gene Symbol',
					cell: (info) => info.getValue(),
					footer: (props) => props.column.id,
					filterFn: 'includesString',
					aggregationFn: 'uniqueCount'
				},
				{
					accessorKey: 'Name',
					header: 'Name',
					cell: (info) => info.getValue(),
					footer: (props) => props.column.id,
					filterFn: 'includesString',
					aggregationFn: 'uniqueCount'
				},
				{
					accessorKey: 'UniProt_ID',
					header: 'UniProt ID',
					cell: (info) => info.getValue(),
					footer: (props) => props.column.id,
					filterFn: 'includesString',
					aggregationFn: 'uniqueCount'
				}
			]
		},
		{
			header: 'Annotations',
			footer: (props) => props.column.id,
			columns: [
				{
					accessorKey: 'Branch',
					header: 'Branch',
					cell: (info) => info.getValue(),
					footer: (props) => props.column.id,
					filterFn: 'includesString',
					aggregationFn: 'uniqueCount'
				},
				{
					accessorKey: 'Class',
					header: 'Class',
					cell: (info) => info.getValue(),
					footer: (props) => props.column.id,
					filterFn: 'includesString',
					aggregationFn: 'uniqueCount'
				},
				{
					accessorKey: 'Group',
					header: 'Group',
					cell: (info) => info.getValue(),
					footer: (props) => props.column.id,
					filterFn: 'includesString',
					aggregationFn: 'uniqueCount'
				},
				{
					accessorKey: 'Subgroup',
					header: 'Subgroup',
					cell: (info) => info.getValue(),
					footer: (props) => props.column.id,
					filterFn: 'includesString',
					aggregationFn: 'uniqueCount'
				},
				{
					accessorKey: 'Type',
					header: 'Type',
					cell: (info) => info.getValue(),
					footer: (props) => props.column.id,
					filterFn: 'includesString',
					aggregationFn: 'uniqueCount'
				},
				{
					accessorKey: 'Distinguishing_Domains',
					header: 'Distinguishing Domains',
					cell: (info) => info.getValue(),
					footer: (props) => props.column.id,
					filterFn: 'includesString',
					aggregationFn: 'uniqueCount'
				}
			]
		}
	];

	let columnFilters = [];
	let columnOrder = [];
	let columnVisibility = {};
	let sorting = [];
	let grouping = [];
	$: setGrouping;

	const setColumnOrder = (updater) => {
		if (updater instanceof Function) {
			columnOrder = updater(columnOrder);
		} else {
			columnOrder = updater;
		}
		options.update((old) => ({
			...old,
			state: {
				...old.state,
				columnOrder
			}
		}));
	};

	const setColumnVisibility = (updater) => {
		if (updater instanceof Function) {
			columnVisibility = updater(columnVisibility);
		} else {
			columnVisibility = updater;
		}
		options.update((old) => ({
			...old,
			state: {
				...old.state,
				columnVisibility
			}
		}));
	};

	const setSorting = (updater) => {
		if (updater instanceof Function) {
			sorting = updater(sorting);
		} else {
			sorting = updater;
		}
		options.update((old) => ({
			...old,
			state: {
				...old.state,
				sorting
			}
		}));
	};

	const setColumnFilters = (updater) => {
		if (updater instanceof Function) {
			columnFilters = updater(columnFilters);
		} else {
			sorting = updater;
		}
		options.update((old) => ({
			...old,
			state: {
				...old.state,
				columnFilters
			}
		}));
	};

	const setGrouping = (updater) => {
		if (updater instanceof Function) {
			grouping = updater(grouping);
		} else {
			grouping = updater;
		}
		options.update((old) => ({
			...old,
			state: {
				...old.state,
				grouping
			}
		}));
	};

	const options = writable({
		data: serializedProteinData,
		columns: defaultColumns,
		state: {
			columnFilters,
			columnOrder,
			columnVisibility,
			sorting,
			grouping
		},
		onGroupingChange: setGrouping,
		onColumnFiltersChange: setColumnFilters,
		onColumnOrderChange: setColumnOrder,
		onSortingChange: setSorting,
		onColumnVisibilityChange: setColumnVisibility,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getGroupedRowModel: getGroupedRowModel(),
		getExpandedRowModel: getExpandedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		debugTable: true
	});

	tableContext = createSvelteTable(options);
	const createResizableColumn = function (col, resizer) {
		// Track the current position of mouse
		let x = 0;
		let w = 0;

		const mouseDownHandler = function (e) {
			// Get the current mouse position
			x = e.clientX;

			// Calculate the current width of column
			const styles = window.getComputedStyle(col);
			w = parseInt(styles.width, 10);

			// Attach listeners for document's events
			document.addEventListener('mousemove', mouseMoveHandler);
			document.addEventListener('mouseup', mouseUpHandler);
		};

		const mouseMoveHandler = function (e) {
			// Determine how far the mouse has been moved
			const dx = e.clientX - x;

			// Update the width of column
			col.style.width = `${w + dx}px`;
		};

		// When user releases the mouse, remove the existing event listeners
		const mouseUpHandler = function () {
			document.removeEventListener('mousemove', mouseMoveHandler);
			document.removeEventListener('mouseup', mouseUpHandler);
		};

		resizer.addEventListener('mousedown', mouseDownHandler);
	};
	onMount(() => {
		// Query all headers
		const cols = tableElement.querySelectorAll('th');

		// Loop over them
		[].forEach.call(cols, function (col) {
			// Create a resizer element
			const resizer = document.createElement('div');
			resizer.classList.add('resizer');

			// Set the height
			resizer.style.height = `${tableContext.offsetHeight}px`;

			// Add a resizer element to the column
			col.appendChild(resizer);

			// Will be implemented in the next section
			createResizableColumn(col, resizer);
		});
	});
</script>

{#if $tableContext}
	<div>
		<table bind:this={tableElement}>
			<thead>
				{#each $tableContext.getHeaderGroups() as headerGroup}
					<tr>
						{#each headerGroup.headers as header}
							<Header name={header.column.columnDef.header} context={header.getContext()} />
						{/each}
					</tr>
				{/each}
			</thead>
			<tbody>
				{#each $tableContext.getRowModel().rows as row}
					<tr>
						{#each row.getVisibleCells() as cell}
							<td
								style="background: {cell.getIsGrouped()
									? '#0aff0082'
									: cell.getIsAggregated()
									? '#ffa50078'
									: cell.getIsPlaceholder()
									? '#ff000042'
									: 'white'}"
							>
								{#if cell.getIsGrouped()}
									<button
										on:click={row.getToggleExpandedHandler()}
										style="cursor: {row.getCanExpand() ? 'pointer' : 'normal'}"
									>
										{#if row.getIsExpanded()}
											'👇'
										{:else}
											'👉'
										{/if}
										<Cell context={cell.getContext()} />
										<span> {row.subRows.length}</span>
									</button>
								{:else if cell.getIsAggregated()}
									<svelte:component
										this={flexRender(cell.column.columnDef.aggregatedCell, cell.getContext())}
									/>
								{:else if cell.getIsPlaceholder()}
									{' '}
								{:else}
									<Cell context={cell.getContext()} />
								{/if}
							</td>
						{/each}
					</tr>
				{/each}
			</tbody>
			<tfoot>
				{#each $tableContext.getFooterGroups() as footerGroup}
					<tr>
						{#each footerGroup.headers as header}
							<th colSpan={header.colSpan}>
								{#if !header.isPlaceholder}
									<svelte:component
										this={flexRender(header.column.columnDef.footer, header.getContext())}
									/>
								{/if}
							</th>
						{/each}
					</tr>
				{/each}
			</tfoot>
		</table>
	</div>
{/if}

<style>
	table {
		border: 1px solid lightgray;
	}

	tbody {
		border-bottom: 1px solid lightgray;
	}

	td {
		border-right: 1px solid lightgray;
		padding: 2px 4px;
	}

	td:last-child {
		border-right: 0;
	}

	tfoot {
		color: gray;
	}

	tfoot th {
		font-weight: normal;
	}
</style>
