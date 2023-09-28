/**
 * 块编辑器
 * @constructor
 */
import { Editable, Slate, withReact, ReactEditor } from 'slate-react';
import { createEditor, type Node, BaseElement, Editor, Transforms, type BaseSelection } from 'slate';
import { type FC, KeyboardEventHandler, useMemo, useState } from 'react';
import { withShortcuts } from './utils/shortcuts';
import { withHistory } from 'slate-history';
import { type BlockEditorProps } from './interface';
import RenderElement from './widgets/RenderElement';
import withNanoId from './utils/withNanoId';
import { NodeType } from './utils/constans';
import './index.less';
import { BlockEditorUtil } from './utils';

export type BlockNode = Node & {
  type: string;
};

export interface BlockElement extends BaseElement {
  type: string;
}

const BlockEditor: FC<BlockEditorProps> = ({ placeholder }) => {
  const editor = useMemo(() => withNanoId(withShortcuts(withReact(withHistory(createEditor())))), []);
  const [selectionHistory, setSelectionHistory] = useState<BaseSelection>();

  const onChange = (value: any[]) => {
    // console.log('onChange', value);
  };

  const onBlur = () => {
    if (editor.selection) setSelectionHistory(editor.selection);
  };

  const onKeyDown: KeyboardEventHandler<HTMLDivElement> = event => {
    // console.log('event', event);
    const util = new BlockEditorUtil({ editor });
    util.getElementBySelection();
    // 空md回车清除
    if (util.isEmpty() && event.key === 'Enter') {
      event.preventDefault();
      Transforms.setNodes(editor, { type: NodeType.Paragraph, children: [{ text: '' }] });
      console.log('isEmpty');
    }
  };

  return (
    <div
      className={'mx-auto block-editor bg-white h-full p-2'}
      style={{ width: 820 }}
      onClick={() => {
        ReactEditor.focus(editor);
      }}
    >
      <Slate
        editor={editor}
        initialValue={[
          {
            type: NodeType.Paragraph,
            children: [{ text: '' }]
          }
        ]}
        onChange={onChange}
      >
        <Editable
          className={'outline-none'}
          renderPlaceholder={placeholder}
          onKeyDown={onKeyDown}
          autoFocus
          onFocus={() => {
            console.log('聚焦', selectionHistory);
          }}
          onBlur={onBlur}
          spellCheck
          renderElement={props => <RenderElement {...props} editor={editor} />}
        />
      </Slate>
    </div>
  );
};

export default BlockEditor;
