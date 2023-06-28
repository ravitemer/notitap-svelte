<script>
  import "../app.css";
  import { onMount } from "svelte";
  onMount(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    handleColorSchemeChange(mediaQuery);

    function handleColorSchemeChange(e) {
      if (e.matches) {
        window.document.documentElement.classList.add("dark");
      } else {
        window.document.documentElement.classList.remove("dark");
      }
    }

    mediaQuery.addEventListener("change", handleColorSchemeChange);
  });
</script>

<main>
  <slot />
</main>
