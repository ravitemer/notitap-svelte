<script>
  export let selectedIndex = 0;
  import {
    slashVisible,
    slashItems,
    slashLocation,
    slashProps,
  } from "../../stores.js";

  let height;

  let elements = [];
  $: {
    if (elements[0] != null) {
      elements[selectedIndex]?.scrollIntoView({
        block: "end",
        behavior: "smooth",
      });
    }
  }
</script>

<svelte:window bind:innerHeight={height} />

{#if $slashVisible}
  <div class="suggestion-overlay" on:click={() => ($slashVisible = false)} />
  <div
    class="suggestion-container"
    style="left: {$slashLocation.x}px; top: {$slashLocation.y +
      $slashLocation.height +
      384 >
    height
      ? $slashLocation.y - $slashLocation.height - 384
      : $slashLocation.y + $slashLocation.height}px;"
  >
    {#if $slashItems.length}
      <div class="header">BLOCKS</div>
    {/if}
    <div class="slash-list">
      {#each $slashItems as { title, img, subtitle, command }, i}
        <div
          class="slash-item {i == selectedIndex ? 'active' : ''}"
          on:mouseenter={() => (selectedIndex = i)}
          on:click={() => {
            $slashVisible = false;
            command($slashProps);
          }}
          bind:this={elements[i]}
        >
          <div class="slash-left">
            <img src={img} alt={title} class="slash-img" />
          </div>
          <div class="slash-right">
            <div class="slash-title">{title}</div>
            <div class="slash-subtitle">{subtitle ? subtitle : ""}</div>
          </div>
        </div>
      {:else}
        <div class="slash-item">
          <div class="slash-right">
            <div class="slash-title" style="padding:0.25rem" >No Results</div>
            <!-- <div class="slash-subtitle">{subtitle ? subtitle : ""}</div> -->
          </div>
        </div>
      {/each}
    </div>
  </div>
{/if}
