import React from 'react';
import PropTypes from 'prop-types';

import { combineTemplates } from '@devexpress/dx-react-core';
import { GroupingPanel as GroupingPanelBase } from '@devexpress/dx-react-grid';

import { GroupPanel } from '../templates/group-panel';
import { GroupPanelItem } from '../templates/group-panel-item';

const defaultCellTemplate = props => <GroupPanelItem {...props} />;

const defaultMessages = {
  groupByColumn: '',
};

export class GroupingPanel extends React.PureComponent {
  render() {
    const { groupPanelItemTemplate, messages, ...restProps } = this.props;
    return (
      <GroupingPanelBase
        groupPanelTemplate={
          props => (
            <GroupPanel
              groupPanelItemTemplate={combineTemplates(
                groupPanelItemTemplate,
                defaultCellTemplate,
              )}
              {...props}
            />
          )
        }
        messages={{ ...defaultMessages, ...messages }}
        {...restProps}
      />
    );
  }
}

GroupingPanel.propTypes = {
  allowSorting: PropTypes.bool,
  groupPanelItemTemplate: PropTypes.func,
  messages: PropTypes.shape({
    groupByColumn: PropTypes.string,
  }),
};

GroupingPanel.defaultProps = {
  allowSorting: false,
  groupPanelItemTemplate: undefined,
  messages: {},
};
