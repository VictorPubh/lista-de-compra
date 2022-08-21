<script>
    import Modal from "./Components/Modal.svelte";

    import { Router } from "svelte-router-spa";
    import { routes } from "./routes.js";

    import { openModal, optsModal } from "./Store/modal";
</script>

<svelte:head>
    <script src="https://cdn.jsdelivr.net/npm/web-assistant@latest/lib/index.min.js"></script>
</svelte:head>

{#if $openModal}
    <Modal {...$optsModal} />
{/if}

<main>
    <Router {routes} />
</main>