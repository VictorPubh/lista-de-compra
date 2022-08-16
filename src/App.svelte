<script>
    import List from "./List.svelte";

    const storageLists = localStorage.getItem("lists");
    export let lists = storageLists != undefined ? JSON.parse(storageLists) : [];

    let inputListName, inputListLimit;
    let currentList;

    const addNewList = () => {
        const id = lists.length;
        const name = inputListName == undefined ? `Lista #${id + 1}` : inputListName;
        const limit = inputListLimit == undefined ? 0 : inputListLimit;

        lists.push({
            id,
            name,
            content: [],
            limit
        })

        inputListName = undefined;
        inputListLimit = undefined;
        currentList = id;

        updateState(lists);
    };

    const removeList = (index) => {
        const filterLists = lists.filter(list => list.id !== index);

        for(let i = 0; i < filterLists.length; i++) {
            filterLists[i].id = i;
        }

        updateState(filterLists);
    };

    const updateList = (index, list) => {
        lists[index].content = list;
        updateState(lists);
    }

    const updateState = (newState) => {
        lists = newState;
        localStorage.setItem("lists", JSON.stringify(newState));
    }

    const hasPickall = (a, b) => (a === b && a != 0);

    $: getTotalByIdx = (idx) => {
        let total = 0;

        lists[idx].content.forEach(list => {
            total += list.value * list.quantity;
        });

        return total;
    }

    $: getItems = (idx) => {
        return lists[idx].content.length;
    }

    $: getPicks = (idx) => {
        const picks = lists[idx].content.filter(list => list.purchased === true);
        return picks.length;
    }
</script>

{#if currentList === undefined}
    <div class="screen has-background-info">
        {#if lists.length > 0}
            {#each lists as list, i}
            <div class="list-item notification is-info is-light m-0">
                <span class="trash" on:click={() => removeList(i)}>
                    <i class="gg-trash-empty"></i>
                </span>
                <span on:click={() => currentList = i}>{list.name}</span>
                <span>
                    <span class={`${hasPickall(getItems(i), getPicks(i)) ? "is-pickall" : "not-pickall"}`} on:click={() => currentList = i}>{getItems(i)}/{getPicks(i)}</span>
                </span>

                {#if list.limit > 0}
                    <span class={`tag ${!hasPickall(getItems(i), getPicks(i)) ? "is-info" : "is-success is-light"}`}>
                        {#if hasPickall(getItems(i), getPicks(i))}
                            {`R$ ${(getTotalByIdx(i)).toLocaleString('pt-br', { minimumFractionDigits: 2 })}`}
                        {:else}
                            {`R$ ${(list.limit).toLocaleString('pt-br', { minimumFractionDigits: 2 })}`}
                        {/if}
                    </span>
                {/if}
            </div>
            {/each}
        {:else}
            <div class="not-found">
                <i class="gg-play-list-add has-text-white gg-plus"></i>
                <h1 class="is-size-4 has-text-weight-bold has-text-white">Crie uma nova Lista!</h1>
                <p class="is-size-5 has-text-white">Ooops... Nada foi encontrado.</p>
            </div>
        {/if}

        <div class="mt-4 mb-5" />
    </div>

    <div class="new-list">
        <input class="input" type="text" placeholder="e.g, Compras de Janeiro" bind:value={inputListName} />
        <input class="input" type="number" pattern="[0-9]*" inputmode="decimal" placeholder="300" bind:value={inputListLimit} />
        <button class="button is-success is-light" on:click={addNewList}>
            <i class="gg-play-list-add"></i>
        </button>
    </div>
{:else}
    <List
        listName={lists[currentList].name}
        listData={lists[currentList].content}
        listLimit={lists[currentList].limit}
        on:storage={(e) => updateList(currentList, e.detail.text)}
        on:return={(e) => currentList = undefined}
    />
{/if}

<style>
    .screen {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: .5rem;
        
        width: 100vw;
        height: 100%;
        min-height: 100vh;

        padding: .75rem;
    }
    .list-item {
        display: grid;
        grid-template-columns: min-content 1fr min-content min-content;
        padding: .75rem;
        width: 100%;
        border-radius: .5rem;
    }

    .list-item .trash {
        padding: .5rem .75rem;
    }
    .new-list {
        position: fixed;
        bottom: 0;

        display: grid;
        grid-template-columns: auto 5rem min-content;
        gap: .5rem;

        width: 100vw;
        padding: .5rem;
    }

    .is-pickall {
        background-color: hsl(141, 50%, 48%);
        padding: 0.25rem 0.5rem;
        color: white;
        border-radius: .25rem;
    }

    .not-pickall {
        padding: 0.25rem 0.5rem;
    }

    .gg-plus {
        transform: scale(4.5);
        opacity: .75;
        position: relative;
        top: -3.5rem;
    }

    .not-found {
        margin-top: 3.5rem;
    }
</style>