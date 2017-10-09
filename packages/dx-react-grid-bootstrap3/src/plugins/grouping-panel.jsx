import React from 'react';
import PropTypes from 'prop-types';

import { combineTemplates } from '@devexpress/dx-react-core';
import { GroupingPanel as GroupingPanelBase } from '@devexpress/dx-react-grid';

import { GroupPanel } from '../templates/group-panel';
import { GroupPanelItem } from '../templates/group-panel-item';

const defaultCellTemplate = props => <GroupPanelItem {...props} />;

export class GroupingPanel extends React.PureComponent {
  render() {
    const { messages, groupPanelItemTemplate, ...restProps } = this.props;

    return (
      <GroupingPanelBase
        groupPanelTemplate={
          props => (
            <GroupPanel
              groupByColumnText={messages.groupByColumnText}
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
  messages: PropTypes.shape({
    groupByColumnText: PropTypes.string,
  }),
  groupPanelItemTemplate: PropTypes.func,
};

GroupingPanel.defaultProps = {
  allowSorting: false,
  messages: {},
  groupPanelItemTemplate: undefined,
};
