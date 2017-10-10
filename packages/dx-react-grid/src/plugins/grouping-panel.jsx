import React from 'react';
import PropTypes from 'prop-types';

import {
  Template, TemplatePlaceholder, PluginContainer,
  TemplateConnector, TemplateRenderer,
} from '@devexpress/dx-react-core';
import { groupingPanelItems } from '@devexpress/dx-grid-core';

const getMessageFn = messages => name => messages[name];

const getGroupPanelTemplateArgs = (
  { allowDragging, allowSorting, allowUngroupingByClick, messages },
  { columns, draftGrouping, sorting },
  { groupByColumn, setColumnSorting, draftGroupingChange, cancelGroupingChange },
) => ({
  allowSorting,
  allowDragging,
  allowUngroupingByClick,
  groupingPanelItems: groupingPanelItems(columns, draftGrouping),
  sorting,
  groupByColumn,
  changeSortingDirection: ({ columnName, keepOther, cancel }) =>
    setColumnSorting({
      columnName,
      keepOther,
      cancel,
      scope: draftGrouping.map(columnGrouping => columnGrouping.columnName),
    }),
  draftGroupingChange: groupingChange => draftGroupingChange(groupingChange),
  cancelGroupingChange: () => cancelGroupingChange(),
  getMessage: getMessageFn(messages),
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

    return (
      <PluginContainer
        pluginName="GroupingPanel"
        dependencies={[
          { pluginName: 'GroupingState' },
          { pluginName: 'SortingState', optional: !allowSorting },
        ]}
      >
        <Template name="header">
          <div>
            <TemplateConnector>
              {(getters, actions) => (
                <TemplateRenderer
                  template={groupPanelTemplate}
                  params={getGroupPanelTemplateArgs(
                    { allowDragging, allowSorting, allowUngroupingByClick, messages },
                    getters,
                    actions,
                  )}
                />
              )}
            </TemplateConnector>
            <TemplatePlaceholder />
          </div>
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
  messages: PropTypes.shape({
    groupByColumn: PropTypes.string,
  }),
};

GroupingPanel.defaultProps = {
  allowSorting: false,
  allowDragging: false,
  allowUngroupingByClick: false,
  messages: {},
};
