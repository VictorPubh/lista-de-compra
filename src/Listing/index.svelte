<script>
  import autoAnimate from "@formkit/auto-animate";

  import WrittenMode from "./Written/index.svelte";
  import WrittenModeServices from "./Written/services";
  
  import {
    lists,
    listingIndex,
    writtenMode,
    listingTour,
    listingItemTour,
  } from "../Store/globals";

  import { textAreaValue } from "../Store/written-mode";

  import listingGuideline from "./guideline.json";
  import Guideline from "../Components/Guideline.svelte";

  import { openModal, optsModal } from "../Store/modal";

  import { isTrue } from "../Utils/isTrue";

  let firstItemAdd = false;

  export let listName = "Lista de Compra";
  export let listData = $lists[$listingIndex];
  export let listLimit = 0;

  let currentQuantity;
  let currentProduct;
  let currentValue;
  let hasLimit = false;

  $: if (listLimit > 0) hasLimit = true;

  let tabs = [
    {
      label: "Todos",
      active: true,
      fn: () => $lists[$listingIndex].content,
    },
    {
      label: "Escolhidos",
      active: false,
      fn: (listing) =>
        listing.filter((product) => {
          if (product.purchased === true) return true;
        }),
    },
    {
      label: "Restantes",
      active: false,
      fn: (listing) =>
        listing.filter((product) => {
          if (product.purchased === false) return true;
        }),
    },
    {
      label: "%",
      active: false,
      fn: () => $lists[$listingIndex].content,
    },
  ];

  function setTab(newTab) {
    tabs.map((tab) => {
      tab.active = tab.label === newTab;
    });

    tabs = tabs;
  }

  function updateStore(newState) {
    listData = newState;

    $lists[$listingIndex].content = listData;
    lists.set($lists);
  }

  $: filterData = function (listing) {
    const activated = tabs.find((tab) => tab.active);

    return activated.fn(listing);
  };

  function removeProductZero() {
    let _list = listData.filter((item) => item.quantity > 0);
    _list.map((item, i) => item.id = i);

    updateStore(_list);
  }

  function addItem() {
    const hasValue = currentValue !== undefined;

    const id = listData.length;
    const quantity = isNaN(currentQuantity) ? 1 : currentQuantity;
    const name =
      typeof currentProduct === "undefined"
        ? `Produto #${id + 1}`
        : currentProduct;
    const value = hasValue ? currentValue : 0;

    listData.push({
      id,
      name,
      quantity,
      value,
      purchased: hasValue,
    });

    currentQuantity = undefined;
    currentProduct = undefined;
    currentValue = undefined;

    if (id == 0) firstItemAdd = true;

    updateStore(listData);
  }

  $: toMoney = function (i) {
    return `R$${(i.value * i.quantity).toLocaleString("pt-br", {
      minimumFractionDigits: 2,
    })}`;
  };

  $: getAvailable = (formated = true) => {
    const totalAvailable = listLimit - +getPicked(false);
    return formated
      ? `R$ ${totalAvailable.toLocaleString("pt-br", {
          minimumFractionDigits: 2,
        })}`
      : totalAvailable;
  };

  $: getPicked = function (formated = true) {
    let amount = 0;

    listData.forEach((item) => {
      if (item.purchased) {
        amount += item.value * item.quantity;
      }
    });

    return formated
      ? `R$ ${amount.toLocaleString("pt-br", { minimumFractionDigits: 2 })}`
      : amount;
  };

  function setPurchased(id, bool) {
    const _lists = $lists[$listingIndex].content;
    _lists[id].purchased = bool;

    updateStore(_lists);
  }

  const writtenManager = () => {
    const _list = $lists[$listingIndex];
    const WMServices = new WrittenModeServices(_list);

    if ($writtenMode) {
      if ($textAreaValue != WMServices.getText()) {
        optsModal.set({
            title: "Sair sem Salvar?",
            message: "Você não salvou as alteraçõe<br />no Modo Texto.",
            textBack: "Voltar",
            textConfirm: "Salvar",
            textCancel: "Descartar",
            fn: {
              confirm: () => {
                $lists[$listingIndex].content = WMServices.getObject();
                lists.set($lists);

                openModal.set(false);
                writtenMode.set(false);
              },
              cancel: () => {
                openModal.set(false);
                writtenMode.set(false);
              },
              back: () => {
                openModal.set(false);
              },
              overlay: () => {}
            }
        })
      } else {
        writtenMode.set(false);
      }
    } else {
      writtenMode.set(true);
    }

  }
</script>

