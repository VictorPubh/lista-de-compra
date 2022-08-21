<script>
  import { Route } from "svelte-router-spa";

  export let currentRoute;
  const params = {};
</script>

<main>
    <Route {currentRoute} {params} />
</main>
