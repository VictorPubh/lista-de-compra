<script>
  import { onMount } from 'svelte';

  export let listQuantity = [
    // {
    //   id: 0,
    //   purchased: false,
    //   quantity: 2,
    //   name: "Milho de Pipoca",
    //   value: 2.70
    // },
    // {
    //   id: 1,
    //   purchased: false,
    //   quantity: 1,
    //   name: "Óleo de Soja",
    //   value: 5.90
    // }
  ];

  onMount(async () => {
    const localStorageList = localStorage.getItem('list');

    if (localStorageList && localStorageList != "") {
      listQuantity = JSON.parse(localStorageList);
    }
  });

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
    }
  ];

  function setTab(newTab) {
    tabs.map(tab => {
      tab.active = (tab.label === newTab);
    });

    tabs = tabs;
  };

  function updateStore() {
    localStorage.setItem("list", JSON.stringify(listQuantity));
  }

  $: filterData = function(list) {
    const activated = tabs.find(tab => tab.active);

    return activated.fn(list);
  }

  function removeProductZero() {
    let newListing = listQuantity.filter(item => item.quantity > 0);
    listQuantity = newListing;

    updateStore();
  }

  let currentQuantity;
  let currentProduct;
  let hasHelp = true;

  function addItem() {
    listQuantity.push({
      id: listQuantity.length,
      purchased: false,
      quantity: currentQuantity,
      name: currentProduct,
      value: 0
    });

    listQuantity = listQuantity;
    currentQuantity = "";
    currentProduct = "";

    updateStore();
  };

  $: toMoney = function (i) {
    return`R$${(i.value * i.quantity).toLocaleString('pt-br', { minimumFractionDigits: 2 })}`;
  }

  $: getTotalSelected = function () {
    let amount = 0;

    listQuantity.forEach(item => {
      if(item.purchased) {
        amount += item.value * item.quantity;
      }
    });

    return `R$ ${amount.toLocaleString('pt-br', { minimumFractionDigits: 2 })}`;
  }

  function setPurchased(id, bool) {
    listQuantity[id].purchased = bool;
    listQuantity = listQuantity;

    updateStore();
  }
</script>

<container class="screen">
  <h1 class="is-size-4 py-4 has-text-centered">
    Lista de Compras
    {#if filterData(listQuantity).length > 0}
      <span class="tag is-info is-medium">{filterData(listQuantity).length}x Itens</span>
    {/if}
  </h1>

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
    {#if filterData(listQuantity).length > 0}
      <div class="gridListItems">
        {#each filterData(listQuantity) as item, i}
            <span class={`notification ${item.purchased ? "is-info" : "is-grey"} mb-0`}>
              <input class="input input-quantity is-small" type="number" placeholder="1" bind:value={item.quantity} on:change={removeProductZero}>
              <span on:click={() => setPurchased(item.id, (!item.purchased))}>{item.name}</span>
              <input class="input input-value is-small" type="number" placeholder="R$ 0,00" bind:value={item.value} on:change={updateStore}>
              <span class="endmoney" on:click={() => setPurchased(item.id, (!item.purchased))}>{toMoney(item)}</span>
            </span>
        {/each}
      </div>

      {#if getTotalSelected() != "R$ 0,00" && !tabs[2].active}
        <div class="total-selected">
          <span class="has-text-grey is-size-6">Total:</span>
          <span>{getTotalSelected()}</span>
        </div>
      {/if}

      <div class="mb-6 mt-4" />
    {:else}
      <h1 class="has-text-centered mt-3"> Nenhum produto foi adicionado.</h1>
      {#if hasHelp}
        <article class="message is-info mx-2 my-4">
          <div class="message-header">
            <p>Como usar?</p>
            <button class="delete" aria-label="delete" on:click={() => hasHelp = false}></button>
          </div>
          <div class="message-body">
            Adicione os itens e as quantidades de itens na sua lista e depois popule-os com os valores da prateleiras enquanto você escolhe os itens no comércio, os itens selecionados (em azul) são somados no final da listagem.  
            <br />
            <br />
            Para remover um item da sua lista, defina a quantidade dele como 0.
          </div>
        </article>
      {/if}
    {/if}
    
    <div class="addNew">
      <input class="input" type="number" placeholder="1" bind:value={currentQuantity} />
      <input class="input" type="text" placeholder="Leite Condensado" bind:value={currentProduct} />
      <button class="button is-info" on:click={addItem}>Adicionar</button>
    </div>
  </div>
</container>
