<script>
	import { Subscribe, Render } from 'svelte-headless-table';
	import { Table } from '$lib/ui/table';

	let dataList;
	let pluginMap;
	let columnDefinitionList;
	let columnGroupList;

	let table = new Table();
	table.build(dataList, pluginMap, columnDefinitionList, columnGroupList);
</script>

<table {...$table.attributes}>
	<thead>
		{#each $table.headerRows as headerRow (headerRow.id)}
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
	<tbody {...$table.bodyAttributes}>
		{#each $table.pageRows as row (row.id)}
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
