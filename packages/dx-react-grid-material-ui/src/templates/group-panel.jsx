import React from 'react';
import PropTypes from 'prop-types';

import List from 'material-ui-icons/List';

import { GroupPanelLayout } from '@devexpress/dx-react-grid';

import { GroupPanelCell } from './group-panel-cell';

const groupPanelCellTemplate = props => <GroupPanelCell {...props} />;

const defaultText = (
  <span>
    Click
    &nbsp;
    <List />
    &nbsp;
    icon in the column header to group by that column
  </span>
);

export const GroupPanel = ({ groupByColumnText, ...restProps }) => (
  <GroupPanelLayout
    groupByColumnText={groupByColumnText || defaultText}
    groupPanelCellTemplate={groupPanelCellTemplate}
    {...restProps}
  />
);

GroupPanel.propTypes = {
  groupByColumnText: PropTypes.string,
};

GroupPanel.defaultProps = {
  groupByColumnText: undefined,
};
