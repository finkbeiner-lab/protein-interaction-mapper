<script>
	import { Subscribe, Render } from 'svelte-headless-table';
	import { Table } from '$lib/ui/table';

	export let dataList;
	export let pluginMap;
	export let columnDefinitionList;
	export let columnGroupList;

	let table = new Table(dataList);
	table.build(pluginMap, columnDefinitionList, columnGroupList);

	const { attributes: tableAttributes, headerRows, bodyAttributes, currentPageRows } = table;
</script>

<table {...$tableAttributes}>
	<thead>
		{#each $headerRows as headerRow (headerRow.id)}
			<Subscribe headerAttributes={headerRow.attrs()} let:headerAttributes>
				<tr {...headerAttributes}>
					{#each headerRow.cells as cell (cell.id)}
						<Subscribe attributes={cell.attrs()} let:attributes props={cell.props()} let:props>
							<th {...attributes}>
								<Render of={cell.render()} />
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
						<Subscribe attributes={cell.attrs()} let:attributes>
							<td {...attributes}>
								<Render of={cell.render()} />
							</td>
						</Subscribe>
					{/each}
				</tr>
			</Subscribe>
		{/each}
	</tbody>
</table>
