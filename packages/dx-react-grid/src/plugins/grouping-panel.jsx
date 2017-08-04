import React from 'react';
import PropTypes from 'prop-types';

import { Template, TemplatePlaceholder, PluginContainer } from '@devexpress/dx-react-core';
import { groupedColumns } from '@devexpress/dx-grid-core';

export class GroupingPanel extends React.PureComponent {
  render() {
    const {
      groupPanelTemplate,
      allowSorting,
      allowDragging,
      allowUngroupingByClick,
    } = this.props;

    return (
      <PluginContainer>
        <Template
          name="header"
          connectGetters={getter => ({
            columns: getter('columns'),
            grouping: getter('draftGrouping'),
            sorting: getter('sorting'),
          })}
          connectActions={action => ({
            groupByColumn: action('groupByColumn'),
            changeSortingDirection: ({ columnName, keepOther, cancel }) =>
              action('setColumnSorting')({ columnName, keepOther, cancel }),
            draftGroupingChange: groupingChange => action('draftGroupingChange')(groupingChange),
            cancelGroupingChange: () => action('cancelGroupingChange')(),
          })}
        >
          {({ columns, grouping, ...restParams }) => (
            <div>
              {groupPanelTemplate({
                allowSorting,
                allowDragging,
                allowUngroupingByClick,
                groupedColumns: groupedColumns(columns, grouping),
                ...restParams,
              })}
              <TemplatePlaceholder />
            </div>
          )}
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
