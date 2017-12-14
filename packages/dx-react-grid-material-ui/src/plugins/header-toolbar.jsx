import React from 'react';
import { HeaderToolbar as HeaderToolbarBase } from '@devexpress/dx-react-grid';
import { Toolbar } from '../templates/toolbar';

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
