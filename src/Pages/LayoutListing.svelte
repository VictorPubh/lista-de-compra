<script>
  import { navigateTo, Route } from "svelte-router-spa";
  import { textMode, listingIndex, lists } from "../Store/globals";
  import { ListingServices } from "../Pages/Listing/services";
  import { ListingTabServices } from "./Listing/Tabs/services";

  export let currentRoute;
  const params = {};
  const { id } = currentRoute.namedParams;

  const list = $lists[id];
  const listingServices = new ListingServices(list);
  const listingTabServices = new ListingTabServices();

  $: listingFocused = $lists[$listingIndex].content;
</script>

<main>
  <div class="header py-4">
    <div class="button-return">
      {#if !$textMode}
        <i
          class="gg-arrow-left"
          on:click={() => {
            listingIndex.set(undefined);
            textMode.set(false);

            navigateTo("/");
          }}
        />
      {:else}
        <i class="gg-arrow-left has-text-white" />
      {/if}
    </div>
    <span>
      {#if $listingFocused.content.length > 0}
        <span class="tag is-info is-medium">{$listingFocused.content.length}x</span>
      {/if}
      <span id="labelAmount" class="tag is-medium">
        {listingServices.hasLimit
          ? listingServices.getAvailable()
          : listingServices.getPicked()}
      </span>
    </span>
    <div
      id="buttonTextMode"
      on:click={() => listingServices.writtenManager()}
      class={`button-rounded ${
        $textMode && "has-background-info has-text-white"
      }`}
    >
      <i class="gg-format-text" />
    </div>
  </div>
  <Route {currentRoute} {params} />
</main>

<style lang="scss">
  .header {
    display: flex;
    justify-content: space-between;
    padding: 0.75rem;
    align-items: center;
    width: 100%;
    color: #4a4a4a;
  }
  .button-rounded {
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
  .button-return {
    i {
      margin-top: -0.25rem;
      margin-left: 0.5rem;
      transform: scale(1.4);
    }
  }
</style>
