import { mergeAttributes, Node } from '@tiptap/core'

export default Node.create({
  name: 'image',
  group: 'block',
  addOptions() {
    return {
      HTMLAttributes: {}
    }
  },
  addAttributes() {
    return {
      src: {
        default: null,
      },
    }
  },
  parseHTML() {
    return [
      {
        tag: 'img[src]',
      }
    ]
  },
  renderHTML(config) {
    console.log(config)
    return ['img', config.HTMLAttributes]
  },
  addCommands() {
    return {
      setImage: src => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: {
            src,
          },
        })
      }
    }
  },
})
