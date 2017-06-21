import React from 'react';
import PropTypes from 'prop-types';

import { GroupPanelLayout } from '@devexpress/dx-react-grid';

import { GroupPanelCell } from './group-panel-cell';

const defaultText = (
  <span style={{ marginBottom: '5px', display: 'inline-block' }}>
    Click
    &nbsp;
    <i
      className="glyphicon glyphicon-th-list"
      style={{
        top: '0',
        fontSize: '9px',
      }}
    />
    &nbsp;
    icon in the column header to group by that column
  </span>
);

export const GroupPanel = ({ groupByColumnText, ...restProps }) => (
  <GroupPanelLayout
    groupByColumnText={groupByColumnText || defaultText}
    groupPanelCellTemplate={GroupPanelCell}
    {...restProps}
  />
);

GroupPanel.propTypes = {
  groupByColumnText: PropTypes.string,
};

GroupPanel.defaultProps = {
  groupByColumnText: undefined,
};
