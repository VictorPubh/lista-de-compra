<script>
  import { fade, fly } from "svelte/transition";
  import autoAnimate from "@formkit/auto-animate";

  import { listingIndex, lists } from "../../Store/globals";
  import { navigateTo } from "svelte-router-spa";

  let nameInput, limitInput;

  const goToList = (id) => {
    listingIndex.set(id);
    navigateTo(`listing/${id}`);
  }

  const addNewList = () => {
    const id = $lists.length;
    const name =
      typeof nameInput === "undefined" ? `Lista #${id + 1}` : nameInput;
    const limit = isNaN(limitInput) ? 0 : limitInput;

    $lists.push({
      id,
      name,
      content: [],
      limit,
    });

    // Reset Inputs
    nameInput = undefined;
    limitInput = undefined;

    setTimeout(() => goToList(id), 600);
    lists.set($lists);
  };

  const removeList = (index) => {
    const filterLists = $lists.filter((list) => list.id !== index);

    for (let i = 0; i < filterLists.length; i++) {
      filterLists[i].id = i;
    }

    lists.set(filterLists);
  };

  const hasPickall = (a, b) => a === b && a != 0;

  $: getTotalByIdx = (idx) => {
    let total = 0;

    $lists[idx].content.forEach((list) => {
      total += list.value * list.quantity;
    });

    return total;
  };

  $: getItems = (idx) => {
    return $lists[idx].content.length;
  };

  $: getPicks = (idx) => {
    const picks = $lists[idx].content.filter((list) => list.purchased === true);
    return picks.length;
  };
</script>

<main
  class="has-background-info"
  in:fly={{ x: -500, duration: 340 }}
  out:fly={{ x: -500, duration: 340 }}
>
  <div class="screen">
    {#if $lists.length > 0}
      <ul class="item-lists" use:autoAnimate>
        {#each $lists as list, i}
          <li
            class="list-item notification is-info is-light has-text-weight-bold m-0"
          >
            <span class="trash" on:click={() => removeList(i)}>
              <i class="gg-trash-empty" />
            </span>
            <span class="item-title" on:click={() => goToList(i)}
              >{list.name}</span
            >
            <span>
              <span
                class={`${
                  hasPickall(getItems(i), getPicks(i))
                    ? "is-pickall"
                    : "not-pickall"
                }`}
                on:click={() => goToList(i)}
                >{getItems(i)}/{getPicks(i)}</span
              >
            </span>

            {#if list.limit > 0}
              <span
                class={`tag ${
                  !hasPickall(getItems(i), getPicks(i))
                    ? "is-info"
                    : "is-success is-light"
                }`}
              >
                {#if hasPickall(getItems(i), getPicks(i))}
                  {`R$ ${getTotalByIdx(i).toLocaleString("pt-br", {
                    minimumFractionDigits: 2,
                  })}`}
                {:else}
                  {`R$ ${list.limit.toLocaleString("pt-br", {
                    minimumFractionDigits: 2,
                  })}`}
                {/if}
              </span>
            {/if}
          </li>
        {/each}
      </ul>
    {:else}
      <div class="not-found" in:fade>
        <i class="gg-play-list-add has-text-white gg-plus" />
        <h1 class="is-size-4 has-text-weight-bold has-text-white">
          Crie uma nova Lista!
        </h1>
        <p class="is-size-5 has-text-white">Ooops... Nada foi encontrado.</p>
      </div>
    {/if}

    <div class="mt-4 mb-5" />
  </div>

  <div class="new-list">
    <input
      class="input"
      type="text"
      placeholder="e.g, Compras de Janeiro"
      bind:value={nameInput}
    />
    <input
      class="input"
      type="number"
      pattern="[0-9.,]*"
      inputmode="decimal"
      step="any"
      placeholder="300"
      bind:value={limitInput}
    />
    <button class="button is-success is-light" on:click={addNewList}>
      <i class="gg-play-list-add" />
    </button>
  </div>
</main>

<style lang="scss">
  .screen {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    width: 100vw;
    height: 100%;
    min-height: 100vh;
    padding: 0.75rem;
  }

  .list-item {
    display: grid;
    grid-template-columns: min-content 1fr min-content min-content;
    align-items: center;
    padding: 0.75rem;
    width: 100%;
    border-radius: 0.5rem;

    .trash {
      padding: 0.5rem 0.75rem;
    }
  }

  .new-list {
    position: fixed;
    bottom: 0;
    display: grid;
    grid-template-columns: auto 5rem min-content;
    gap: 0.5rem;
    width: 100vw;
    padding: 0.5rem;

    input {
      border: 0;
      border-radius: 0.75rem;
      padding: 1.5rem 1rem;
    }

    .button {
      border: 0;
      border-radius: 0.75rem;
      padding: 1.5rem 1rem;
    }
  }

  .is-pickall {
    background-color: hsl(141, 50%, 48%);
    padding: 0.25rem 0.5rem;
    color: white;
    border-radius: 0.25rem;
  }

  .not-pickall {
    padding: 0.25rem 0.5rem;
  }

  .gg-plus {
    transform: scale(4.5);
    opacity: 0.75;
    position: relative;
    top: -3.5rem;
  }

  .not-found {
    margin-top: 3.5rem;
  }

  ul.item-lists {
    width: 100%;
    display: grid;
    gap: 0.75rem;

    li {
      height: 3.75rem;
    }

    .item-title {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
</style>
