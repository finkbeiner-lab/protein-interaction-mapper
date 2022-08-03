export class Table {
	constructor() {
		this.instance;

		this.attributes;
		this.headerAttributes;
		this.rowAttributes;

		this.headerRows;
		this.rows;
		this.currentPageRows;

		this.columns;
		this.columnDefinitionList;
		this.columnGroupList;
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

		if (columnGroupList <= 0) {
			this.columns = this.instance.createColumns(
				columnDefinitionList.map(({ name, id, pluginOptions }) => {
					return this.instance.column({ header: name, accessor: id, plugins: pluginOptions });
				})
			);
		} else {
			// TODO: create column groups
			this.columns = this.instance.createColumns(
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
	}
}
