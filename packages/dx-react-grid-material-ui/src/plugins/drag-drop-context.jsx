import React from 'react';

import { DragDropContext as DragDropContextBase } from '@devexpress/dx-react-grid';
import { Container, Column } from '../templates/drag-drop';

const containerTemplate = props => <Container {...props} />;
const columnTemplate = props => <Column {...props} />;

export const DragDropContext = props => (
  <DragDropContextBase
    containerTemplate={containerTemplate}
    columnTemplate={columnTemplate}
    {...props}
  />
);
