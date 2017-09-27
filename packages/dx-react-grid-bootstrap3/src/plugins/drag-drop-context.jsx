import React from 'react';

import { DragDropContext as DragDropContextBase } from '@devexpress/dx-react-grid';
import { Container, Column } from '../templates/drag-drop';

const containerTemplate = props => <Container {...props} />;
const columnTemplate = props => <Column {...props} />;

export class DragDropContext extends React.PureComponent {
  render() {
    return (
      <DragDropContextBase
        containerTemplate={containerTemplate}
        columnTemplate={columnTemplate}
        {...this.props}
      />
    );
  }
}
