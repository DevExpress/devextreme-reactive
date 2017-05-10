import React from 'react';
import PropTypes from 'prop-types';
import { GroupingPanel as GroupingPanelBase } from '@devexpress/dx-react-datagrid';
import { GroupPanel } from '../templates/group-panel';
import { GroupPanelCell } from '../templates/group-panel-cell';

export const GroupingPanel = ({ groupByColumnText, ...restProps }) => (
  <GroupingPanelBase
    groupPanelTemplate={
      props => (
        <GroupPanel
          groupByColumnText={groupByColumnText}
          {...props}
        />
      )
    }
    groupPanelCellTemplate={GroupPanelCell}
    {...restProps}
  />
);

GroupingPanel.propTypes = {
  allowSorting: PropTypes.bool,
  groupByColumnText: PropTypes.string,
};
GroupingPanel.defaultProps = {
  allowSorting: false,
  groupByColumnText: undefined,
};
