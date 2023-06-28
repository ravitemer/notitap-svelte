<script>
  import { onMount, onDestroy } from "svelte";
  import { v4 as uuid } from "uuid";
  import { mergeAttributes } from "@tiptap/core";
  import { Editor } from "@tiptap/core";
  import StarterKit from "@tiptap/starter-kit";
  import Heading from "@tiptap/extension-heading";
  import Placeholder from "@tiptap/extension-placeholder";
  import TaskList from "@tiptap/extension-task-list";
  import TaskItem from "@tiptap/extension-task-item";
  import Link from "@tiptap/extension-link";
  import Focus from "@tiptap/extension-focus";
  // import CustomImage from "../extensions/image.js"
  import Clickable from "../extensions/clickable.js";

  import suggestionConfig from "./suggestion-config.js";
  import SuggestionExtension from "./suggesion-extension.js";
  import SuggestionList from "./SuggestionList.svelte";
  import {
    slashVisible,
    slashItems,
    slashProps,
    editorWidth,
    jsonContent,
  } from "../../stores";

  // import "../../css/notion/index.css";

  export let editor;
  export let content;
  export let tiptapConfig = {};
  export let json;
  export let html;
  export let onClick;

  let selectedIndex = 0;
  $: selectedIndex = $slashVisible ? selectedIndex : 0;
  $: $editorWidth = w ? w : "0";

  function handleKeydown(event) {
    if (!$slashVisible) return;
    if (event.key === "ArrowUp") {
      event.preventDefault();
      upHandler();
      return true;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      downHandler();
      return true;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      enterHandler();
      return true;
    }
    return false;
  }

  function upHandler() {
    selectedIndex =
      (selectedIndex + $slashItems.length - 1) % $slashItems.length;
  }

  function downHandler() {
    selectedIndex = (selectedIndex + 1) % $slashItems.length;
  }

  function enterHandler() {
    selectItem(selectedIndex);
  }
  function selectItem(index) {
    const item = $slashItems[index];
    if (item) {
      let range = $slashProps.range;
      item.command({ editor, range });
    }
  }
  let element, w;
  onMount(() => {
    editor = new Editor({
      element: element,
      editorProps: {
        attributes: {
          class: "notion",
        },
      },
      extensions: [
        StarterKit.configure({
          heading: false,
        }),
        Focus,
        Heading.extend({
          addAttributes() {
            return {
              ...this.parent?.(),
              id: {
                default: uuid(),
                // parseHTML: (e) => {
                //   console.log("parseHTML", e);
                //   return e.getAttribute("id");

                // },
                renderHTML: (attributes) => {
                  return {
                    id: attributes.id,
                  };
                },
              },
            };
          },
          parseHTML() {
            return this.options.levels.map((level) => ({
              tag: `h${level}`,
              attrs: {
                level,
              },
            }));
          },
          renderHTML(x) {
            return [
              `h${x.node.attrs.level}`,
              mergeAttributes(this.options.HTMLAttributes, x.HTMLAttributes),
              0,
            ];
          },
        }),
        Placeholder,
        TaskList,
        TaskItem,
        Link,
        SuggestionExtension.configure({
          suggestion: suggestionConfig,
        }),
        Clickable,
        // CustomImage,
        // Clickable,
      ],
      content,
      onTransaction: () => {
        // force re-render so `editor.isActive` works as expected
        editor = editor;
      },
      onUpdate: ({ editor }) => {
        html = editor.getHTML();
        json = editor.getJSON();
        $jsonContent = JSON.stringify(json);
      },
      onCreate: ({ editor }) => {
        const lastChild = editor.state.doc.lastChild;
        if (lastChild) {
          const pos = editor.state.doc.content.size - lastChild.nodeSize;
          const hasContent = lastChild.content.size > 0;
          if (hasContent) {
            //go to the end of the node text
            editor.commands.focus(pos + lastChild.content.size + 1);
          } else {
            //go to the beginning of the node text
            editor.commands.focus(pos);
          }
        }
        json = editor.getJSON();
        $jsonContent = JSON.stringify(json);
        html = editor.getHTML();
      },
      ...tiptapConfig,
    });
  });

  onDestroy(() => {
    if (editor) {
      editor.destroy();
    }
  });
</script>

<div
  class="notion-wrapper {$$props.class}"
  bind:clientWidth={w}
  bind:this={element}
  on:keydown|capture={handleKeydown}
  on:click={onClick}
  on:click|self={() => {
    $slashVisible = false;
    editor && editor.commands.focus();
  }}
/>
<SuggestionList {selectedIndex} />

<!-- <div class="sm:flex my-4"> -->
<!--   <button -->
<!--     on:click={() => { -->
<!--       output = editor.getJSON(); -->
<!--       outputType = "json"; -->
<!--     }} -->
<!--     class="m-2 border rounded-full px-4 py-2 border-slate-500 {outputType == -->
<!--     'json' -->
<!--       ? 'bg-blue-200' -->
<!--       : ''}">See JSON Output</button -->
<!--   > -->
<!--   <button -->
<!--     on:click={() => { -->
<!--       output = editor.getHTML(); -->
<!--       outputType = "html"; -->
<!--     }} -->
<!--     class=" m-2 border rounded-full px-4 py-2 border-slate-500 {outputType == -->
<!--     'html' -->
<!--       ? 'bg-blue-200' -->
<!--       : ''}">See HTML Output</button -->
<!--   > -->
<!-- </div> -->

<!-- <a href="https://github.com/sibiraj-s/svelte-tiptap" target="_blank"> -->
<!--   Creating a custom svelte block with Tiptap -->
<!-- </a> -->
