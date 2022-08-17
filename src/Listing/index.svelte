<script>
  import autoAnimate from "@formkit/auto-animate";
  import TextMode from "../TextMode/index.svelte";
  import { lists, listingIndex, hasHelp, textMode } from "../Store/globals";

  export let listName = "Lista de Compra";
  export let listData = [];
  export let listLimit = 0;

  let currentQuantity;
  let currentProduct;
  let currentValue;
  let hasLimit = false;

  $: if (listLimit > 0) hasLimit = true;

  const closeHelp = (key) => {
    $hasHelp[key] = false;
    hasHelp.set($hasHelp);
  };

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
    let newListing = listData.filter((item) => item.quantity > 0);

    updateStore(newListing);
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

    updateStore(listData);
  }

  $: toMoney = function (i) {
    return `R$${(i.value * i.quantity).toLocaleString("pt-br", {
      minimumFractionDigits: 2,
    })}`;
  };

  $: getAvailableValue = (formated = true) => {
    const totalAvailable = listLimit - +getTotalSelected(false);
    return formated
      ? `R$ ${totalAvailable.toLocaleString("pt-br", {
          minimumFractionDigits: 2,
        })}`
      : totalAvailable;
  };

  $: getTotalSelected = function (formated = true) {
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
    listData[id].purchased = bool;

    updateStore(listData);
  }
</script>

<container class="screen">
  <div class="header py-4">
    <div class="button-return">
        <i class="gg-arrow-left" on:click={() => {
            textMode.set(false);
            listingIndex.set(undefined)
        }}/>
    </div>
    <span>
      {#if filterData(listData).length > 0}
        <span class="tag is-info is-medium">{filterData(listData).length}x</span
        >
      {/if}
      <span class="tag is-medium">
        {hasLimit ? getAvailableValue() : getTotalSelected()}
      </span>
    </span>
    <div on:click={() => textMode.set(!$textMode)} class={`button-rounded ${$textMode === true ? "has-background-info" : "color-gray"}`}>
        <i class="gg-format-text" />
    </div>
  </div>

  {#if $textMode === false}
    <div class="tabs is-centered mb-1">
      <ul>
        {#each tabs as tab}
          <li class={tab.active && "is-active"}>
            <a href={`#${tab.label}`} on:click={() => setTab(tab.label)}>
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

          {#if getTotalSelected() != "R$ 0,00" && !tabs[2].active}
            <div class="total-selected">
              <span class="has-text-grey is-size-6">Total:</span>
              <span>
                {hasLimit ? "-" : ""}
                {getTotalSelected()}
              </span>
            </div>
          {/if}

          {#if hasLimit}
            <div class="total-selected">
              <span />
              <span
                class={`is-size-5 ${
                  getAvailableValue(false) < 0 && "has-text-danger"
                }`}>{getAvailableValue()}</span
              >
            </div>
          {/if}
        </div>
        <div class="m-5 pt-2" />
      {:else}
        {#if $hasHelp.instructions}
          <article class="message is-info mx-2 my-4">
            <div class="message-header">
              <p>Instruções</p>
              <button
                class="delete"
                aria-label="delete"
                on:click={() => closeHelp("instructions")}
              />
            </div>
            <div class="message-body">
              1. Se ao adicionar não houver uma quantidade inserida, a
              quantidade será preenchida como: 1.
              <br />
              <br />
              2. Se ao adicionar não houver um nome inserido, o nome será preenchido
              como: "Produto #123".
              <br />
              <br />
              3. Se ao adicionar não houver um valor inserido, o valor será preenchido
              como: 0.00.
            </div>
          </article>
        {/if}

        {#if $hasHelp.tips}
          <article class="message mx-2 my-4">
            <div class="message-header">
              <p>Dicas</p>
              <button
                class="delete"
                aria-label="delete"
                on:click={() => closeHelp("tips")}
              />
            </div>
            <div class="message-body">
              1. Para remover um item da sua lista, defina a quantidade dele
              como 0.
              <br />
              <br />
              2.1 Você pode usar ".6" para 600g e/ou "22.9" para R$22,90...
              <br />
              <br />
              2.2 Use ponto ou vírgula.
              <br />
              <br />
              <button
                class="button is-small is-dark"
                on:click={() => {
                  listData.push({
                    id: 0,
                    name: "Presunto",
                    quantity: ".6",
                    value: "22.9",
                    purchased: false,
                  });

                  listData = listData;
                }}>Clique para um Exemplo</button
              >
            </div>
          </article>
        {/if}
        {#if $hasHelp.instructions == false && $hasHelp.tips == false && !tabs[3].active}
          <h1 class="has-text-centered my-6">Nenhum produto foi adicionado.</h1>
        {/if}
      {/if}

      <div class="add-new">
        <input
          class="input"
          type="number"
          pattern="[0-9.,]*"
          inputmode="decimal"
          step="any"
          placeholder="1"
          bind:value={currentQuantity}
        />
        <input
          class="input"
          type="text"
          placeholder="Leite Condensado"
          bind:value={currentProduct}
        />
        <input
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
        <TextMode items={$lists[$listingIndex]} />
    {/if}
</container>

<style>
  .screen .header {
    display: flex;
    justify-content: space-between;
    padding: .75rem;
    align-items: center;
  }

  .add-new {
    display: grid;
    grid-template-columns: 2.75rem auto 4.5rem min-content;
    gap: 0.5rem;

    width: 100vw;
    padding: 0.5rem;

    position: fixed;
    bottom: 0;
  }

  .add-new input,
  .add-new button {
    border-radius: 0.75rem;
    padding: 1.5rem 1rem;
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

  li.list-item input {
    color: #4a4a4a;
    border-bottom: 0.15rem solid #3e8ed0;
  }

  li.is-info input {
    color: white;
    border-bottom: 0.15rem solid white;
  }

  .money-grid {
    display: grid;
    justify-content: center;
    align-items: center;
    grid-template-columns: 3.2em 5.5rem;
    gap: 0.5rem;
    text-align: center;
  }

  .input-quantity,
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
    border-radius: .5rem;

    display: flex;
    justify-content: center;
    align-items: center;
    width: 2.5rem;
    height: 2.5rem;
  }

  .color-gray {
    color: #4a4a4a;
  }
  
  .button-rounded i {
    margin-top: .1rem;
    margin-left: .075rem;
    transform: scale(1.4);
  }

  .button-return i {
    margin-top: -.25rem;
    margin-left: .5rem;
    transform: scale(1.4);
  }
</style>
