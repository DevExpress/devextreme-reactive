import React from 'react';
import { Toolbar as ToolbarBase } from '@devexpress/dx-react-grid';
import { Toolbar as Root } from '../templates/toolbar';

const FlexibleSpace = () => (<div />);

export class Toolbar extends React.PureComponent {
  render() {
    return (
      <ToolbarBase
        rootComponent={Root}
        flexibleSpaceComponent={FlexibleSpace}
        {...this.props}
      />
    );
  }
}

Toolbar.Root = Root;
