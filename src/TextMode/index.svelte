<script>
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";
    import { lists, listingIndex, textMode } from "../Store/globals";
    export let items;

    let textArea;

    const getTextByItems = () => {
        let output = "";

        if (items.limit > 0) output += `Limite: ${items.limit}\r\n\r\n`

        items.content.forEach(item => {
            let endString = `= ${item.value}\r\n`;

            if (item.quantity >= 12) {
                endString = `== ${item.value * item.quantity}\r\n`;
            }

            if (item.value <= 0) {
                endString = "\r\n";
            }
            
            output += `${item.quantity}x ${item.name} ${endString}`;
        });

        return output;
    };
    
    let value = "";

    onMount(() => {
        value = getTextByItems();
    });

    $: getObjectByText = () => {
        const mapOutput = value.split("\n");
        const contentOutput = [];

        mapOutput.forEach((item, i) => {
            let Object = {};
            let activated = false;

            if (item != "" && item != undefined) activated = true;

            if (item.toLocaleLowerCase().includes("limite:")) {
                const limitIndex = item.indexOf(":");
                const limitCandidate = +item.slice(limitIndex + 1);

                if (!isNaN(limitCandidate)) {
                    $lists[$listingIndex].limit = limitCandidate;
                    lists.set($lists);

                    activated = false;
                }
            }

            if (item.includes('x')) {
                const quantityLimit = item.indexOf("x");
                const quantityCadidate = +item.slice(0, quantityLimit);
                let quantityValue = 1;

                if (!isNaN(quantityCadidate)) {
                    quantityValue = quantityCadidate;
                    item = item.slice(quantityLimit + 1);
                }

                activated = true;
                Object.quantity = quantityValue;
            } else {
                Object.quantity = 1;
            }

            if (item.includes("==")) {
                const itemInfo = item.split("==");
                const totalCandidate = +(itemInfo[1].replace(",", "."));

                if (!isNaN(totalCandidate)) {
                    Object.purchased = true;
                    Object.value = totalCandidate / Object.quantity;
                    item = itemInfo[0]
                }
            } else {
                if (item.includes("=")) {
                    const itemInfo = item.split("=");
                    const valueCandidate = +(itemInfo[1].replace(",", "."));
                    let value = 0;

                    if (!isNaN(valueCandidate)) {
                        value = valueCandidate;
                        item = itemInfo[0]
                    }

                    activated = true;
                    Object.purchased = true;
                    Object.value = value;
                } else {
                    Object.purchased = false;
                    Object.value = 0;
                }
            }

            Object.name = item.trim();
            if (activated) contentOutput.push(Object);
        });

        contentOutput.map((out, i) => {
            out.id = i;
        });

        return contentOutput;
    }

    const updateLists = () => {
        const parsedText = getObjectByText();

        if(parsedText.length > 0) {
            $lists[$listingIndex].content = parsedText;
        }

        textMode.set(false);
    }

    onMount(() => {
        textArea.focus();
    })
</script>

<main in:fade out:fade>
    <div class="save">
        <button class="button is-info" on:click={updateLists}>
            Atualizar Listagem
        </button>
    </div>
    <textarea bind:this={textArea} bind:value />
</main>

<style>
    textarea {
        width: 100%;
        height: 85vh;
        line-height: 1.5;
        border-radius: 0;
        border: 0;
        outline: none;
        padding: 0 1.5rem;
        font-size: 1.25rem;
        text-align: left;
    }

    .save {
        position: fixed;
        bottom: 0;
        z-index: 999;
        
        display: flex;
        justify-content: center;
        align-items: center;

        width: 100%;

        padding: .75rem;
    }
</style>