<main class="screen">
  <div class="header py-4">
    <div class="button-return">
      {#if !$writtenMode}
      <i 
        class="gg-arrow-left"
        on:click={() => {
          listingIndex.set(undefined);
          writtenMode.set(false);
        }}
      />
      {:else}
      <i class="gg-arrow-left has-text-white" />
      {/if}
    </div>
    <span>
      {#if filterData(listData).length > 0}
        <span class="tag is-info is-medium">{filterData(listData).length}x</span
        >
      {/if}
      <span id="labelAmount" class="tag is-medium">
        {hasLimit ? getAvailable() : getPicked()}
      </span>
    </span>
    <div
      id="buttonWrittenMode"
      on:click={writtenManager}
      class={`button-rounded ${
        $writtenMode === true ? "has-background-info" : "color-gray"
      }`}
    >
      <i class="gg-format-text" />
    </div>
  </div>

  {#if $writtenMode === false}
    <div class="tabs is-centered mb-1">
      <ul>
        {#each tabs as tab}
          <li class={tab.active && "is-active"}>
            <!-- svelte-ignore a11y-missing-attribute -->
            <a on:click={() => setTab(tab.label)}>
              <span>{tab.label}</span>
            </a>
          </li>
        {/each}
      </ul>
    </div>

    <div class="table-container">
      {#if filterData(listData).length > 0}
        {#if !tabs[3].active}
          <ul class="gridListItems" use:autoAnimate>
            {#each filterData(listData) as item, i}
              <li
                class={`notification list-item ${
                  item.purchased ? "is-info" : "is-grey"
                } mb-0`}
              >
                <input
                  class="input input-quantity is-small"
                  type="number"
                  placeholder="1"
                  bind:value={item.quantity}
                  on:change={removeProductZero}
                />
                <p
                  class="text-ellipsis"
                  on:click={() => setPurchased(item.id, !item.purchased)}
                >
                  {item.name}
                </p>

                <span class="money-grid">
                  <input
                    class="input input-value is-small"
                    type="number"
                    placeholder="0.00"
                    bind:value={item.value}
                    on:focus={() => {
                      if (item.value == 0) item.value = "";
                    }}
                  />
                  <span
                    class="is-size-6 text-ellipsis"
                    on:click={() => setPurchased(item.id, !item.purchased)}
                  >
                    {toMoney(item)}
                  </span>
                </span>
              </li>
            {/each}
          </ul>
        {/if}

        <div class={`${tabs[3].active && !hasLimit && "pt-3"}`}>
          {#if tabs[3].active}
            <div class="total-selected">
              <span class="has-text-grey is-size-6">Nome:</span>
              <span>
                {listName}
              </span>
            </div>
          {/if}

          {#if hasLimit}
            <div class={`total-selected ${tabs[3].active && "pt-3"}`}>
              <span class="has-text-grey is-size-6">Limite:</span>
              <span
                >{`R$ ${listLimit.toLocaleString("pt-br", {
                  minimumFractionDigits: 2,
                })}`}</span
              >
            </div>
          {/if}

          {#if getPicked() != "R$ 0,00" && !tabs[2].active}
            <div class="total-selected">
              <span class="has-text-grey is-size-6">Total:</span>
              <span>
                {hasLimit ? "-" : ""}
                {getPicked()}
              </span>
            </div>
          {/if}

          {#if hasLimit}
            <div class="total-selected">
              <span />
              <span
                class={`is-size-5 ${
                  getAvailable(false) < 0 && "has-text-danger"
                }`}>{getAvailable()}</span
              >
            </div>
          {/if}
        </div>
        <div class="m-5 pt-2" />
      {:else if !tabs[3].active}
        <h1 class="has-text-centered my-6">Nenhum Item Disponível.</h1>
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
  {:else}
    <WrittenMode />
  {/if}
</main>

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
  .screen {
    .header {
      display: flex;
      justify-content: space-between;
      padding: 0.75rem;
      align-items: center;
    }
  }

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

  .list-item {
    padding: 0.65rem;
    display: grid;
    grid-template-columns: 2.75rem auto auto;
    height: 3.7rem;
    gap: 0.5rem;
    font-weight: bold;
    justify-content: space-between;
    align-items: center;
    border-radius: 0.5rem;
  }

  li.list-item {
    input {
      color: #4a4a4a;
      border-bottom: 0.15rem solid #3e8ed0;
    }
    input::placeholder {
      color: #4a4a4a;
    }
  }

  li.is-info {
    input {
      color: white;
      border-bottom: 0.15rem solid white;
    }
    input::placeholder {
      color: white;
    }
  }

  .money-grid {
    display: grid;
    justify-content: center;
    align-items: center;
    grid-template-columns: 3.2em 5.5rem;
    gap: 0.5rem;
    text-align: center;
  }

  .input-quantity {
    width: 4rem;
    font-size: 0.75rem;
    font-weight: 600;
    background-color: transparent;
    border: 0;
    color: white;
    text-align: center;
    outline: none;
  }

  .input-value {
    width: 4rem;
    font-size: 0.75rem;
    font-weight: 600;
    background-color: transparent;
    border: 0;
    color: white;
    text-align: center;
    outline: none;
  }

  .text-ellipsis {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .button-rounded {
    color: white;
    border-radius: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2.5rem;
    height: 2.5rem;

    i {
      margin-top: 0.1rem;
      margin-left: 0.075rem;
      transform: scale(1.4);
    }
  }

  .color-gray {
    color: #4a4a4a;
  }

  .button-return {
    i {
      margin-top: -0.25rem;
      margin-left: 0.5rem;
      transform: scale(1.4);
    }
  }
</style>
