import { ReactEditor } from 'slate-react';

const withNanoId = (editor: ReactEditor) => {
  const { insertNode } = editor;

  editor.insertNode = node => {
    console.log('node', node);
    insertNode(node);
  };

  return editor;
};

export default withNanoId;
