<script context="module">
	export const load = async ({ fetch, params }) => {
		try {
			const response = await fetch('/data/query', {
				method: 'POST',
				credentials: 'same-origin',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					query: `{
							allProteins {
								Gene_Symbol
								Name
								Branch
								Class
								Group
								Subgroup
								Type
								Distinguishing_Domains
								UniProt_ID
							}
						}
					`
				})
			});
			if (response.ok) {
				const resolvedQuery = await response.json();
				if (resolvedQuery.hasOwnProperty('errors')) {
					throw new Error(`query failed: ${JSON.stringify(resolvedQuery)}`);
				}

				return {
					props: { resolvedQuery }
				};
			} else {
				throw new Error(`protein data request failed : ${error}`);
			}
		} catch (error) {
			throw new Error(`Server could not complete request : ${error}`);
		}
	};
</script>

<script>
	import ProteinAnnotationTable from '$lib/ui/table/proteinAnnotationTable.svelte';
	import { Pane, Splitpanes } from 'svelte-splitpanes';
	import TreeMap from '$lib/ui/plot/treeMap.svelte';
	import { onMount } from 'svelte';

	import { get } from 'svelte/store';

	export let resolvedQuery;
	let annotationTable, workspace, workspaceSize;

	function updateWorkspaceSize(dimensions) {
		workspaceSize = {
			control: dimensions.detail[0].size,
			view: dimensions.detail[1].size
		};
	}

	let currentSize;
	onMount(() => {
		// default dimensions
		currentSize = { width: workspace.clientWidth, height: workspace.clientHeight };
		workspaceSize = { control: 20, view: 85 };
		const resizeObserver = new ResizeObserver((entries) => {
			// We're only watching one element
			const entry = entries.at(0);

			// Get the block size
			currentSize = {
				width: entry.contentRect.width,
				height: entry.contentRect.height
			};
		});

		resizeObserver.observe(workspace);

		// This callback cleans up the observer
		return () => resizeObserver.unobserve(workspace);
	});
</script>

<section class="workspace" bind:this={workspace}>
	<Splitpanes
		theme="workspace-theme"
		style="height: 100%"
		on:resize={updateWorkspaceSize}
		dblClickSplitter={true}
	>
		<Pane size={20} minSize={0} class="workspace__controls">
			{#if $annotationTable}
				<div class="workspace__treeMap" charset="utf-8">
					<TreeMap parentSize={currentSize} {workspaceSize} />
				</div>
			{/if}
		</Pane>
		<Pane size={80} minSize={25} class="workspace__grid">
			<div class="workspace__table">
				<ProteinAnnotationTable
					bind:tableState={annotationTable}
					proteinData={resolvedQuery.data.allProteins}
				/>
			</div>
		</Pane>
	</Splitpanes>
</section>

<style lang="scss">
	:global {
		.workspace {
			height: 100%;

			&__grid {
				overflow: scroll;
			}
			&__table {
				height: fit-content;
			}
		}
		.splitpanes.workspace-theme {
			.splitpanes__pane {
				background-color: #f2f2f2;
			}
			.splitpanes__splitter {
				box-sizing: border-box;
				position: relative;
				flex-shrink: 0;
				padding: 0 4px;
				transition: all 0.25s;
				background-color: var(--gladstone-blue);

				&:before,
				&:after {
					content: '';
					position: absolute;
					top: 50%;
					left: 50%;
					background-color: var(--luminous-amber);
					transition: background-color 0.25s;
				}
				&:hover {
					filter: opacity(80%);
				}
				&:active:before,
				&:active:after {
					background-color: var(--gladstone-blue);
				}
				&:active {
					padding: 0 4.5px;
					transition: padding 0.3s;
					filter: opacity(70%);
				}

				&:hover:before,
				&:hover:after {
					background-color: var(--luminous-amber);
				}

				&:first-child {
					cursor: auto;
				}
			}
		}
		.workspace-theme {
			&.splitpanes .splitpanes .splitpanes__splitter {
				z-index: 1;
			}
			&.splitpanes--vertical > .splitpanes__splitter,
			.splitpanes--vertical > .splitpanes__splitter {
				width: 7px;
				border-left: 1px solid #eee;
				margin-left: -1px;
				cursor: col-resize;
				&:before,
				&:after {
					transform: translateY(-50%);
					width: 1px;
					height: 30px;
				}
				&:before {
					margin-left: -2px;
				}
				&:after {
					margin-left: 1px;
				}
			}
			&.splitpanes--horizontal > .splitpanes__splitter,
			.splitpanes--horizontal > .splitpanes__splitter {
				height: 7px;
				border-top: 1px solid #eee;
				margin-top: -1px;
				cursor: row-resize;
				&:before,
				&:after {
					transform: translateX(-50%);
					width: 30px;
					height: 1px;
				}
				&:before {
					margin-top: -2px;
				}
				&:after {
					margin-top: 1px;
				}
			}
		}
	}
</style>
