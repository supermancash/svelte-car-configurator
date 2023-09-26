<script>
    export let data;
    console.log(data.configuration);
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    export let openedState = data.selectables.componentCategories.map(() => false);
    console.log(openedState)

    let sum = data.modelData.priceInformation.price;
    data.configuration.eqAdd.forEach(eq => sum += eq.priceInformation.price)
</script>

<div>
    <h1 style="text-align: center">Confirmation page</h1>
    <h2>{data.modelData.name}  <span
            style="float: right">Final Price: {formatter.format(sum)}  </span>
    </h2>

    {#each data.selectables.componentCategories as category}
        <br/>
        <h2 on:click={() => openedState[data.selectables.componentCategories.findIndex(el=> el.categoryId === category.categoryId)] = !openedState[data.selectables.componentCategories.findIndex(el=> el.categoryId === category.categoryId)]}
            style="border-top: 1px solid">{category.categoryName}
            <span style="float: right">{openedState[data.selectables.componentCategories.findIndex(el => el.categoryId === category.categoryId)] ? "X" : "↓"}</span>
        </h2>

        {#if openedState[data.selectables.componentCategories.findIndex(el => el.categoryId === category.categoryId)]}
            {#each
                Object.entries(data.selectables.vehicleComponents) as code}
                {#if code[1].componentType === category.categoryName &&
                !code[1].hidden && !code[1].pseudoCode && code[1].selected && data.configuration.eqRem.findIndex(el => el.id === code[0]) < 0}
                    <div style="border-bottom: 1px solid">
                        <br/>
                        <b>{code[0]}</b>
                        - {code[1].name}
                        <div style="float: right">
                            <b>{formatter.format(code[1].priceInformation.price)}</b>
                        </div>

                    </div>
                {/if}
            {/each}
            {#each data.configuration.eqAdd as eq}
                {#if eq.componentType === category.categoryName}
                    <div style="border-bottom: 1px solid; color:green">
                        <br/>
                        <b>+</b>
                        <b>{eq.id}</b>
                        - {eq.name}
                        <div style="float: right">
                            <b>{eq.priceInformation.netPrice} USD</b>
                        </div>

                    </div>
                {/if}
            {/each}
        {/if}

    {/each}
    <br/>
    <br/><br/><br/><br/>
</div>



