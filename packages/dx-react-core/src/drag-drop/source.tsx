import * as React from 'react';
import { DragDropContext } from './context';
import { Draggable } from '../draggable';

const defaultProps = {
  onStart: ({ clientOffset }) => {},
  onUpdate: ({ clientOffset }) => {},
  onEnd: ({ clientOffset }) => {},
  elementOffsetY: 0,
};
type DragSourceDefaultProps = Readonly<typeof defaultProps>;
type DragSourceProps = {
  payload: any;
} & Partial<DragSourceDefaultProps>;

/** @internal */
export class DragSource extends React.Component<DragSourceProps & DragSourceDefaultProps> {
  static defaultProps = defaultProps;

  shouldComponentUpdate(nextProps) {
    const { children } = this.props;
    return nextProps.children !== children;
  }

  render() {
    const dragDropProvider = this.context;
    const {
      onStart, onUpdate, onEnd, payload, children, elementOffsetY,
    } = this.props;
    return (
      <Draggable
        onStart={({ x, y }) => {
          dragDropProvider.start(payload, { x, y });
          onStart({ clientOffset: { x, y } });
        }}
        onUpdate={({ x, y }) => {
          dragDropProvider.update({ x, y: y - elementOffsetY });
          onUpdate({ clientOffset: { x, y: y - elementOffsetY } });
        }}
        onEnd={({ x, y }) => {
          dragDropProvider.end({ x, y: y - elementOffsetY });
          onEnd({ clientOffset: { x, y: y - elementOffsetY } });
        }}
      >
        {children}
      </Draggable>
    );
  }
}
DragSource.contextType = DragDropContext;
