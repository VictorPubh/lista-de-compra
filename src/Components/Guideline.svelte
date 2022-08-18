<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    export let canClose = false;
    export let showSteps = false;

    export let confirmText = "Confirmar";
    export let prevText = "Retroceder";

    export let list = [];
    export let opts = {};

    window.webAssistant.guideline({
      list,
      canClose,
      showSteps,
      prevText,
      confirmText,
      ...opts,
      onConfirm: () => dispatch("onConfirm"),
    });
  </script>
  
  <main />
  