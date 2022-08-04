<script>
	import Table from './ui/table.svelte';

	export let proteinData;

	const annotationColumnDefinitions = [
		{ name: 'Gene Symbol', id: 'Gene_Symbol', pluginOptions: {}, group: null },
		{ name: 'Name', id: 'Name', pluginOptions: {}, group: null },
		{ name: 'Branch', id: 'Branch', pluginOptions: {}, group: null },
		{ name: 'Group', id: 'Group', pluginOptions: {}, group: null },
		{ name: 'Subgroup', id: 'Subgroup', pluginOptions: {}, group: null },
		{ name: 'Type', id: 'Type', pluginOptions: {}, group: null },
		{ name: 'UniProt ID', id: 'UniProt_ID', pluginOptions: {}, group: null }
	];
</script>

<Table dataList={proteinData} columnDefinitionList={annotationColumnDefinitions} />
