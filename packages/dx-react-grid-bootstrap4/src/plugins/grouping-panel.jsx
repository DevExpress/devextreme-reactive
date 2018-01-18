import React from 'react';
import PropTypes from 'prop-types';
import { GroupingPanel as GroupingPanelBase, GroupPanelLayout } from '@devexpress/dx-react-grid';
import { GroupPanelContainer } from '../templates/group-panel-container';
import { GroupPanelItem } from '../templates/group-panel-item';
import { GroupPanelEmptyMessage } from '../templates/group-panel-empty-message';

const defaultMessages = {
  groupByColumn: 'Drag a column header here to group by that column',
};

export class GroupingPanel extends React.PureComponent {
  render() {
    const { messages, ...restProps } = this.props;

    return (
      <GroupingPanelBase
        layoutComponent={GroupPanelLayout}
        containerComponent={GroupPanelContainer}
        itemComponent={GroupPanelItem}
        emptyMessageComponent={GroupPanelEmptyMessage}
        messages={{ ...defaultMessages, ...messages }}
        {...restProps}
      />
    );
  }
}

GroupingPanel.Container = GroupPanelContainer;
GroupingPanel.Item = GroupPanelItem;
GroupingPanel.EmptyMessage = GroupPanelEmptyMessage;

GroupingPanel.propTypes = {
  showSortingControls: PropTypes.bool,
  messages: PropTypes.shape({
    groupByColumn: PropTypes.string,
  }),
};

GroupingPanel.defaultProps = {
  showSortingControls: false,
  messages: {},
};
