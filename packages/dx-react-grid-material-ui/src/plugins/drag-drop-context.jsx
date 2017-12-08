import React from 'react';
import { DragDropContext as DragDropContextBase } from '@devexpress/dx-react-grid';
import { Container, Column } from '../templates/drag-drop';

export class DragDropContext extends React.PureComponent {
  render() {
    return (
      <DragDropContextBase
        containerComponent={Container}
        columnComponent={Column}
        {...this.props}
      />
    );
  }
}

DragDropContext.Container = Container;
DragDropContext.Column = Column;
