<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    export let canClose = false;
    export let showSteps = false;
    export let useHTML = false;

    export let confirmText = "Confirmar";
    export let prevText = "Retroceder";

    export let list = [];
    export let opts = {};

   const dipatchGuideline = async () => {
      try {
        await window.webAssistant.guideline({
          list,
          canClose,
          showSteps,
          prevText,
          confirmText,
          ...opts,
          dangerouslyUseHTMLString: useHTML,
          onConfirm: () => dispatch("onConfirm"),
        });
      } catch(err) {
        console.error(err);
      }
    }

    const hasWebAssistant = window.webAssistant != undefined;
    hasWebAssistant && dipatchGuideline();
  </script>
  
  <main />
  