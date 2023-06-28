<script>
  import { NotionLikeEditor } from "notion-like-editor";
  // import "$lib/css/base.css"
  import "notion-like-editor/notion.css";
  let json = {};
  let editor;

  const content = {
    type: "doc",
    content: [
      {
        type: "clickable",
        attrs: {
          count: 0,
        },
      },
      {
        type: "heading",
        attrs: { level: 1,id: "1" },
        content: [
          {
            type: "text",
            text: "This is editable rich text, much better than a textarea!",
          },
        ],
      },
      {
        type: "heading",
        attrs: { level: 2 ,id:"2"},
        content: [
          {
            type: "text",
            text: "Try it out for yourself!",
          },
        ],
      },
      {
        type: "heading",
        attrs: { level: 3,id:"3" },
        content: [
          {
            type: "text",
            text: "This is editable rich text, much better than a textarea! This is editable rich text, much better than a textarea! This is editable rich text, much better than a textarea! This is editable rich text, much better than a textarea!",
          },
        ],
      },
    ],
  };
</script>

<!-- {JSON.stringify(json)} -->
<NotionLikeEditor tiptapConfig={{}} bind:editor {content} bind:json />
