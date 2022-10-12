import { createTable, createRender } from 'svelte-headless-table';
import { writable } from 'svelte/store';

import TableExpandIndicator from './tableExpandIndicator.svelte';

// { name: viewModel }
export const store = writable({});

export class Table {
	constructor(dataList, name) {
		this.dataListStore = writable(dataList);
		this.name = name;
	}

	update(tableEntry) {
		store.update((existingTables) => ({ ...existingTables, ...tableEntry }));
	}

	build(
		pluginMap = {},
		columnDefinitionList = [{ name: '', id: '', pluginOptions: {}, group: null }],
		columnGroupList = []
	) {
		this.instance = createTable(this.dataListStore, pluginMap);

		let columns;
		if (columnGroupList <= 0) {
			columns = this.instance.createColumns([
				this.instance.display({
					id: 'expanded',
					header: '',
					cell: ({ row }, { pluginStates }) => {
						const { isExpanded, canExpand, isAllSubRowsExpanded } =
							pluginStates.expand.getRowState(row);
						return createRender(TableExpandIndicator, {
							depth: row.depth,
							isExpanded,
							canExpand,
							isAllSubRowsExpanded
						});
					}
				}),
				...columnDefinitionList.map(({ name, id, pluginOptions }) => {
					return this.instance.column({ header: name, accessor: id, plugins: pluginOptions });
				})
			]);
		} else {
			columns = this.instance.createColumns([
				this.instance.display({
					id: 'expanded',
					header: '',
					cell: ({ row }, { pluginStates }) => {
						const { isExpanded, canExpand, isAllSubRowsExpanded } =
							pluginStates.expand.getRowState(row);
						return createRender(TableExpandIndicator, {
							depth: row.depth,
							isExpanded,
							canExpand,
							isAllSubRowsExpanded
						});
					}
				}),
				...columnGroupList.map((groupName) => {
					return this.instance.group({
						header: groupName,
						columns: columnDefinitionList
							.filter((definition) => definition.group === groupName)
							.map(({ name, id, pluginOptions }) => {
								return this.instance.column({ header: name, accessor: id, plugins: pluginOptions });
							})
					});
				})
			]);
		}

		const viewModel = this.instance.createViewModel(columns);

		this.attributes = viewModel.tableAttrs;
		this.headerAttributes = viewModel.tableHeadAttrs;
		this.bodyAttributes = viewModel.tableBodyAttrs;

		this.headerRows = viewModel.headerRows;
		this.rows = viewModel.rows;
		this.originalRows = viewModel.originalRows;
		this.currentPageRows = viewModel.pageRows;

		this.visibleColumns = viewModel.visibleColumns;

		this.pluginStates = viewModel.pluginStates;

		this.update({ [this.name]: this });
	}
}