import * as React from 'react';
import { Toolbar as ToolbarBase } from '@devexpress/dx-react-grid';
import { Toolbar as Root } from '../templates/toolbar/toolbar';
import { FlexibleSpace } from '../templates/toolbar/flexible-space';

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
