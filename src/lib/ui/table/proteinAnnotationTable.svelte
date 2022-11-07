<script>
	import { get, writable } from 'svelte/store';
	import {
		createSvelteTable,
		flexRender,
		getCoreRowModel,
		getSortedRowModel
	} from '@tanstack/svelte-table';

	import { proteinAnnotationSerializer } from '$lib/schema/data';
	import { onMount } from 'svelte';
	import ColumnEditor from './columnEditor.svelte';

	export let proteinData, tableState;

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
					footer: (props) => props.column.id
				},
				{
					accessorKey: 'Name',
					header: 'Name',
					cell: (info) => info.getValue(),
					footer: (props) => props.column.id
				},
				{
					accessorKey: 'UniProt_ID',
					header: 'UniProt ID',
					cell: (info) => info.getValue(),
					footer: (props) => props.column.id
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
					footer: (props) => props.column.id
				},
				{
					accessorKey: 'Class',
					header: 'Class',
					cell: (info) => info.getValue(),
					footer: (props) => props.column.id
				},
				{
					accessorKey: 'Group',
					header: 'Group',
					cell: (info) => info.getValue(),
					footer: (props) => props.column.id
				},
				{
					accessorKey: 'Subgroup',
					header: 'Subgroup',
					cell: (info) => info.getValue(),
					footer: (props) => props.column.id
				},
				{
					accessorKey: 'Type',
					header: 'Type',
					cell: (info) => info.getValue(),
					footer: (props) => props.column.id
				},
				{
					accessorKey: 'Distinguishing_Domains',
					header: 'Distinguishing Domains',
					cell: (info) => info.getValue(),
					footer: (props) => props.column.id
				}
			]
		}
	];

	let columnOrder = [];
	let columnVisibility = {};

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

	let sorting = [];
	const setSorting = (updater) => {
		if (updater instanceof Function) {
			sorting = updater(sorting);
		} else {
			sorting = updater;
		}
		console.log(sorting);
		options.update((old) => ({
			...old,
			state: {
				...old.state,
				sorting
			}
		}));
	};

	const options = writable({
		data: serializedProteinData,
		columns: defaultColumns,
		state: {
			columnOrder,
			columnVisibility,
			sorting
		},
		onColumnOrderChange: setColumnOrder,
		onSortingChange: setSorting,
		onColumnVisibilityChange: setColumnVisibility,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		debugTable: true
	});

	tableState = createSvelteTable(options);
	console.log(
		get(tableState)
			.getRowModel()
			.rows.filter((row) => !row.original.Gene_Symbol)
	);
</script>

{#if $tableState}
	<div>
		<table>
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
								<svelte:component
									this={flexRender(cell.column.columnDef.cell, cell.getContext())}
								/>
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
