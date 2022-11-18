<script>
	import { onMount, beforeUpdate, afterUpdate } from 'svelte';
	export let parentSize, workspaceSize, tableRows, tableSchema;
	let doResize = false;
	let oldSize, treeMap, Plotly;

	onMount(async () => {
		Plotly = await import('plotly.js-dist-min');

		// export let labels, parents, values;

		// var labels = ['Annotations', 'Gene Symbol', 'Seth', 'Enos', 'Noam', 'Abel', 'Awan', 'Enoch', 'Azura'];
		// var parents = ['', 'Annotations', 'Annotations', 'Seth', 'Seth', 'Eve', 'Eve', 'Awan', 'Eve'];

		console.log(tableRows);

		const headers = tableRows.rows[0].getAllCells().map((cell) => {
			return cell.column.columnDef.header;
		});

		console.log(headers);

		const headerParent = () => {
			let headerParent = [];
			for (let i = 0; i < headers.length; i++) {
				headerParent.push('Annotations');
			}
			return headerParent;
		};
		let labels = ['Annotations'].concat(headers),
			parents = [''].concat(headerParent());

		tableRows.rows.filter((row) => {
			const rowCells = row.getAllCells();
			let valuesInColumn = {};

			rowCells.forEach((cell) => {
				const header = cell.column.columnDef.header;

				if (!valuesInColumn.hasOwnProperty(header)) {
					const value = cell.getValue();
					valuesInColumn[header] = new Set();
					//console.log(!valuesInColumn.has(value));
					if (!valuesInColumn[header].has(value) & (value != '')) {
						valuesInColumn[header].add(value);
						labels.push(value);
						parents.push(header);
					}
				}
			});
		});

		console.log(parents);

		console.log(labels);

		var data = [
			{
				type: 'treemap',
				labels: labels,
				parents: parents,
				//values: [10, 14, 12, 10, 2, 6, 6, 1, 4],
				//textinfo: 'label+value+percent parent+percent entry',
				//domain: { x: [0, 0.48] },
				outsidetextfont: { size: 20, color: '#377eb8' },
				marker: { line: { width: 2 } },
				pathbar: { visible: true }
			}
		];
		var layout = {
			paper_bgcolor: 'rgba(0,0,0,0)',
			margin: {
				l: 0,
				r: 0,
				b: 0,
				t: 24,
				pad: 10
			},
			hovermode: 'x unified'
		};

		var config = { responsive: true, displayModeBar: false };

		Plotly.react(treeMap, data, layout, config);
	});

	beforeUpdate(() => {
		doResize = false ? oldSize === workspaceSize : true;
	});

	afterUpdate(async () => {
		if (doResize && Plotly) {
			const scaleFactor = parentSize.width / (parentSize.width * 1.2 - Math.sqrt(parentSize.width));
			const containerProportion = workspaceSize.control / 100;
			const update = {
				width: Math.floor(parentSize.width * containerProportion * scaleFactor)
			};
			Plotly.relayout(treeMap, update);
			oldSize = workspaceSize;
		}
	});
</script>

<div bind:this={treeMap} />

<style lang="scss">
	:global {
		.hovertext {
			transform: rotate(180);
		}
	}
</style>
