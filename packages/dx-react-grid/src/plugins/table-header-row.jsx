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
  isHeadingTableRow,
  TABLE_DATA_TYPE,
} from '@devexpress/dx-grid-core';

const getHeaderTableCellTemplateArgs = (
  {
    allowSorting, allowDragging, allowGroupingByClick, allowResizing, ...params
  },
  {
    tableColumns, sorting, columns, grouping,
  },
  {
    setColumnSorting, groupByColumn, changeTableColumnWidths, changeDraftTableColumnWidths,
  },
) => {
  const { column } = params.tableColumn;
  const groupingSupported = grouping !== undefined &&
      grouping.length < columns.length - 1;

  const result = {
    ...params,
    allowSorting: allowSorting && sorting !== undefined,
    allowGroupingByClick: allowGroupingByClick && groupingSupported,
    allowDragging: allowDragging && (!grouping || groupingSupported),
    allowResizing,
    column: params.tableColumn.column,
    changeSortingDirection: ({ keepOther, cancel }) => {
      const scope = grouping
        ? tableColumns
          .filter(tableColumn => tableColumn.type === TABLE_DATA_TYPE)
          .filter(tableColumn => grouping
            .find(group => group.columnName !== tableColumn.column.name))
          .map(tableColumn => tableColumn.column.name)
        : null;
      setColumnSorting({
        columnName: column.name, keepOther, cancel, scope,
      });
    },
    groupByColumn: () =>
      groupByColumn({ columnName: column.name }),
    changeColumnWidth: ({ shift }) =>
      changeTableColumnWidths({ shifts: { [column.name]: shift } }),
    changeDraftColumnWidth: ({ shift }) =>
      changeDraftTableColumnWidths({ shifts: { [column.name]: shift } }),
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
    const {
      allowSorting,
      allowGroupingByClick,
      allowDragging,
      allowResizing,
      headerCellTemplate,
      headerRowTemplate,
    } = this.props;

    return (
      <PluginContainer
        pluginName="TableHeaderRow"
        dependencies={[
          { pluginName: 'TableView' },
          { pluginName: 'SortingState', optional: !allowSorting },
          { pluginName: 'GroupingState', optional: !allowGroupingByClick },
          { pluginName: 'DragDropContext', optional: !allowDragging },
          { pluginName: 'TableColumnResizing', optional: !allowResizing },
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
                    {
                      allowDragging, allowGroupingByClick, allowSorting, allowResizing, ...params,
                    },
                    getters,
                    actions,
                  )}
                />
              )}
            </TemplateConnector>
          )}
        </Template>
        <Template
          name="tableViewRow"
          predicate={({ tableRow }) => isHeadingTableRow(tableRow)}
        >
          {params => (
            <TemplateRenderer
              template={headerRowTemplate}
              params={params}
            />
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
  allowResizing: PropTypes.bool,
  headerCellTemplate: PropTypes.func.isRequired,
  headerRowTemplate: PropTypes.func.isRequired,
};

TableHeaderRow.defaultProps = {
  allowSorting: false,
  allowGroupingByClick: false,
  allowDragging: false,
  allowResizing: false,
};
