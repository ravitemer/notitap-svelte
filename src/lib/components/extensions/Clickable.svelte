<script>
  import { NodeViewWrapper } from "svelte-tiptap";
  import { jsonContent } from "../../stores.js";
  export let selected;
  export let getPos;
  export let node;
  export let editor;
  export let updateAttributes;
  $: count = node.attrs.count;
  $: items = Array.from({ length: count });
  $: json = JSON.parse($jsonContent || "{}")
  $: headings = json.content?.filter((block) => block.type === "heading").map((block) => ({
    block,
    level: block.attrs.level,
    id : block.attrs.id,
    content: block.content?.reduce((acc, cur) => acc + cur.text, "") || "",
  })).filter(x => !!x.content.trim()) || []
  const classes = {
    1 : "my-2",
    2 : "ml-4 my-1 text-[16px]",
    3 : "ml-8 my-0.5 text-[14px]",
  }
  function onHeadingClicked(heading) {
    const {block,id, level, content } = heading;
    const selector = `h${level}[id="${id}"]`;
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }
</script>

<NodeViewWrapper
  class="p-4 my-8"
>
  <!-- <div -->
  <!-- on:click={() => { -->
  <!--   updateAttributes({ -->
  <!--     count: node.attrs.count + 1, -->
  <!--   }); -->
  <!-- }} -->
  <!--   > -->
  <!--   {#each items as _} -->
  <!--     <span class="text-green-400">👍</span> -->
  <!--     {:else} -->
  <!--     <span class="text-gray-400">No Items</span> -->
  <!--   {/each} -->
  <!-- </div> -->
  {#each headings  as heading}
    <div on:click={() => onHeadingClicked(heading)} class="{classes[heading.level]} hover:bg-gray-600 hover:text-white truncate break-keep underline">{heading.content}</div>
  {:else}
    <div class="">No headings</div>
  {/each}
  <!-- {JSON.stringify(json)} -->
</NodeViewWrapper>
