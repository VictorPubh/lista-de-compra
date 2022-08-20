<script>
    export let title = "{title}";
    export let message = "{message}";

    export let textConfirm = "{textConfirm}";
    export let textCancel = "{textCancel}";
    export let textBack;

    export let fn = {};
</script>

<main>
    <div class="overlay" on:click={fn.overlay} />
    <div class="screen">
        <div class="native-modal">
            <h1 class="is-size-4 has-text-weight-medium">{title}</h1>
            <p>{@html message}</p>
            <div class="actions mt-4">
                {#if textBack}
                    <button class="button is-danger is-light" on:click={fn.back}>
                        {textBack}
                    </button>
                {/if}
                <button class="button is-light" on:click={fn.cancel}>{textCancel}</button>
                <button class="button is-info" on:click={fn.confirm}>{textConfirm}</button>
            </div>
        </div>
    </div>
</main>

<style lang="scss">
    .overlay {
        background-color: rgba(0, 0, 0, 0.5);
        width: 100vw;
        height: 100vh;

        position: absolute;
        z-index: 200;
    }

    .screen {
        display: flex;
        justify-content: center;
        align-items: center;

        width: 100vw;
        height: 100vh;

        position: absolute;

        .native-modal {
            background-color: white;
            width: var(--modal-width);
            padding: 1.25rem;
            border-radius: .5rem;
            z-index: 300;

            text-align: center;
        }

        .actions {
            display: flex;
            justify-content: center;
            gap: .75rem;
        }
    }
</style>