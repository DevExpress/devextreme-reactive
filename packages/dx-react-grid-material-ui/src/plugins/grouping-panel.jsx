import React from 'react';
import PropTypes from 'prop-types';
import { GroupingPanel as GroupingPanelBase } from '@devexpress/dx-react-grid';
import { GroupPanel } from '../templates/group-panel';
import { GroupPanelCell } from '../templates/group-panel-cell';

const groupPanelCellTemplate = props => <GroupPanelCell {...props} />;

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
    groupPanelCellTemplate={groupPanelCellTemplate}
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
