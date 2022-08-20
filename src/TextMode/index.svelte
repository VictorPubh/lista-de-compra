<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  import { textModeTour, lists, listingIndex } from "../Store/globals";

  import stepsGuideline from "./guideline.json";
  import stepsInto from "./into.json";

  import Guideline from "../Components/Guideline.svelte";
  import Intro from "../Components/Intro.svelte";

  import { textAreaValue } from "../Store/text-mode";
  import WrittenModeServices from "./services";

  let textArea;
  const WMService = new WrittenModeServices($lists[$listingIndex]);

  onMount(() => {
    textAreaValue.set(WMService.getText());

    if (!$textModeTour) {
      textArea.focus();
    }
  });
</script>

<main in:fade>
  <div class="actions">
    <button
      id="buttonSaveTextMode"
      class="button is-info"
      on:click={() => WMService.save()}
    >
      Atualizar
    </button>
    <button
      class="button float-help is-info is-light"
      on:click={() => {
        textModeTour.set("into");
      }}>?</button
    >
  </div>
  <textarea bind:this={textArea} bind:value={$textAreaValue} />

  {#if $textModeTour === "guideline"}
    <Guideline
      list={stepsGuideline}
      on:onConfirm={() => textModeTour.set("into")}
    />
  {/if}

  {#if $textModeTour === "into"}
    <Intro
      title={stepsInto.title}
      list={stepsInto.list}
      useHTML={true}
      canClose={false}
      showSteps={true}
      opts={{
        style: {
          width: "92vw",
          height: "70vh",
        },
      }}
      on:onConfirm={() => {
        textModeTour.set(false);
        textArea.focus();
      }}
    />
  {/if}
</main>

<style lang="scss">
  textarea {
    width: 100%;
    height: 85vh;
    line-height: 1.5;
    border-radius: 0;
    border: 0;
    outline: none;
    padding: 0 1.5rem;
    font-size: 1.25rem;
    text-align: left;
  }

  .actions {
    position: fixed;
    bottom: 0;
    z-index: 999;

    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;

    padding: 0.75rem;
  }

  .float-help {
    position: fixed;
    bottom: 0.75rem;
    right: 0.75rem;
    border-radius: 50rem;

    width: 2.75rem;
    height: 2.75rem;

    font-size: 1.25rem;
    font-size: bold;
  }
</style>
