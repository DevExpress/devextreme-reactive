import React from 'react';
import { GroupingPanel as GroupingPanelBase } from '@devexpress/dx-react-datagrid';
import {
  GroupPanel,
  GroupPanelCellTemplate,
  GroupPanelCellContentTemplate,
} from '../templates/group-panel';

export const GroupingPanel = ({ groupByColumnText }) => (
  <GroupingPanelBase
    groupPanelTemplate={
      props => (
        <GroupPanel
          cellTemplate={GroupPanelCellTemplate}
          cellContentTemplate={GroupPanelCellContentTemplate}
          groupByColumnText={groupByColumnText}
          {...props}
        />
      )
    }
  />
);

GroupingPanel.propTypes = {
  groupByColumnText: React.PropTypes.string,
};
GroupingPanel.defaultProps = {
  groupByColumnText: undefined,
};
