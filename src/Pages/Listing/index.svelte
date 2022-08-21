<script>
  import autoAnimate from "@formkit/auto-animate";
  import Tabs from "./Tabs/index.svelte";
  import List from "./List/index.svelte";

  import {
    lists,
    listingTour,
    listingItemTour,
    reassemble,
  } from "../../Store/globals";

  import listingGuideline from "./guideline.json";
  import Guideline from "../../Components/Guideline.svelte";

  import { isTrue } from "../../Utils/booleanOperators";
  import { ListingServices } from "./services";
  import { getFormatMoney } from "../../Utils/moneyOperators";
  import { ListingTabServices } from "./Tabs/services";
  import { ListServices } from "./List/services";
  import { onMount } from "svelte";
  import { listingFocused } from "./store";

  let firstItemAdd = false;

  export let currentRoute;
  const params = {};

  const { id } = currentRoute.namedParams;

  const list = $lists[id];

  // Obs: Only for output, don't use how input.
  export const listingServices = new ListingServices(list);
  export const listingTabServices = new ListingTabServices();
  export const listServices = new ListServices(list.content);

  const listName = list.name;
  let listData = list.content;
  let listLimit = list.limit;

  $: hasLimit = listLimit > 0;

  let currentQuantity;
  let currentProduct;
  let currentValue;

  const addItem = () => {
    listServices.addItem();
  };

  $: valueAvailable = listingServices.getAvailable(false);
  $: valuePicked = listingServices.getPicked(false);

  $: filterListing = listingTabServices.filterTab(listData);

  onMount(() => {
    listingFocused.set(list);
  });
</script>

{#key $reassemble}
  <main class="screen">
    <Tabs {currentRoute} />

    <div class="table-container">
      {#if filterListing.length > 0}
        {#if !listingTabServices.isTab(3)}
          <ul class="gridListItems" use:autoAnimate>
            <List items={filterListing} />
          </ul>
        {/if}

        <div class={`${listingTabServices.isTab(3) && !hasLimit && "pt-3"}`}>
          {#if listingTabServices.isTab(3)}
            <div class="total-selected">
              <span class="has-text-grey is-size-6">Nome:</span>
              <span>
                {listName}
              </span>
            </div>
          {/if}

          {#if hasLimit}
            <div
              class={`total-selected ${listingTabServices.isTab(3) && "pt-3"}`}
            >
              <span class="has-text-grey is-size-6">Limite:</span>
              <span
                >{`R$ ${listLimit.toLocaleString("pt-br", {
                  minimumFractionDigits: 2,
                })}`}</span
              >
            </div>
          {/if}

          {#if valuePicked > 0 && !listingTabServices.tabs[2].active}
            <div class="total-selected">
              <span class="has-text-grey is-size-6">Total:</span>
              <span>
                {`${hasLimit ? "-" : ""} ${getFormatMoney(valuePicked)}`}
              </span>
            </div>
          {/if}

          {#if hasLimit}
            <div class="total-selected">
              <span />
              <span
                class={`is-size-5 ${valueAvailable < 0 && "has-text-danger"}`}
                >{getFormatMoney(valueAvailable)}</span
              >
            </div>
          {/if}
        </div>
        <div class="m-5 pt-2" />
      {:else if !listingTabServices.isTab(3)}
        <h1 class="has-text-centered my-6">Nenhum Item.</h1>
      {/if}

      <div class="add-new">
        <input
          id="quantityInput"
          class="input"
          type="number"
          pattern="[0-9.,]*"
          inputmode="decimal"
          step="any"
          placeholder="1"
          bind:value={currentQuantity}
        />
        <input
          id="productInput"
          class="input"
          type="text"
          placeholder="Leite Condensado"
          bind:value={currentProduct}
        />
        <input
          id="valueInput"
          class="input"
          type="number"
          pattern="[0-9.,]*"
          inputmode="decimal"
          step="any"
          placeholder="1.99"
          bind:value={currentValue}
        />
        <button class="button is-info" on:click={addItem}>
          <i class="gg-play-list-add" />
        </button>
      </div>
    </div>
  </main>
{/key}

{#if isTrue($listingTour)}
  <Guideline
    {...listingGuideline.addItem}
    on:onConfirm={() => listingTour.set(false)}
  />
{/if}

{#if firstItemAdd && isTrue($listingItemTour)}
  <Guideline
    {...listingGuideline.removeItem}
    on:onConfirm={() => listingItemTour.set(false)}
  />
{/if}

<style lang="scss">
  .add-new {
    display: grid;
    grid-template-columns: 2.75rem auto 4.5rem min-content;
    gap: 0.5rem;
    width: 100vw;
    padding: 0.5rem;
    position: fixed;
    bottom: 0;

    input {
      border-radius: 0.75rem;
      padding: 1.5rem 1rem;
    }

    button {
      border-radius: 0.75rem;
      padding: 1.5rem 1rem;
    }
  }

  .text-title {
    width: 45vw;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
</style>
