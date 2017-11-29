import React from 'react';
import PropTypes from 'prop-types';
import { combineTemplates } from '@devexpress/dx-react-core';
import { GroupingPanel as GroupingPanelBase } from '@devexpress/dx-react-grid';
import { GroupPanel } from '../templates/group-panel';
import { GroupPanelItem } from '../templates/group-panel-item';

const defaultGetGroupPanelItemComponent = () => GroupPanelItem;

const defaultMessages = {
  groupByColumn: '',
};

export class GroupingPanel extends React.PureComponent {
  render() {
    const { getGroupPanelItemComponent, messages, ...restProps } = this.props;

    return (
      <GroupingPanelBase
        groupPanelComponent={props => (
          <GroupPanel
            getGroupPanelItemComponent={combineTemplates(
              getGroupPanelItemComponent,
              defaultGetGroupPanelItemComponent,
            )}
            {...props}
          />
        )}
        messages={{ ...defaultMessages, ...messages }}
        {...restProps}
      />
    );
  }
}

GroupingPanel.propTypes = {
  allowSorting: PropTypes.bool,
  getGroupPanelItemComponent: PropTypes.func,
  messages: PropTypes.shape({
    groupByColumn: PropTypes.string,
  }),
};

GroupingPanel.defaultProps = {
  allowSorting: false,
  getGroupPanelItemComponent: undefined,
  messages: {},
};
