<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    export let title = "Introdução";
    export let nextText = "Próximo";
    export let prevText = "Retroceder";
    export let confirmText = "Confirmar";

    export let showSteps = false;
    export let canClose = true;
    export let useHTML = false;

    export let list = [];
    export let opts = {};

    window.webAssistant.intro({
      title,
      list,
      dangerouslyUseHTMLString: useHTML,
      showSteps,
      canClose,
      nextText,
      prevText,
      confirmText,
      ...opts,
      onConfirm: () => dispatch("onConfirm")
    });
  </script>
  
  <main />
  