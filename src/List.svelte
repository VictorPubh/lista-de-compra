<script>
	import { createEventDispatcher } from 'svelte';
  import { onMount } from 'svelte';

	const dispatch = createEventDispatcher();

  export let listName = "Lista de Compra";
  export let listData = [];
  export let listLimit = 0;

  let hasLimit = false;
  $: if(listLimit > 0) {
    hasLimit = true;
  }

  let currentQuantity;
  let currentProduct;
  let currentValue;

  let hasHelp = {};
  onMount(() => {
    const storageHasHelp = JSON.parse(localStorage.getItem("hasHelp"));

    if (storageHasHelp) {
      hasHelp = storageHasHelp;
    } else {
      hasHelp = {
        tips: true,
        instructions: true
      };
    }
  });

  const updateStorage = (state) => {
    hasHelp = state;
    localStorage.setItem("hasHelp", JSON.stringify(hasHelp));
  };

  const closeInstructions = () => {
    hasHelp.instructions = false;
    updateStorage(hasHelp);
  }

  const closeTips = () => {
    hasHelp.tips = false;
    updateStorage(hasHelp);
  }

  let tabs = [
    {
      label: "Todos",
      active: true,
      fn: (list) => list
    },
    {
      label: "Escolhidos",
      active: false,
      fn: (list) => list.filter(product => {
        if (product.purchased === true) return true;
      })
    },
    {
      label: "Restantes",
      active: false,
      fn: (list) => list.filter(product => {
        if (product.purchased === false) return true;
      })
    },
    {
      label: "%",
      active: false,
      fn: () => listData
    }
  ];

  function setTab(newTab) {
    tabs.map(tab => {
      tab.active = (tab.label === newTab);
    });

    tabs = tabs;
  };

  function updateStore() {
		dispatch('storage', {
			text: listData
		});
  }

  $: filterData = function(list) {
    const activated = tabs.find(tab => tab.active);

    return activated.fn(list);
  }

  function removeProductZero() {
    let newListing = listData.filter(item => item.quantity > 0);
    listData = newListing;

    updateStore();
  }

  function addItem() {
    const id = listData.length;
    const quantity = currentQuantity === undefined ? 1 : currentQuantity;
    const name = currentProduct === undefined ? `Produto #${id + 1}` : currentProduct;
    const value = currentValue === undefined ? 0 : currentValue;

    listData.push({
      id,
      name,
      quantity,
      value,
      purchased: true
    });

    listData = listData;

    currentQuantity = undefined;
    currentProduct = undefined;
    currentValue = undefined;

    updateStore();
  };

  $: toMoney = function (i) {
    return`R$${(i.value * i.quantity).toLocaleString('pt-br', { minimumFractionDigits: 2 })}`;
  }
  
  $: getAvailableValue = (formated = true) => {
    const totalAvailable = listLimit - +getTotalSelected(false);
    return formated ? `R$ ${(totalAvailable).toLocaleString('pt-br', { minimumFractionDigits: 2 })}` : totalAvailable;
  }

  $: getTotalSelected = function (formated = true) {
    let amount = 0;

    listData.forEach(item => {
      if(item.purchased) {
        amount += item.value * item.quantity;
      }
    });

    return formated ? `R$ ${amount.toLocaleString('pt-br', { minimumFractionDigits: 2 })}` : amount;
  }

  function setPurchased(id, bool) {
    listData[id].purchased = bool;
    listData = listData;

    updateStore();
  }
</script>

