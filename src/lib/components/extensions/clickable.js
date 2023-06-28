import { Node } from '@tiptap/core'
import { SvelteNodeViewRenderer } from "svelte-tiptap";
import Clickable from './Clickable.svelte'

export default Node.create({
  name: 'clickable',
  group: 'block',
  atom: true,

  addAttributes() {
    return {
      count: {
        default: 0,
      },
    }
  },
  parseHTML() {
    return [
      {
        tag: 'clickable',
      }
    ]
  },
  renderHTML({ HTMLAttributes }) {
    return ['clickable', HTMLAttributes]
  },
  addNodeView() {
    return SvelteNodeViewRenderer(Clickable)

  },
})








