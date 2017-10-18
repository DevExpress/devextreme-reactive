import React from 'react';
import PropTypes from 'prop-types';

import {
  Template, TemplatePlaceholder, PluginContainer,
  TemplateConnector, TemplateRenderer,
} from '@devexpress/dx-react-core';
import { groupingPanelItems } from '@devexpress/dx-grid-core';

const getGroupPanelTemplateArgs = (
  { allowDragging, allowSorting, allowUngroupingByClick },
  { columns, draftGrouping, sorting },
  {
    groupByColumn, setColumnSorting, draftGroupingChange, cancelGroupingChange,
  },
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
});

export class GroupingPanel extends React.PureComponent {
  render() {
    const {
      groupPanelTemplate,
      allowSorting,
      allowDragging,
      allowUngroupingByClick,
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
                    { allowDragging, allowSorting, allowUngroupingByClick },
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
};

GroupingPanel.defaultProps = {
  allowSorting: false,
  allowDragging: false,
  allowUngroupingByClick: false,
};
