import React from 'react';
import { PagingPanel as PagingPanelBase } from '@devexpress/dx-react-datagrid';
import { Pager } from '../templates/pager';

export const PagingPanel = props => (
  <PagingPanelBase
    pagerTemplate={Pager}
    {...props}
  />
);

