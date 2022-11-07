<script>
	import { get } from 'svelte/store';

	export let context;
	console.log(context);
</script>

<span>{context.cell.getValue()}</span>

<style>
	/* your styles go here */
</style>
