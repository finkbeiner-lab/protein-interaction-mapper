import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

interface ValueMap {
	header: string;
	value: string;
}

interface Column {
	header: string;
	accessor: string;
	pluginOptions: object;
}

export class Table {
	constructor(
		public valueMap: Writable<ValueMap[]> = writable([{ header: '', value: '' }]),
		public columns: Writable<Column[]> = writable([
			{ header: '', accessor: '', pluginOptions: {} }
		]),
		public plugins: object = {}
	) {}
}
