import { Editor, Element, Node, Path } from 'slate';
import { ReactEditor } from 'slate-react';

export class BlockEditorUtil {
  editor: ReactEditor;

  constructor({ editor }: { editor: ReactEditor }) {
    this.editor = editor;
  }

  /**
   * 当前行是否为空
   * @description 仅适用于renderElement keyDown会存在延迟
   */
  isEmpty() {
    let isEmpty = false;
    const { selection } = this.editor;
    if (selection) {
      const [block] = Editor.nodes(this.editor, {
        at: selection.focus.path,
        match: n => Element.isElement(n) && Editor.isBlock(this.editor, n)
      });

      if (block) {
        const [blockNode] = block;
        const blockText = Node.string(blockNode);
        console.log(blockText);
        isEmpty = blockText === '';
      }
    }
    return isEmpty;
  }

  /**
   * 获取element
   * @description 获取光标所在的element，默认当前位置
   */
  getElementBySelection(selection = this.editor.selection) {
    if (selection) {
      // 获取焦点选取
      const focusPath = selection.focus.path;

      // 使用 Path 模块来获取光标所在元素的路径
      const elementPath = Path.parent(focusPath);

      // 使用路径来查找对应的元素
      const element = Editor.node(this.editor, elementPath);
      console.log(element);
    }
  }
}
