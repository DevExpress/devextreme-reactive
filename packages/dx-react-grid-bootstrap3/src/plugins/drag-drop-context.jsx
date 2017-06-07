import React from 'react';

import { DragDropContext as DragDropContextBase } from '@devexpress/dx-react-grid';
import { Container, Column } from '../templates/drag-drop';

export const DragDropContext = props => (
  <DragDropContextBase
    containerTemplate={Container}
    columnTemplate={Column}
    {...props}
  />
);
