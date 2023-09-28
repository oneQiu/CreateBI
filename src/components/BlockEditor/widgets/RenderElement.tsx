import { type FC } from 'react';
import { type RenderElementProps, useSelected } from 'slate-react';
import { type BlockElement } from '..';
import { NodeType } from '../utils/constans';
import { Editor } from 'slate';
import { BlockEditorUtil } from '../utils';
import { BlockNode } from '../utils/node.ts';

const RenderElement: FC<RenderElementProps & { editor: Editor }> = ({ element, attributes, children, editor }) => {
  const selected = useSelected();

  const blockEditorUtil = new BlockEditorUtil({ editor });

  // 添加一些自定义元素
  const appendCustomAttributes = () => {
    const node = new BlockNode((element as BlockElement).type as NodeType);
    Object.assign(attributes, {
      'data-block-type': (element as BlockElement).type,
      className: [selected ? 'focused' : '', node.hasPlaceholder() && blockEditorUtil.isEmpty() ? 'is-empty' : ''].join(
        ' '
      ),
      'data-placeholder': node.placeholder
    });
  };

  appendCustomAttributes();

  switch ((element as BlockElement).type) {
    case NodeType.BlockQuote:
      return <blockquote {...attributes}>{children}</blockquote>;
    case NodeType.BulletedList:
      return <ul {...attributes}>{children}</ul>;
    case NodeType.Heading1:
      return <h1 {...attributes}>{children}</h1>;
    case NodeType.Heading2:
      return <h2 {...attributes}>{children}</h2>;
    case NodeType.Heading3:
      return <h3 {...attributes}>{children}</h3>;
    case NodeType.Heading4:
      return <h4 {...attributes}>{children}</h4>;
    case NodeType.Heading5:
      return <h5 {...attributes}>{children}</h5>;
    case NodeType.Heading6:
      return <h6 {...attributes}>{children}</h6>;
    case NodeType.ListItem:
      return <li {...attributes}>{children}</li>;
    default:
      return <div {...attributes}>{children}</div>;
  }
};

export default RenderElement;
