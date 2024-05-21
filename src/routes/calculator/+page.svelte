<script>
    import Link from "../../lib/Link.svelte";

    let gralatsPerTrochus = 5;
    let type = "shells";

    const s = (x) => ({ label: x, placeholder: "0", bindValue: "" });
    const sellables = {
        crab: [s("Red Crab"), s("Blue Crab"), s("Black Crab"), s("Green Crab"), s("Yellow Crab")],
        trash: [s("Tire"), s("Paper"), s("Newspaper"), s("Broken Bottle")],
        shells: [s("Scallop"), s("Starfish"), s("Trochus"), s("Aerolata"), s("Sand Dollar")],
        mushrooms: [s("Red Mushroom"), s("Plain Mushroom"), s("Yellow Mushroom"), s("Purple Mushroom")],
    };

    const sellablesPrice = {
        shells: {
            sandDollar: 5,
            scallop: 5,
            trochus: 3,
            aerolata: 3,
            starfish: 7,
        },
        trash: {
            tire: 6,
            paper: 4,
            newspaper: 4,
            brokenBottle: 5,
        },
        mushrooms: {
            redMushroom: 5,
            plainMushroom: 5,
            yellowMushroom: 5,
            purpleMushroom: 5,
        },
        crab: {
            blackCrab: 6,
            blueCrab: 6,
            greenCrab: 6,
            redCrab: 6,
            yellowCrab: 6,
        },
    };

    const result = {
        gralats: 0,
        trochusWorth: 0,
    };

    function toCamelCase(str) {
        return str
            .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => (index === 0 ? word.toLowerCase() : word.toUpperCase()))
            .replace(/\s+/g, "");
    }

    function calculatePrice() {
        result.gralats = 0;
        result.trochusWorth = 0;

        result.gralats = sellables[type].reduce(
            (acc, item) => acc + item.bindValue * sellablesPrice[type][toCamelCase(item.label)], // a bit dirty lol
            0,
        );

        result.trochusWorth = result.gralats / gralatsPerTrochus;
    }

		function clearResults() {
			result.gralats = 0;
			result.trochusWorth = 0;
		}
</script>

<svelte:head>
    <title>Faye Keller · Graal Sellables Calculator</title>
    <meta name="description" content="A calculator for Graal Era sellables" />
</svelte:head>

<main>
    <h1>Graal Sellables Calculator</h1>

    <br />

    <div>
        <label for="gralatsPerTrochus">Ratio</label>
        <input bind:value={gralatsPerTrochus} type="number" on:input={calculatePrice} />
    </div>
    <div>
        <label for="type">Type</label>
        <select id="type" bind:value={type} on:change={clearResults}>
            <option value="crab">Crab</option>
            <option value="shells">Shells</option>
            <option value="trash">Trash</option>
            <option value="mushrooms">Mushrooms</option>
        </select>
    </div>

    <br />

    <div>
        {#key type}
            {#each Object.entries(sellables[type]) as [key, item]}
                <div>
                    <label for={key}>{item.label}</label>
                    <input bind:value={item.bindValue} placeholder={item.placeholder} on:input={calculatePrice} type="number" />
                </div>
            {/each}
        {/key}
    </div>

    <br />

    <p>
        Your <span class="highlight">sellables</span> are worth
        <span class="highlight">{result.gralats} gralats</span>, for a total of
        <span class="highlight">{result.trochusWorth} trochus</span>
    </p>

    <footer class="footer">
        Credit to <Link href="https://github.com/nouun" text="nouun"/> for fixing a
        <span class="highlight">massive</span> issue with this calculator
    </footer>
</main>

<style>
    input,
    select {
        background-color: transparent;
        border: none;

        padding: 0.1rem;
        margin-left: 0.3rem;
    }

    .footer {
        position: fixed;
        left: 2rem;
        bottom: 2rem;
        width: 100%;
    }
</style>
