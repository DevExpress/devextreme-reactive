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
  getMessagesFormatter,
} from '@devexpress/dx-grid-core';

const getHeaderTableCellTemplateArgs = (
  {
    allowSorting, allowDragging, allowGroupingByClick, allowResizing, getMessage, ...params
  },
  { sorting, columns, grouping },
  {
    setColumnSorting, groupByColumn, changeTableColumnWidths, changeDraftTableColumnWidths,
  },
) => {
  const { column } = params.tableColumn;
  const groupingSupported = grouping !== undefined &&
      grouping.length < columns.length - 1;

  const result = {
    ...params,
    getMessage,
    allowSorting: allowSorting && sorting !== undefined,
    allowGroupingByClick: allowGroupingByClick && groupingSupported,
    allowDragging: allowDragging && (!grouping || groupingSupported),
    allowResizing,
    column: params.tableColumn.column,
    changeSortingDirection: ({ keepOther, cancel }) =>
      setColumnSorting({ columnName: column.name, keepOther, cancel }),
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
      messages,
    } = this.props;
    const getMessage = getMessagesFormatter(messages);

    return (
      <PluginContainer
        pluginName="TableHeaderRow"
        dependencies={[
          { pluginName: 'Table' },
          { pluginName: 'SortingState', optional: !allowSorting },
          { pluginName: 'GroupingState', optional: !allowGroupingByClick },
          { pluginName: 'DragDropContext', optional: !allowDragging },
          { pluginName: 'TableColumnResizing', optional: !allowResizing },
        ]}
      >
        <Getter name="tableHeaderRows" computed={tableHeaderRowsComputed} />

        <Template
          name="tableCell"
          predicate={({ tableRow, tableColumn }) => isHeadingTableCell(tableRow, tableColumn)}
        >
          {params => (
            <TemplateConnector>
              {(getters, actions) => (
                <TemplateRenderer
                  template={headerCellTemplate}
                  params={getHeaderTableCellTemplateArgs(
                    {
                      allowDragging,
                      allowGroupingByClick,
                      allowSorting,
                      allowResizing,
                      getMessage,
                      ...params,
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
          name="tableRow"
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
  messages: PropTypes.object,
};

TableHeaderRow.defaultProps = {
  allowSorting: false,
  allowGroupingByClick: false,
  allowDragging: false,
  allowResizing: false,
  messages: null,
};
