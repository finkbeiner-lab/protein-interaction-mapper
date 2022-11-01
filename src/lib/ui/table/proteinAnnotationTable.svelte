<script context="module">
	export let tableStore;
</script>

<script>
	import { get, writable } from 'svelte/store';
	import {
		createSvelteTable,
		flexRender,
		getCoreRowModel,
		getSortedRowModel
	} from '@tanstack/svelte-table';

	import { proteinAnnotationSerializer } from '$lib/schema/data';

	export let proteinData;

	const serializedProteinData = proteinAnnotationSerializer(proteinData, '␞');
	let defaultData = serializedProteinData;

	const defaultColumns = [
		{
			header: 'Index',
			footer: (props) => props.column.id,
			columns: [
				{
					accessorKey: 'Gene_Symbol',
					header: () => 'Gene Symbol',
					cell: (info) => info.getValue(),
					footer: (props) => props.column.id
				},
				{
					accessorKey: 'Name',
					header: () => 'Name',
					cell: (info) => info.getValue(),
					footer: (props) => props.column.id
				},
				{
					accessorKey: 'UniProt_ID',
					header: () => 'UniProt ID',
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
					header: () => 'Branch',
					cell: (info) => info.getValue(),
					footer: (props) => props.column.id
				},
				{
					accessorKey: 'Class',
					header: () => 'Class',
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

	const options = writable({
		data: defaultData,
		columns: defaultColumns,
		state: {
			columnOrder,
			columnVisibility
		},
		onColumnOrderChange: setColumnOrder,
		onColumnVisibilityChange: setColumnVisibility,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		debugTable: true
	});

	tableStore = createSvelteTable(options);
</script>

{#if $tableStore}
	<div class="p-2">
		<table>
			<thead>
				{#each $tableStore.getHeaderGroups() as headerGroup}
					<tr>
						{#each headerGroup.headers as header}
							<th>
								{#if !header.isPlaceholder}
									<svelte:component
										this={flexRender(header.column.columnDef.header, header.getContext())}
									/>
								{/if}
							</th>
						{/each}
					</tr>
				{/each}
			</thead>
			<tbody>
				{#each $tableStore.getCoreRowModel().rows.slice(0, 20) as row}
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
				{#each $tableStore.getFooterGroups() as footerGroup}
					<tr>
						{#each footerGroup.headers as header}
							<th>
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
	html {
		font-family: sans-serif;
		font-size: 14px;
	}

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
