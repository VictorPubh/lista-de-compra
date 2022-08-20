<script>
    import Home from "./Home/index.svelte";
    import Listing from "./Listing/index.svelte";
    import Modal from "./Components/Modal.svelte";

    import { listingIndex, lists } from "./Store/globals";
    import { openModal, optsModal } from "./Store/modal";
</script>

<svelte:head>
    <script src="https://cdn.jsdelivr.net/npm/web-assistant@latest/lib/index.min.js"></script>
</svelte:head>

{#if $openModal}
    <Modal {...$optsModal} />
{/if}

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