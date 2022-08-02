import { writable } from 'svelte/store';

export class Table {
	constructor(
		valueMap = writable([{ header: '', value: '' }]),
		columns = writable([{ header: '', accessor: '', pluginOptions: {} }]),
		plugins = {}
	) {}
}
