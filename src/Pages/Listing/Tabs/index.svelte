<script>
    import { lists } from "../../../Store/globals";
    import { ListingTabServices } from "./services";
    
    export let currentRoute;
    const params = {};

    const { id } = currentRoute.namedParams;
    const list = $lists[id];

    $: listingTabServices = new ListingTabServices();
    $: tabs = listingTabServices.tabs;

    // any new value assignment to this variable
    // will reassemble the component.
    let reset = {};
</script>

{#key reset}
    <main>
        <div class="tabs is-centered mb-1">
            <ul>
            {#each tabs as tab}
                <li class={tab.active && "is-active"}>
                    <!-- svelte-ignore a11y-missing-attribute -->
                    <a on:click={() => {
                        listingTabServices.setTab(tab.id);
                        reset = {};
                    }}>
                        <span>{tab.label}</span>
                    </a>
                </li>
            {/each}
            </ul>
        </div>
    </main>
{/key}