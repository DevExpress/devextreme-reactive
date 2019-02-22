import * as React from 'react';
import { DropTarget } from '../drag-drop/target';

export const withDragTarget = (Component, dragPayload, componentPayload) => {
  const DragWrapper = () => (
    <DropTarget
      sourcePayload={dragPayload}
    >
      <Component {...componentPayload} />
    </DropTarget>
  );

  return DragWrapper;
};
