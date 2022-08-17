<script>
    import Home from "./Home/index.svelte";
    import Listing from "./Listing/index.svelte";

    import { listingIndex, lists } from "./Store/globals";
</script>

<main>
    {#if isNaN($listingIndex)}
        <Home />
    {:else}
        <Listing
            listName={$lists[$listingIndex].name}
            listData={$lists[$listingIndex].content}
            listLimit={$lists[$listingIndex].limit}
        />
    {/if}
</main>