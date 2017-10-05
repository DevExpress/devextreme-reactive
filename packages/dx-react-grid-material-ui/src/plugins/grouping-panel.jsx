import React from 'react';
import PropTypes from 'prop-types';

import { combineTemplates } from '@devexpress/dx-react-core';
import { GroupingPanel as GroupingPanelBase } from '@devexpress/dx-react-grid';

import { GroupPanel } from '../templates/group-panel';
import { GroupPanelItem } from '../templates/group-panel-item';

const defaultCellTemplate = props => <GroupPanelItem {...props} />;

export class GroupingPanel extends React.PureComponent {
  render() {
    const {
      groupByColumnText,
      dragColumnHeaderText,
      groupingUnavailableText,
      groupPanelItemTemplate,
      ...restProps
    } = this.props;

    return (
      <GroupingPanelBase
        groupPanelTemplate={
          props => (
            <GroupPanel
              groupByColumnText={groupByColumnText}
              dragColumnHeaderText={dragColumnHeaderText}
              groupingUnavailableText={groupingUnavailableText}
              groupPanelItemTemplate={combineTemplates(
                groupPanelItemTemplate,
                defaultCellTemplate,
              )}
              {...props}
            />
          )
        }
        {...restProps}
      />
    );
  }
}

GroupingPanel.propTypes = {
  allowSorting: PropTypes.bool,
  groupByColumnText: PropTypes.string,
  dragColumnHeaderText: PropTypes.string,
  groupingUnavailableText: PropTypes.string,
  groupPanelItemTemplate: PropTypes.func,
};

GroupingPanel.defaultProps = {
  allowSorting: false,
  groupByColumnText: undefined,
  dragColumnHeaderText: undefined,
  groupingUnavailableText: undefined,
  groupPanelItemTemplate: undefined,
};
