<script>
	import { onMount, beforeUpdate, afterUpdate } from 'svelte';
	export let parentSize, workspaceSize;
	let doResize = false;
	let oldSize, treeMap, Plotly;

	onMount(async () => {
		Plotly = await import('plotly.js-dist-min');

		// export let labels, parents, values;

		var labels = ['Eve', 'Cain', 'Seth', 'Enos', 'Noam', 'Abel', 'Awan', 'Enoch', 'Azura'];
		var parents = ['', 'Eve', 'Eve', 'Seth', 'Seth', 'Eve', 'Eve', 'Awan', 'Eve'];
		var data = [
			{
				type: 'treemap',
				labels: labels,
				parents: parents,
				values: [10, 14, 12, 10, 2, 6, 6, 1, 4],
				textinfo: 'label+value+percent parent+percent entry',
				domain: { x: [0, 0.48] },
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
			const scaleFactor = parentSize.width / (parentSize.width * 0.6 - Math.sqrt(parentSize.width));
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
