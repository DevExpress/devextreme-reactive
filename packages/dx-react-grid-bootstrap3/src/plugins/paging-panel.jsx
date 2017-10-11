import React from 'react';
import { PagingPanel as PagingPanelBase } from '@devexpress/dx-react-grid';
import { Pager } from '../templates/pager';

const pagerTemplate = props => <Pager {...props} />;
export class PagingPanel extends React.PureComponent {
  render() {
    return (
      <PagingPanelBase
        pagerTemplate={pagerTemplate}
        {...this.props}
      />
    );
  }
}
