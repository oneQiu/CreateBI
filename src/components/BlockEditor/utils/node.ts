import { NodePlaceholder, NodeType } from './constans';

interface Node {
  key: NodeType;
  placeholder?: string;
}

const nodeList: Node[] = [
  { key: NodeType.ListItem },
  { key: NodeType.Heading1, placeholder: NodePlaceholder.Heading1 },
  { key: NodeType.Heading2, placeholder: NodePlaceholder.Heading2 },
  { key: NodeType.Heading3, placeholder: NodePlaceholder.Heading3 },
  { key: NodeType.Heading4, placeholder: NodePlaceholder.Heading4 },
  { key: NodeType.Heading5, placeholder: NodePlaceholder.Heading5 },
  { key: NodeType.Heading6, placeholder: NodePlaceholder.Heading6 },
  { key: NodeType.BlockQuote },
  { key: NodeType.BulletedList },
  { key: NodeType.Paragraph },
  { key: NodeType.Image }
];

export class BlockNode {
  node: Node;

  get key() {
    return this.node.key;
  }

  get placeholder() {
    if (this.hasPlaceholder()) return this.node.placeholder;
    return '';
  }

  constructor(nodeKey: NodeType) {
    const node = nodeList.find(i => i.key === nodeKey);
    if (node) {
      this.node = node;
    } else {
      throw Error('nodeKey must in enum NodeType');
    }
  }

  hasPlaceholder() {
    return !!this.node.placeholder;
  }
}
