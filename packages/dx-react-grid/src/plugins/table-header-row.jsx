import React from 'react';
import PropTypes from 'prop-types';
import {
  Getter, Template, PluginContainer,
  TemplateConnector, TemplateRenderer,
} from '@devexpress/dx-react-core';
import {
  getColumnSortingDirection,
  tableRowsWithHeading,
  isHeadingTableCell,
} from '@devexpress/dx-grid-core';

const getHeaderTableCellTemplateArgs = (
  { allowSorting, allowDragging, allowGroupingByClick, ...params },
  { sorting, columns, grouping },
  { setColumnSorting, groupByColumn },
) => {
  const { column } = params.tableColumn;
  const groupingSupported = grouping !== undefined &&
      grouping.length < columns.length - 1;

  const result = {
    ...params,
    allowSorting: allowSorting && sorting !== undefined,
    allowGroupingByClick: allowGroupingByClick && groupingSupported,
    allowDragging: allowDragging && (!grouping || groupingSupported),
    column: params.tableColumn.column,
    changeSortingDirection: ({ keepOther, cancel }) =>
      setColumnSorting({ columnName: column.name, keepOther, cancel }),
    groupByColumn: () => groupByColumn({ columnName: column.name }),
  };

  if (result.allowSorting) {
    result.sortingDirection = getColumnSortingDirection(sorting, column.name);
  }

  if (result.allowDragging) {
    result.dragPayload = [{ type: 'column', columnName: column.name }];
  }

  return result;
};

const tableHeaderRowsComputed = ({ tableHeaderRows }) => tableRowsWithHeading(tableHeaderRows);

export class TableHeaderRow extends React.PureComponent {
  render() {
    const { allowSorting, allowGroupingByClick, allowDragging, headerCellTemplate } = this.props;

    return (
      <PluginContainer
        pluginName="TableHeaderRow"
        dependencies={[
          { pluginName: 'TableView' },
          { pluginName: 'SortingState', optional: !allowSorting },
          { pluginName: 'GroupingState', optional: !allowGroupingByClick },
          { pluginName: 'DragDropContext', optional: !allowDragging },
        ]}
      >
        <Getter name="tableHeaderRows" computed={tableHeaderRowsComputed} />

        <Template
          name="tableViewCell"
          predicate={({ tableRow, tableColumn }) => isHeadingTableCell(tableRow, tableColumn)}
        >
          {params => (
            <TemplateConnector>
              {(getters, actions) => (
                <TemplateRenderer
                  template={headerCellTemplate}
                  params={getHeaderTableCellTemplateArgs(
                    { allowDragging, allowGroupingByClick, allowSorting, ...params },
                    getters,
                    actions,
                  )}
                />
              )}
            </TemplateConnector>
          )}
        </Template>
      </PluginContainer>
    );
  }
}

TableHeaderRow.propTypes = {
  allowSorting: PropTypes.bool,
  allowGroupingByClick: PropTypes.bool,
  allowDragging: PropTypes.bool,
  headerCellTemplate: PropTypes.func.isRequired,
};

TableHeaderRow.defaultProps = {
  allowSorting: false,
  allowGroupingByClick: false,
  allowDragging: false,
};
