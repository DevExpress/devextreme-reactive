import React from 'react';
import PropTypes from 'prop-types';

import {
  Template, TemplatePlaceholder, PluginContainer,
  TemplateConnector, TemplateRenderer,
} from '@devexpress/dx-react-core';
import { groupingPanelItems } from '@devexpress/dx-grid-core';

const getGroupPanelTemplateArgs = ({
  getters: { columns, draftGrouping, sorting },
  actions: { groupByColumn, setColumnSorting, draftGroupingChange, cancelGroupingChange },
  scope: { allowDragging, allowSorting, allowUngroupingByClick },
}) => ({
  allowSorting,
  allowDragging,
  allowUngroupingByClick,
  groupingPanelItems: groupingPanelItems(columns, draftGrouping),
  sorting,
  groupByColumn,
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
                  params={getGroupPanelTemplateArgs({
                    getters,
                    actions,
                    scope: { allowDragging, allowSorting, allowUngroupingByClick },
                  })}
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
