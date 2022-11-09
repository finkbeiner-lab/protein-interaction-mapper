<script>
	import { get, writable } from 'svelte/store';
	import {
		createSvelteTable,
		flexRender,
		getCoreRowModel,
		getSortedRowModel,
		getFilteredRowModel
	} from '@tanstack/svelte-table';

	import { proteinAnnotationSerializer } from '$lib/schema/data';
	import { onMount } from 'svelte';
	import ColumnEditor from './columnEditor.svelte';
	import Cell from './cell.svelte';

	export let proteinData, tableState;
	let tableElement;

	const serializedProteinData = proteinAnnotationSerializer(proteinData, '␞');

	const defaultColumns = [
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
					aggregationFn: 'unique'
				},
				{
					accessorKey: 'Name',
					header: 'Name',
					cell: (info) => info.getValue(),
					footer: (props) => props.column.id,
					filterFn: 'includesString',
					aggregationFn: 'unique'
				},
				{
					accessorKey: 'UniProt_ID',
					header: 'UniProt ID',
					cell: (info) => info.getValue(),
					footer: (props) => props.column.id,
					filterFn: 'includesString',
					aggregationFn: 'unique'
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
					aggregationFn: 'unique'
				},
				{
					accessorKey: 'Class',
					header: 'Class',
					cell: (info) => info.getValue(),
					footer: (props) => props.column.id,
					filterFn: 'includesString',
					aggregationFn: 'unique'
				},
				{
					accessorKey: 'Group',
					header: 'Group',
					cell: (info) => info.getValue(),
					footer: (props) => props.column.id,
					filterFn: 'includesString',
					aggregationFn: 'unique'
				},
				{
					accessorKey: 'Subgroup',
					header: 'Subgroup',
					cell: (info) => info.getValue(),
					footer: (props) => props.column.id,
					filterFn: 'includesString',
					aggregationFn: 'unique'
				},
				{
					accessorKey: 'Type',
					header: 'Type',
					cell: (info) => info.getValue(),
					footer: (props) => props.column.id,
					filterFn: 'includesString',
					aggregationFn: 'unique'
				},
				{
					accessorKey: 'Distinguishing_Domains',
					header: 'Distinguishing Domains',
					cell: (info) => info.getValue(),
					footer: (props) => props.column.id,
					filterFn: 'includesString',
					aggregationFn: 'unique'
				}
			]
		}
	];

	let columnFilters = [];
	let columnOrder = [];
	let columnVisibility = {};
	let sorting = [];

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

	const options = writable({
		data: serializedProteinData,
		columns: defaultColumns,
		state: {
			columnFilters,
			columnOrder,
			columnVisibility,
			sorting
		},
		onColumnFiltersChange: setColumnFilters,
		onColumnOrderChange: setColumnOrder,
		onSortingChange: setSorting,
		onColumnVisibilityChange: setColumnVisibility,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		debugTable: true
	});

	tableState = createSvelteTable(options);

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
			resizer.style.height = `${tableState.offsetHeight}px`;

			// Add a resizer element to the column
			col.appendChild(resizer);

			// Will be implemented in the next section
			createResizableColumn(col, resizer);
		});
	});
</script>

{#if $tableState}
	<div>
		<table bind:this={tableElement}>
			<thead>
				{#each $tableState.getHeaderGroups() as headerGroup}
					<tr>
						{#each headerGroup.headers as header}
							<th colSpan={header.colSpan}>
								{#if !header.isPlaceholder}
									<div>
										<ColumnEditor
											name={header.column.columnDef.header}
											context={header.getContext()}
										/>
									</div>
								{/if}
							</th>
						{/each}
					</tr>
				{/each}
			</thead>
			<tbody>
				{#each $tableState.getRowModel().rows.slice(0, 20) as row}
					<tr>
						{#each row.getVisibleCells() as cell}
							<td>
								<Cell context={cell.getContext()} />
							</td>
						{/each}
					</tr>
				{/each}
			</tbody>
			<tfoot>
				{#each $tableState.getFooterGroups() as footerGroup}
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

	th {
		border-bottom: 1px solid lightgray;
		border-right: 1px solid lightgray;
		padding: 2px 4px;
		z-index: 3;
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
