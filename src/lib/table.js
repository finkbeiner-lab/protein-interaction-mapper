export class Table {
	constructor() {
		this.instance;

		this.attributes;
		this.headerAttributes;
		this.rowAttributes;

		this.headerRows;
		this.rows;
		this.originalRows;
		this.currentPageRows;

		this.visibleColumns;

		this.pluginStates;
	}

	build(
		dataList = [],
		pluginMap = {},
		columnDefinitionList = [{ name: '', id: '', pluginOptions: {}, group: null }],
		columnGroupList = []
	) {
		import { createTable } from 'svelte-headless-table';

		this.instance = createTable(dataList, pluginMap);

		let columns;
		if (columnGroupList <= 0) {
			columns = this.instance.createColumns(
				columnDefinitionList.map(({ name, id, pluginOptions }) => {
					return this.instance.column({ header: name, accessor: id, plugins: pluginOptions });
				})
			);
		} else {
			columns = this.instance.createColumns(
				columnGroupList.map((groupName) => {
					return this.instance.group({
						header: groupName,
						columns: columnDefinitionList
							.filter((definition) => definition.group === groupName)
							.map(({ name, id, pluginOptions }) => {
								return this.instance.column({ header: name, accessor: id, plugins: pluginOptions });
							})
					});
				})
			);
		}

		const viewModel = this.instance.createViewModel(columns);

		this.attributes = viewModel.tableAttrs;
		this.headerAttributes = viewModel.tableHeadAttrs;
		this.rowAttributes = viewModel.tableBodyAttrs;

		this.headerRows = viewModel.headerRows;
		this.rows = viewModel.rows;
		this.originalRows = viewModel.originalRows;
		this.currentPageRows = viewModel.pageRows;

		this.visibleColumns = viewModel.visibleColumns;

		this.pluginStates = viewModel.pluginStates;
	}
}
