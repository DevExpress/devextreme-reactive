import React from 'react';
import PropTypes from 'prop-types';
import { GroupingPanel as GroupingPanelBase } from '@devexpress/dx-react-datagrid';
import {
  GroupPanel,
  GroupPanelCellTemplate,
} from '../templates/group-panel';

export const GroupingPanel = ({ groupByColumnText }) => (
  <GroupingPanelBase
    groupPanelTemplate={
      props => (
        <GroupPanel
          cellTemplate={GroupPanelCellTemplate}
          groupByColumnText={groupByColumnText}
          {...props}
        />
      )
    }
  />
);

GroupingPanel.propTypes = {
  groupByColumnText: PropTypes.string,
};
GroupingPanel.defaultProps = {
  groupByColumnText: undefined,
};
