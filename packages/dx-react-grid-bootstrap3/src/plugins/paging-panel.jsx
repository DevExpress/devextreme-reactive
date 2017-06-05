import React from 'react';
import { PagingPanel as PagingPanelBase } from '@devexpress/dx-react-grid';
import { Pager } from '../templates/pager';

const pagerTemplate = props => <Pager {...props} />;

export const PagingPanel = props => (
  <PagingPanelBase
    pagerTemplate={pagerTemplate}
    {...props}
  />
);

