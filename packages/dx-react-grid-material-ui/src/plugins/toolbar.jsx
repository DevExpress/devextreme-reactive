import React from 'react';
import { Toolbar as ToolbarBase } from '@devexpress/dx-react-grid';
import { Toolbar as ToolbarComponent } from '../templates/toolbar';

export class Toolbar extends React.PureComponent {
  render() {
    return (
      <ToolbarBase
        toolbarComponent={ToolbarComponent}
        {...this.props}
      />
    );
  }
}
