<script>
  import { reassemble } from "../../../Store/globals";

  import { getFormatMoney } from "../../../Utils/moneyOperators";
  import { ListServices } from "./services";

  export let items = [];

  const listServices = new ListServices(items);

  const updateItems = () => {
    items = listServices.list;
    reset = {}
  };

  const removeZeroedProducts = () => {
    listServices.removeZeroedProducts();
    updateItems();
  };

  const setPurchased = (id, status) => {
    listServices.setPurchased(id, status);
    updateItems();
  };

  $: getTotal = (i) => getFormatMoney(i.value * i.quantity);

  let reset = {}
</script>

{#key reset}
  <main>
    {#each items as item, i}
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
          on:change={removeZeroedProducts}
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
            {getTotal(item)}
          </span>
        </span>
      </li>
    {/each}
  </main>
{/key}

<style lang="scss">
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
  }

  li.is-info {
    input {
      color: white;
      border-bottom: 0.15rem solid white;
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
</style>
