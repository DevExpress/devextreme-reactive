import React from 'react';
import PropTypes from 'prop-types';

import {
  Template, TemplatePlaceholder, PluginContainer,
  TemplateConnector, TemplateRenderer,
} from '@devexpress/dx-react-core';
import { groupingPanelItems, getMessagesFormatter } from '@devexpress/dx-grid-core';

const getGroupPanelTemplateArgs = (
  {
    allowDragging, allowSorting, allowUngroupingByClick, getMessage,
  },
  { columns, draftGrouping, sorting },
  {
    groupByColumn, setColumnSorting, draftGroupingChange, cancelGroupingChange,
  },
) => ({
  allowSorting,
  allowDragging,
  allowUngroupingByClick,
  sorting,
  groupByColumn,
  getMessage,
  groupingPanelItems: groupingPanelItems(columns, draftGrouping),
  changeSortingDirection: ({ columnName, keepOther, cancel }) =>
    setColumnSorting({ columnName, keepOther, cancel }),
  draftGroupingChange: groupingChange => draftGroupingChange(groupingChange),
  cancelGroupingChange: () => cancelGroupingChange(),
});

export class GroupingPanel extends React.PureComponent {
  render() {
    const {
      groupPanelTemplate,
      allowSorting,
      allowDragging,
      allowUngroupingByClick,
      messages,
    } = this.props;

    const getMessage = getMessagesFormatter(messages);

    return (
      <PluginContainer
        pluginName="GroupingPanel"
        dependencies={[
          { pluginName: 'GroupingState' },
          { pluginName: 'SortingState', optional: !allowSorting },
        ]}
      >
        <Template name="header">
          <TemplateConnector>
            {(getters, actions) => (
              <TemplateRenderer
                template={groupPanelTemplate}
                params={getGroupPanelTemplateArgs(
                  {
                    allowDragging, allowSorting, allowUngroupingByClick, getMessage,
                  },
                  getters,
                  actions,
                )}
              />
            )}
          </TemplateConnector>
          <TemplatePlaceholder />
        </Template>
      </PluginContainer>
    );
  }
}

GroupingPanel.propTypes = {
  allowSorting: PropTypes.bool,
  allowDragging: PropTypes.bool,
  allowUngroupingByClick: PropTypes.bool,
  groupPanelTemplate: PropTypes.func.isRequired,
  messages: PropTypes.object,
};

GroupingPanel.defaultProps = {
  allowSorting: false,
  allowDragging: false,
  allowUngroupingByClick: false,
  messages: {},
};
