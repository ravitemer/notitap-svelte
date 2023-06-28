import { slashVisible, slashItems, slashLocation, slashProps } from '../../stores.js';

const images = {
  "paragraph": "https://www.notion.so/images/blocks/text/en-US.png",
  "to-do": "https://www.notion.so/images/blocks/to-do.f8d20542.png",
  "h1": "https://www.notion.so/images/blocks/header.57a7576a.png",
  "h2": "https://www.notion.so/images/blocks/subheader.9aab4769.png",
  "h3": "https://www.notion.so/images/blocks/subsubheader.d0ed0bb3.png",
  "bulleted-list": "https://www.notion.so/images/blocks/bulleted-list.0e87e917.png",
  "numbered-list": "https://www.notion.so/images/blocks/numbered-list.0406affe.png",
  "toggle-list": "https://www.notion.so/images/blocks/toggle.5e462b2a.png",
  "quote": "https://www.notion.so/images/blocks/quote/en-US.png",
  "divider": "https://www.notion.so/images/blocks/divider.210d0faf.png",
  "link": "https://www.notion.so/images/blocks/link.dd415f7c.png",
  "callout": "https://www.notion.so/images/blocks/callout.7b4c39c4.png",
  "image": "https://www.notion.so/images/blocks/image.33d80a98.png",
  "web-bookmark": "https://www.notion.so/images/blocks/web-bookmark.82a15180.png"

}
export default {
  items: ({ query }) => {
    return [
      {
        title: 'Paragraph',
        subtitle: 'Plain text',
        img: images["paragraph"],
        command: ({ editor, range }) => {
          editor.commands.deleteRange(range);
          editor.commands.insertContent('<p>&#8203</p>');
        }
      },
      {
        title: 'To Dos',
        subtitle: 'Create a to do list with checkboxes',
        img: images["to-do"],
        command: ({ editor, range }) => {
          editor.commands.deleteRange(range);
          editor.commands.insertContent(
            '<ul data-type="taskList"><li data-checked="false"><li>&#8203</li></ul>'
          );
        }
      },
      {
        title: 'Heading 1',
        img: images["h1"],
        subtitle: 'BIG heading',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).setNode('heading', { level: 1 }).run();
        }
      },
      {
        title: 'Heading 2',
        img: images["h2"],
        subtitle: 'Less Big heading',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).setNode('heading', { level: 2 }).run();
        }
      },
      {
        title: 'Heading 3',
        img: images["h3"],
        subtitle: 'Medium big heading',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).setNode('heading', { level: 3 }).run();
        }
      },
      {
        title: 'Bullet List',
        img: images["bulleted-list"],
        subtitle: 'Pew pew pew',
        command: ({ editor, range }) => {
          editor.commands.deleteRange(range);
          editor.commands.toggleBulletList();
        }
      },
      {
        title: 'Numbered List',
        subtitle: '1, 2, 3, 4...',
        img: images["numbered-list"],
        command: ({ editor, range }) => {
          editor.commands.deleteRange(range);

          editor.commands.toggleOrderedList();
        }
      },
      {
        title: 'Divider',
        subtitle: '---',
        img: images["divider"],
        command: ({ editor, range }) => {
          editor.commands.deleteRange(range);
          editor.commands.insertContent('<hr />');
        }

      },
      {
        title: 'Link',
        subtitle: 'Create a link',
        img: images["link"],
        command: ({ editor, range }) => {
          editor.commands.deleteRange(range);
          editor.commands.insertContent('<a href="https://">Link</a>');
        }
      },
      {
        title: 'Image',
        subtitle: 'Upload an image',
        img: images["image"],
        command: ({ editor, range }) => {
          editor.commands.deleteRange(range);
          const src = prompt('Enter the image URL');
          editor.commands.setImage(src)
        }
      },
      {
        title: 'Web Bookmark',
        subtitle: 'Bookmark a website',
        img: images["web-bookmark"],
        command: ({ editor, range }) => {
          editor.commands.deleteRange(range);
          editor.commands.insertContent('<a href="https://">Web Bookmark</a>');
        }
      },
      {
        title: 'Quote',
        img: images["quote"],
        subtitle: 'Wise words',
        command: ({ editor, range }) => {
          editor.commands.deleteRange(range);
          editor.commands.insertContent('<blockquote>&#8203</blockquote>');
        }
      },
      {
        title: 'Callout',
        img: images["callout"],
        subtitle: 'Pew pew pew',
        command: ({ editor, range }) => {
          editor.commands.deleteRange(range);
          editor.commands.insertContent('<blockquote>&#8203</blockquote>');
        }
      },
      {
        title: 'Toggle List',
        img: images["toggle-list"],
        subtitle: 'Todos List',
        command: ({ editor, range }) => {
          editor.commands.deleteRange(range);
          editor.commands.toggleBulletList();
        }
      },
    ]
      .filter((item) => item.title.toLowerCase().startsWith(query.toLowerCase()))
      .slice(0, 10);
  },

  render: () => {
    return {
      onStart: (props) => {
        let editor = props.editor;
        let range = props.range;
        let location = props.clientRect();
        slashProps.set({ editor, range });
        slashVisible.set(true);
        slashLocation.set({ x: location.x, y: location.y, height: location.height });
        slashItems.set(props.items);
      },

      onUpdate(props) {
        slashItems.set(props.items);
      },

      onKeyDown(props) {
        if (props.event.key === 'Escape') {
          slashVisible.set(false);
          return true;
        }
      },

      onExit() {
        slashVisible.set(false);
      }
    };
  }
};
