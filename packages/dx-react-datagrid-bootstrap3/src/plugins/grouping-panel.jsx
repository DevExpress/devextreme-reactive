import React from 'react';
import { GroupingPanel as GroupingPanelBase } from '@devexpress/dx-react-datagrid';
import { GroupPanel } from '../templates/group-panel';
import { GroupPanelCell } from '../templates/group-panel-cell';

export const GroupingPanel = ({ sortingEnabled, groupByColumnText }) => (
  <GroupingPanelBase
    sortingEnabled={sortingEnabled}
    groupPanelTemplate={
      props => (
        <GroupPanel
          groupByColumnText={groupByColumnText}
          {...props}
        />
      )
    }
    groupPanelCellTemplate={GroupPanelCell}
  />
);

GroupingPanel.propTypes = {
  sortingEnabled: React.PropTypes.bool,
  groupByColumnText: React.PropTypes.string,
};
GroupingPanel.defaultProps = {
  sortingEnabled: false,
  groupByColumnText: undefined,
};