<container class="screen">
  <div class="header py-4">
    <i class="gg-arrow-left" on:click={() => dispatch('return')}></i>
    <p class="text-title is-size-5">{listName}</p>
    {#if filterData(listData).length > 0}
      <span class="tag is-info is-medium">{filterData(listData).length}x</span>
    {/if}
    <span class="tag is-medium">{hasLimit ? getAvailableValue() : getTotalSelected()}</span>
  </div>

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
        <div class="gridListItems">
          {#each filterData(listData) as item, i}
              <span class={`notification ${item.purchased ? "is-info" : "is-grey"} mb-0`}>
                <input
                  class="input input-quantity is-small"
                  type="number" placeholder="1"
                  bind:value={item.quantity}
                  on:change={removeProductZero}>
                <span on:click={() => setPurchased(item.id, (!item.purchased))}>{item.name}</span>

                <input
                  class="input input-value is-small"
                  type="number"
                  placeholder="0.00"
                  bind:value={item.value}
                  on:change={updateStore}
                  on:focus={() => {
                    if (item.value == 0) item.value = "";
                  }}>
                <span class="endmoney" on:click={() => setPurchased(item.id, (!item.purchased))}>{toMoney(item)}</span>
              </span>
          {/each}
        </div>
      {/if}

      <div class={`${tabs[3].active && "pt-3"}`}>
        {#if hasLimit}
          <div class={`total-selected ${tabs[3].active && "pt-3"}`}>
            <span class="has-text-grey is-size-6">Limite:</span>
            <span>{`R$ ${listLimit.toLocaleString('pt-br', { minimumFractionDigits: 2 })}`}</span>
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
            <span class={`is-size-5 ${(getAvailableValue(false) < 0) && "has-text-danger"}`}>{getAvailableValue()}</span>
          </div>
        {/if}
      </div>
      <div class="m-5 pt-2" />
    {:else}
      {#if hasHelp.instructions}
        <article class="message is-info mx-2 my-4">
          <div class="message-header">
            <p>Instruções</p>
            <button class="delete" aria-label="delete" on:click={closeInstructions}></button>
          </div>
          <div class="message-body">
            1. Se ao adicionar não houver uma quantidade inserida, a quantidade será preenchida como: 1.
            <br />
            <br />
            2. Se ao adicionar não houver um nome inserido, o nome será preenchido como: "Produto #123".
            <br />
            <br />
            3. Se ao adicionar não houver um valor inserido, o valor será preenchido como: 0.00.
          </div>
        </article>
      {/if}

      {#if hasHelp.tips}
        <article class="message mx-2 my-4">
          <div class="message-header">
            <p>Dicas</p>
            <button class="delete" aria-label="delete" on:click={closeTips}></button>
          </div>
          <div class="message-body">
            1. Para remover um item da sua lista, defina a quantidade dele como 0.
            <br />
            <br />
            2.1 Você pode usar ".6" para 600g e/ou "22.9" para R$22,90...
            <br />
            <br />
            2.2 Use ponto ou vírgula.
            <br />
            <br />
            <button class="button is-small is-dark" on:click={() => {
              listData.push({
                id: 0,
                name: "Presunto",
                quantity: ".6",
                value: "22.9",
                purchased: false
              })

              listData = listData;
            }}>Clique para um Exemplo</button>
          </div>
        </article>
      {/if}
      {#if hasHelp.instructions == false && hasHelp.tips == false && !tabs[3].active}
        <h1 class="has-text-centered my-6"> Nenhum produto foi adicionado.</h1>
      {/if}
    {/if}
    
    <div class="add-new">
      <input class="input" type="number" pattern="[0-9]*" inputmode="numeric" placeholder="1" bind:value={currentQuantity} />
      <input class="input" type="text" placeholder="Leite Condensado" bind:value={currentProduct} />
      <input class="input" type="number" pattern="[0-9]*" inputmode="numeric" placeholder="1.99" bind:value={currentValue} />
      <button class="button is-info" on:click={addItem}>
        <i class="gg-play-list-add"></i>
      </button>
    </div>
  </div>
</container>

<style>
  .screen .header {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    align-items: center;
  }

  .add-new {
    display: grid;
    grid-template-columns: 2.75rem auto 4rem min-content;
    gap: .5rem;

    width: 100vw;
    padding: .5rem;
    
    position: fixed;
    bottom: 0;
  }

  .text-title {
    width: 45vw;
    text-overflow: ellipsis;
    white-space: nowrap; 
    overflow: hidden;
  }
</style>
