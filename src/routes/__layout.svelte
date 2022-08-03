<script lang="typescript">
	import '@fontsource/recursive/900.css';
	import '@fontsource/recursive/300.css';

	const name = [
		{ full: 'protein', acronym: 'Prote' },
		{ full: 'interaction', acronym: 'In' },
		{ full: 'mapper', acronym: 'Map' }
	];
</script>

<svelte:head>
	<title>ProteInMap</title>
	<meta name="robots" content="noindex nofollow" />
	<html lang="en" />
</svelte:head>

<main>
	<header>
		<nav class="nav">
			<div class="logo">
				<a class="logo__link" href="/">
					<div class="logo__animator">
						{#each name as word}
							<abbr class="logo__{word.full}">
								<span>{word.acronym}</span>
							</abbr>
						{/each}
					</div>
				</a>
			</div>

			<div class="nav__items">
				<a class="nav__link" href="/download">download</a>
			</div>
		</nav>
	</header>
	<slot />
</main>

<footer>
	<div>footer</div>
</footer>

<style lang="scss">
	:global {
		@import '../styles/color';
		html,
		body {
			margin: 0;
			height: 100%;
			overflow: hidden;
		}
	}

	main {
		display: flex;
		flex-direction: column;
		height: 100vh;
	}

	main.preload {
		animation-duration: 0;
	}

	header {
		all: unset;
		display: block;
		background-image: linear-gradient(to left, var(--gladstone-blue), var(--northwestern-purple));
		margin: 0;
		padding: 0;
	}

	.nav {
		display: flex;
		flex-direction: row;
		align-items: center; /* aligns links vertically */
		top: 0;
		left: 0;
		width: 100%;
		&__items {
			display: flex;
			column-gap: 20%;
			font-family: 'Lexand Mega', sans-serif;
			font-weight: 300;
			padding: 0 5rem;
		}
		&__link {
			color: var(--luminous-amber);
		}
	}

	.logo {
		position: relative;
		flex-grow: 1;
		padding: 0.75rem;
		font-family: 'Recursive', sans-serif;
		letter-spacing: 0.25rem;
		font-weight: 800;
		font-size: 3rem;
		white-space: nowrap;

		& abbr {
			display: flex;
		}

		&__link {
			text-decoration: none;
		}
		&__animator {
			filter: blur(0);
			display: flex;
		}

		&__protein {
			color: var(--radiant-orange);
		}
		&__protein:hover + &__interaction span {
			animation: 0.2s forwards ease-out fadeProtein;
			animation-direction: reverse;
			display: inline-block;
		}
		&__protein:hover + &__interaction:before {
			content: 'in';
			display: inline-block;
			position: absolute;
			width: max-content;
			color: var(--radiant-orange);
			animation: 0.5s forwards ease-in-out fadeProtein;
		}
		&__protein + &__interaction span {
			animation: 0.2s forwards ease-out reverseFadeProtein;
			animation-direction: reverse;
		}

		&__interaction {
			display: flex;
			opacity: 1;
			color: var(--luminous-amber);
		}
		&__interaction:after {
			content: '';
			animation: 0.15s reverseTypewriteInteraction, 0.2s forwards ease-out reverseFadeProtein;
		}
		&__interaction:hover:after {
			content: '';
			animation: 0.2s forwards typewriteInteraction, 0.25s forwards ease-in-out fadeProtein;
		}

		&__mapper {
			color: var(--cerulean-crayola);
		}
	}

	@keyframes fadeProtein {
		from {
			filter: blur(0.1em);
			opacity: 0;
		}
		to {
			filter: blur(0);
			opacity: 1;
		}
	}
	@keyframes reverseFadeProtein {
		from {
			filter: blur(0);
			opacity: 1;
		}
		to {
			filter: blur(0.1em);
			opacity: 0;
		}
	}
	@keyframes typewriteInteraction {
		1% {
			content: 't';
		}
		12.5% {
			content: 'te';
		}
		25% {
			content: 'ter';
		}
		37.5% {
			content: 'tera';
		}
		50% {
			content: 'terac';
		}
		62.5% {
			content: 'teract';
		}
		75% {
			content: 'teracti';
		}
		87.5% {
			content: 'teractio';
		}
		100% {
			content: 'teraction';
		}
	}
	@keyframes reverseTypewriteInteraction {
		0% {
			content: 'teraction';
		}
		12.5% {
			content: 'teractio';
		}
		25% {
			content: 'teracti';
		}
		37.5% {
			content: 'teract';
		}
		50% {
			content: 'terac';
		}
		62.5% {
			content: 'tera';
		}
		75% {
			content: 'ter';
		}
		87.5% {
			content: 'te';
		}
		100% {
			content: 't';
		}
	}
</style>
