import React from 'react';
import PropTypes from 'prop-types';
import { GroupingPanel as GroupingPanelBase } from '@devexpress/dx-react-grid';
import { GroupPanel } from '../templates/group-panel';
import { GroupPanelItem } from '../templates/group-panel-item';

const defaultMessages = {
  groupByColumn: '',
};

export class GroupingPanel extends React.PureComponent {
  render() {
    const { messages, ...restProps } = this.props;
    return (
      <GroupingPanelBase
        groupPanelComponent={GroupPanel}
        groupPanelItemComponent={GroupPanelItem}
        messages={{ ...defaultMessages, ...messages }}
        {...restProps}
      />
    );
  }
}

GroupingPanel.propTypes = {
  allowSorting: PropTypes.bool,
  messages: PropTypes.shape({
    groupByColumn: PropTypes.string,
  }),
};

GroupingPanel.defaultProps = {
  allowSorting: false,
  messages: {},
};
