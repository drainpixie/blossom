<script>
    let gralatsPerTrochus = 5;
    let type = "shells";

    const sellables = {
        shells: [
            { label: "Sand Dollar", bindValue: 0 },
            { label: "Aerolata", bindValue: 0 },
            { label: "Starfish", bindValue: 0 },
            { label: "Scallop", bindValue: 0 },
            { label: "Trochus", bindValue: 0 },
        ],
        trash: [
            { label: "Tire", bindValue: 0 },
            { label: "Paper", bindValue: 0 },
            { label: "Newspaper", bindValue: 0 },
            { label: "Broken Bottle", bindValue: 0 },
        ],
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
    };

    const result = {
        gralats: 0,
        trochusWorth: 0,
    };

    function toCamelCase(str) {
        return str
            .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
                index === 0 ? word.toLowerCase() : word.toUpperCase(),
            )
            .replace(/\s+/g, "");
    }

    function calculatePrice() {
        result.gralats = 0;
        result.trochusWorth = 0;

        result.gralats = sellables[type].reduce(
            (acc, item) =>
                acc +
                item.bindValue * sellablesPrice[type][toCamelCase(item.label)], // a bit dirty lol
            0,
        );

        result.trochusWorth = result.gralats / gralatsPerTrochus;
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
        <input
            bind:value={gralatsPerTrochus}
            type="number"
            on:input={calculatePrice}
        />
    </div>
    <div>
        <label for="type">Type</label>
        <select id="type" bind:value={type}>
            <option value="shells">Shells</option>
            <option value="trash">Trash</option>
        </select>
    </div>

    <br />

    <div>
        {#key type}
            {#each Object.entries(sellables[type]) as [key, item]}
                <div>
                    <label for={key}>{item.label}</label>
                    <input
                        bind:value={item.bindValue}
                        on:input={calculatePrice}
                        type="number"
                    />
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
</main>

<style>
    input,
    select {
        background-color: transparent;
        border: none;

        padding: 0.1rem;
        margin-left: 0.3rem;
    }
</style>
