import * as React from 'react';
import { DropTarget } from '@devexpress/dx-react-core';

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
