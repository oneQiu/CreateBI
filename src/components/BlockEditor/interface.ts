import { RenderPlaceholderProps } from 'slate-react';

export interface BlockEditorProps {
  placeholder?: (props: RenderPlaceholderProps) => JSX.Element;
}
