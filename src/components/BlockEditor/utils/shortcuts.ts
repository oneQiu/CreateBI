import { ReactEditor } from 'slate-react';
import { Range, Editor, Element, Transforms, Point, BaseElement } from 'slate';
import { BlockElement, BlockNode } from '../index.tsx';
import { NodeType } from './constans';

/**
 * 快捷键
 */
export const SHORTCUTS: Record<string, string> = {
  '*': NodeType.ListItem,
  '-': NodeType.ListItem,
  '+': NodeType.ListItem,
  '>': NodeType.BlockQuote,
  '#': NodeType.Heading1,
  '##': NodeType.Heading2,
  '###': NodeType.Heading3,
  '####': NodeType.Heading4,
  '#####': NodeType.Heading5,
  '######': NodeType.Heading6
};

/**
 * 赋予快捷键监听
 * @param editor
 */
export const withShortcuts = (editor: ReactEditor) => {
  const { deleteBackward, insertText } = editor;

  // 插入重载
  editor.insertText = text => {
    const { selection } = editor;

    // 空格触发 & 光标无选中内容
    if (text.endsWith(' ') && selection && Range.isCollapsed(selection)) {
      const { anchor } = selection;
      const block = Editor.above(editor, {
        match: node => Element.isElement(node) && Editor.isBlock(editor, node)
      });
      const path = block ? block[1] : [];
      const start = Editor.start(editor, path);
      const range = { anchor, focus: start };
      const beforeText = Editor.string(editor, range) + text.slice(0, -1);
      if (beforeText in SHORTCUTS) {
        const shortcutKey: string = SHORTCUTS[beforeText];
        Transforms.select(editor, range);
        // 删除快捷键符号
        if (!Range.isCollapsed(range)) {
          Transforms.delete(editor);
        }
        // 在当前处插入接点
        Transforms.setNodes<BlockNode>(
          editor,
          { type: shortcutKey },
          { match: node => Element.isElement(node) && Editor.isBlock(editor, node) }
        );
        // 列表需要包裹一层
        if (shortcutKey === NodeType.ListItem) {
          Transforms.wrapNodes(editor, { type: NodeType.BulletedList, children: [] } as BaseElement, {
            match: node =>
              !Editor.isEditor(node) && Element.isElement(node) && (node as BlockNode).type === NodeType.Paragraph
          });
        }
        return;
      }
    }
    insertText(text);
  };

  // 删除重载
  editor.deleteBackward = (...args) => {
    const { selection } = editor;

    if (selection && Range.isCollapsed(selection)) {
      const match = Editor.above<BlockElement>(editor, {
        match: n => Element.isElement(n) && Editor.isBlock(editor, n)
      });

      if (match) {
        const [block, path] = match;
        const start = Editor.start(editor, path);

        if (
          !Editor.isEditor(block) &&
          Element.isElement(block) &&
          block.type !== NodeType.Paragraph &&
          Point.equals(selection.anchor, start)
        ) {
          Transforms.setNodes<BlockNode>(editor, {
            type: NodeType.Paragraph
          });

          if (block.type === NodeType.ListItem) {
            Transforms.unwrapNodes(editor, {
              match: n =>
                !Editor.isEditor(n) && Element.isElement(n) && (n as BlockNode).type === NodeType.BulletedList,
              split: true
            });
          }

          return;
        }
      }

      deleteBackward(...args);
    }
  };

  return editor;
};
