import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Template, PluginContainer } from '@devexpress/dx-react-core';
import {
  getColumnSortingDirection,
  tableRowsWithHeading,
  isHeadingTableCell,
} from '@devexpress/dx-grid-core';

const tableHeaderRowsComputed = ({ tableHeaderRows }) => tableRowsWithHeading(tableHeaderRows);

export class TableHeaderRow extends React.PureComponent {
  render() {
    const {
      allowSorting,
      allowGroupingByClick,
      allowDragging,
      allowResizing,
      headerCellTemplate,
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
          connectGetters={(getter, { tableColumn: { column } }) => {
            const sorting = getter('sorting');
            const columns = getter('columns');
            const grouping = getter('grouping');

            const groupingSupported = grouping !== undefined &&
                grouping.length < columns.length - 1;

            const result = {
              sortingSupported: sorting !== undefined,
              groupingSupported,
              draggingSupported: !grouping || groupingSupported,
            };

            if (result.sortingSupported) {
              result.sortingDirection = getColumnSortingDirection(sorting, column.name);
            }

            if (result.draggingSupported) {
              result.dragPayload = [{ type: 'column', columnName: column.name }];
            }

            return result;
          }}
          connectActions={(action, { tableColumn: { column } }) => ({
            changeSortingDirection: ({ keepOther, cancel }) => action('setColumnSorting')({ columnName: column.name, keepOther, cancel }),
            groupByColumn: () => action('groupByColumn')({ columnName: column.name }),
            changeColumnWidth: ({ shift }) => action('changeTableColumnWidths')({ shifts: { [column.name]: shift } }),
            changeDraftColumnWidth: ({ shift }) => action('changeDraftTableColumnWidths')({ shifts: { [column.name]: shift } }),
          })}
        >
          {({
            sortingSupported,
            groupingSupported,
            draggingSupported,
            ...restParams
          }) => headerCellTemplate({
            ...restParams,
            allowSorting: allowSorting && sortingSupported,
            allowGroupingByClick: allowGroupingByClick && groupingSupported,
            allowDragging: allowDragging && draggingSupported,
            allowResizing,
            column: restParams.tableColumn.column,
          })}
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
};

TableHeaderRow.defaultProps = {
  allowSorting: false,
  allowGroupingByClick: false,
  allowDragging: false,
  allowResizing: false,
};
