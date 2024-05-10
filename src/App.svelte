<script>
  import Link from './lib/Link.svelte'
</script>

<main>
	<div>
		<h1>Faye Keller</h1>
		<p>
			Enchantress of <span class="highlight">digital ecosystems</span>
		</p>
		<p>
			<span class="highlight">DevOps</span> sorcery and <span class="highlight">backend</span> wizardry.
		</p>

		<br />

		<p>
		You can contact me on
		<Link
		href="https://discord.com/users/1057755295574671421 />"
		text="Discord"
		/>
		<br />
		My code is on
		<Link href="https://github.com/drainpixie" text="Github" />
		</p>
	<div>

	<br />

  <div>
		<h1>Other</h1>
		<p>
			A <span class="highlight">Graal Era</span> <Link open={false} href="/calculator" text="sellables calculator" />
		</p>
	</div>
</main>

<style>
</style>
