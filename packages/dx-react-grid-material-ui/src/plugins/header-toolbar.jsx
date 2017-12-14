import React from 'react';
import { HeaderToolbar as HeaderToolbarBase } from '@devexpress/dx-react-grid';
import { Toolbar as ToolbarMUI } from 'material-ui';

const Toolbar = props => <ToolbarMUI {...props} />;

export class HeaderToolbar extends React.PureComponent {
  render() {
    return (
      <HeaderToolbarBase
        toolbarComponent={Toolbar}
        {...this.props}
      />
    );
  }
}

HeaderToolbar.Toolbar = HeaderToolbar;
