<script>
	import { ProteinAnnotationTable } from '$lib/ui/proteinAnnotationTable.js';
	import { Subscribe, Render } from 'svelte-headless-table';
	import {
		addGroupBy,
		addExpandedRows,
		addColumnOrder,
		addSortBy
	} from 'svelte-headless-table/plugins';
	import { proteinAnnotationSerializer } from '$lib/schema/data';

	export let proteinData;

	const serializedProteinData = proteinAnnotationSerializer(proteinData, '␞');

	const pluginMap = {
		sort: addSortBy(),
		group: addGroupBy(),
		expand: addExpandedRows(),
		colOrder: addColumnOrder()
	};

	const columnDefinitionList = [
		{
			name: 'Gene Symbol',
			id: 'Gene_Symbol',
			pluginOptions: {
				group: {
					getAggregateValue: (values) => getDistinct(values).length,
					cell: ({ value }) => `${value} unique`
				}
			},
			group: null
		},
		{
			name: 'Name',
			id: 'Name',
			pluginOptions: {
				group: {
					getAggregateValue: (values) => getDistinct(values).length,
					cell: ({ value }) => `${value} unique`
				}
			},
			group: null
		},
		{
			name: 'Branch',
			id: 'Branch',
			pluginOptions: {
				group: {
					getAggregateValue: (values) => getDistinct(values).length,
					cell: ({ value }) => `${value} unique`
				}
			},
			group: null
		},
		{
			name: 'Group',
			id: 'Group',
			pluginOptions: {
				group: {
					getAggregateValue: (values) => getDistinct(values).length,
					cell: ({ value }) => `${value} unique`
				}
			},
			group: null
		},
		{
			name: 'Subgroup',
			id: 'Subgroup',
			pluginOptions: {
				group: {
					getAggregateValue: (values) => getDistinct(values).length,
					cell: ({ value }) => `${value} unique`
				}
			},
			group: null
		},
		{
			name: 'Type',
			id: 'Type',
			pluginOptions: {
				group: {
					getAggregateValue: (values) => getDistinct(values).length,
					cell: ({ value }) => `${value} unique`
				}
			},
			group: null
		},
		{
			name: 'UniProt ID',
			id: 'UniProt_ID',
			pluginOptions: {
				group: {
					getAggregateValue: (values) => getDistinct(values).length,
					cell: ({ value }) => `${value} unique`
				}
			},
			group: null
		}
	];

	export const getDistinct = (items) => {
		return Array.from(new Set(items));
	};

	const columnGroupList = [];

	let table = new ProteinAnnotationTable(serializedProteinData);
	table.build(pluginMap, columnDefinitionList, columnGroupList);

	console.log(table);

	const { attributes: tableAttributes, headerRows, bodyAttributes, currentPageRows } = table;

	const { sortKeys } = table.pluginStates.sort;
	const { groupByIds } = table.pluginStates.group;
</script>

<table {...$tableAttributes}>
	<thead>
		{#each $headerRows as headerRow (headerRow.id)}
			<Subscribe headerAttributes={headerRow.attrs()} let:headerAttributes>
				<tr {...headerAttributes}>
					{#each headerRow.cells as cell (cell.id)}
						<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
							<th {...attrs} on:click={props.sort.toggle}>
								<Render of={cell.render()} />
								{#if props.sort.order === 'asc'}
									⬇️
								{:else if props.sort.order === 'desc'}
									⬆️
								{/if}
								{#if !props.group.disabled}
									<button on:click={props.group.toggle} class="groupButton">
										{#if props.group.grouped}
											ungroup
										{:else}
											group
										{/if}
									</button>
								{/if}
							</th>
						</Subscribe>
					{/each}
				</tr>
			</Subscribe>
		{/each}
	</thead>
	<tbody {...$bodyAttributes}>
		{#each $currentPageRows as row (row.id)}
			<Subscribe rowAttributes={row.attrs()} let:rowAttributes>
				<tr {...rowAttributes}>
					{#each row.cells as cell (cell.id)}
						<Subscribe attributes={cell.attrs()} let:attributes props={cell.props()} let:props>
							<td
								{...attributes}
								class:group={props.group.grouped}
								class:aggregate={props.group.aggregated}
								class:repeat={props.group.repeated}
							>
								{#if !props.group.repeated}
									<Render of={cell.render()} />
								{/if}
							</td>
						</Subscribe>
					{/each}
				</tr>
			</Subscribe>
		{/each}
	</tbody>
</table>

<style lang="scss">
	table {
		border-spacing: 0;
		border-top: 1px solid black;
		border-left: 1px solid black;
	}

	th,
	td {
		border-bottom: 1px solid black;
		border-right: 1px solid black;
		padding: 0.5rem;
	}

	.groupButton {
		display: block;
		margin: 0 auto;
	}

	.group {
		background: rgb(144, 191, 148);
	}
	.aggregate {
		background: rgb(238, 212, 100);
	}
	.repeat {
		background: rgb(255, 139, 139);
	}
</style>
