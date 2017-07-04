import React from 'react';
import PropTypes from 'prop-types';

import { combineTemplates } from '@devexpress/dx-react-core';
import { GroupingPanel as GroupingPanelBase } from '@devexpress/dx-react-grid';

import { GroupPanel } from '../templates/group-panel';
import { GroupPanelCell } from '../templates/group-panel-cell';

const defaultCellTemplate = props => <GroupPanelCell {...props} />;

export const GroupingPanel = ({ groupByColumnText, groupPanelCellTemplate, ...restProps }) => (
  <GroupingPanelBase
    groupPanelTemplate={
      props => (
        <GroupPanel
          groupByColumnText={groupByColumnText}
          groupPanelCellTemplate={combineTemplates(
            groupPanelCellTemplate,
            defaultCellTemplate,
          )}
          {...props}
        />
      )
    }
    {...restProps}
  />
);

GroupingPanel.propTypes = {
  allowSorting: PropTypes.bool,
  groupByColumnText: PropTypes.string,
  groupPanelCellTemplate: PropTypes.func,
};

GroupingPanel.defaultProps = {
  allowSorting: false,
  groupByColumnText: undefined,
  groupPanelCellTemplate: undefined,
};
