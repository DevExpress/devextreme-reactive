import React from 'react';
import PropTypes from 'prop-types';
import { PagingPanel as PagingPanelBase } from '@devexpress/dx-react-grid';
import { Pager } from '../templates/pager';

export const PagingPanel = ({ showAllText, ...restProps }) => (
  <PagingPanelBase
    pagerTemplate={
      props => (
        <Pager
          showAllText={showAllText}
          {...props}
        />
      )
    }
    {...restProps}
  />
);

PagingPanel.propTypes = {
  showAllText: PropTypes.string,
};
PagingPanel.defaultProps = {
  showAllText: undefined,
};
