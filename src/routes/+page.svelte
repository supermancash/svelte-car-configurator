<script>
    export let data;

    import mercedes from '$lib/assets/mercedes.jpeg';

    export let equipmentAdded = [];
    export let equipmentRemoved = [];

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });


    const handleCheckBoxChange = (e, code, category) => {
        if (code.selected && !e.currentTarget.checked) {
            if (category.cardinality === "EXACTLY_ONE") {
                alert("You must choose at least one type of " + category.categoryName);
                return document.getElementById(code.id).checked = true;
            }
            equipmentRemoved.push(code);
        }

        if (code.selected && e.currentTarget.checked) {
            if (category.cardinality === "EXACTLY_ONE") {
                const index = equipmentAdded.findIndex(el => el.componentType === category.categoryName);
                if (index > -1) {
                    document.getElementById(equipmentAdded[index].id).checked = false
                    equipmentAdded.splice(index, 1);
                }
            }
            equipmentRemoved.splice(equipmentRemoved.indexOf(code), 1);
        }


        if (!code.selected && e.currentTarget.checked) {
            if (category.cardinality === "EXACTLY_ONE") {
                const index = equipmentAdded.findIndex(el => el.componentType === category.categoryName);
                if (index > -1) document.getElementById(equipmentAdded.splice(index, 1)[0].id).checked = false;
                if (index === -1) {
                    equipmentRemoved.push(Object.entries(data.selectables.vehicleComponents).filter(
                        el => el[1].selected === true && category.categoryName === el[1].componentType)[0][1]);
                    document.getElementById(
                        Object.entries(data.selectables.vehicleComponents).filter(
                            el => el[1].selected === true && category.categoryName === el[1].componentType)[0][0]
                    ).checked = false;
                }
            }
            equipmentAdded.push(code);
        }

        if (!code.selected && !e.currentTarget.checked) {
            if (category.cardinality === "EXACTLY_ONE") {
                document.getElementById(
                    Object.entries(data.selectables.vehicleComponents).filter(
                        el => el[1].selected === true && category.categoryName === el[1].componentType)[0][0]
                ).checked = true;
                equipmentRemoved.splice(
                    equipmentRemoved.indexOf(el => el.componentType === category.categoryName),
                    1);
            }
            equipmentAdded.splice(equipmentAdded.findIndex(el => el.id === code.id), 1);
        }
        console.log(equipmentAdded);
        console.log(equipmentRemoved)

    }

    const handleProceed = async () => {
        const res = await fetch('/api/saveconfiguration', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                sessionid: data.sessionid,
                equipmentAdded: equipmentAdded,
                equipmentRemoved: equipmentRemoved
            })
        });
        window.location = "/checkout";
    }


</script>

<div>
    <h1 style="text-align: center">Configuration page</h1>
    <div style="margin: auto; width: 10vw">
        <h3>
            Powered by
            <span style="color: #FF3E00">
                        Sveltekit
            </span>
        </h3>
    </div>
    <img style="width: 90vw; display: block;margin-left: auto;margin-right: auto;"
         src={mercedes} alt="Picture of a mercedes">
    <h1>{data.modelData.name}</h1>
    {#each data.selectables.componentCategories as category}
        <br/>
        <h2>{category.categoryName}</h2>
        {#each
            Object.entries(data.selectables.vehicleComponents) as code}
            {#if code[1].componentType === category.categoryName && !code[1].hidden && !code[1].pseudoCode}
                <div style="border-bottom: 1px solid">
                    <br/>
                    <b>{code[0]}</b>
                    - {code[1].name}
                    <div style="float: right">
                        <b>{formatter.format(code[1].priceInformation.price)}</b>
                        <input
                                type="checkbox"
                                id={code[0]}
                                checked={code[1].selected}
                                on:change={(e) => handleCheckBoxChange(e, code[1], category)}
                        />
                    </div>

                </div>
            {/if}
        {/each}
    {/each}
    <br/>
    <button style="float: right" on:click={handleProceed}>Proceed to Checkout</button>
    <br/><br/><br/><br/>
</div>



