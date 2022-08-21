<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  import { writtenModeTour, lists, listingIndex } from "../../Store/globals";

  import stepsGuideline from "./guideline.json";
  import stepsInto from "./into.json";

  import Guideline from "../../Components/Guideline.svelte";
  import Intro from "../../Components/Intro.svelte";

  import { textAreaValue } from "../../Store/written-mode";
  import WrittenModeServices from "./services";

  let textArea;
  const writtenServices = new WrittenModeServices($lists[$listingIndex]);

  onMount(() => {
    textAreaValue.set(writtenServices.getText());

    if (!$writtenModeTour) {
      textArea.focus();
    }
  });
</script>

<main in:fade>
  <div class="actions">
    <button
      id="buttonSaveWrittenMode"
      class="button is-info"
      on:click={() => writtenServices.save()}
    >
      Atualizar
    </button>
    <button
      class="button float-help is-info is-light"
      on:click={() => {
        writtenModeTour.set("into");
      }}>?</button
    >
  </div>
  <textarea bind:this={textArea} bind:value={$textAreaValue} />

  {#if $writtenModeTour === "guideline"}
    <Guideline
      list={stepsGuideline}
      on:onConfirm={() => writtenModeTour.set("into")}
    />
  {/if}

  {#if $writtenModeTour === "into"}
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
        writtenModeTour.set(false);
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
    z-index: 100;

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
