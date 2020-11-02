import * as React from 'react';
import { DragDropContext } from './context';
import { Draggable } from '../draggable';

const defaultProps = {
  onStart: ({ clientOffset }) => {},
  onUpdate: ({ clientOffset }) => {},
  onEnd: ({ clientOffset }) => {},
};
type DragSourceDefaultProps = Readonly<typeof defaultProps>;
type DragSourceProps = {
  payload: any;
  ref?: React.Ref<Element>;
} & Partial<DragSourceDefaultProps>;

/** @internal */
export const DragSource: React.FC<DragSourceProps> = React.forwardRef(({
  onStart, onUpdate, onEnd, payload, children,
}, ref) => {
  const context = React.useContext(DragDropContext);
  const dragDropProvider = context;

  return (
    <Draggable
      onStart={({ x, y }) => {
        dragDropProvider?.start(payload, { x, y });
        onStart?.({ clientOffset: { x, y } });
      }}
      onUpdate={({ x, y }) => {
        dragDropProvider?.update({ x, y });
        onUpdate?.({ clientOffset: { x, y } });
      }}
      onEnd={({ x, y }) => {
        dragDropProvider?.end({ x, y });
        onEnd?.({ clientOffset: { x, y } });
      }}
      dragItem={ref}
    >
      {children}
    </Draggable>
  );
});
DragSource.defaultProps = defaultProps;
