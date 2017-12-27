import React from 'react';
import { DragDropProvider as DragDropProviderBase } from '@devexpress/dx-react-grid';
import { Container, Column } from '../templates/drag-drop';

export class DragDropProvider extends React.PureComponent {
  render() {
    return (
      <DragDropProviderBase
        containerComponent={Container}
        columnComponent={Column}
        {...this.props}
      />
    );
  }
}

DragDropProvider.Container = Container;
DragDropProvider.Column = Column;
