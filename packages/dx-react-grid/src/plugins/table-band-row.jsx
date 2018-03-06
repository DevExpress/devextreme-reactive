import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Getter, Template, Plugin, TemplateConnector } from '@devexpress/dx-react-core';
import {
  getColumnSortingDirection,
  tableRowsWithBands,
  isBandedTableCell,
  isBandedTableRow,
  TABLE_DATA_TYPE,
} from '@devexpress/dx-grid-core';

const tableHeaderRowsComputed = ({ tableHeaderRows, bandColumns }) =>
  tableRowsWithBands(tableHeaderRows, bandColumns);

export class TableBandRow extends React.PureComponent {
  render() {
    const {
      showSortingControls,
      showGroupingControls,
      cellComponent: HeaderCell,
      rowComponent: HeaderRow,
    } = this.props;

    return (
      <Plugin
        name="TableBandRow"
        dependencies={[
          { name: 'Table' },
          { name: 'SortingState', optional: !showSortingControls },
          { name: 'GroupingState', optional: !showGroupingControls },
          { name: 'DragDropProvider', optional: true },
          { name: 'TableColumnResizing', optional: true },
        ]}
      >
        <Getter name="tableHeaderRows" computed={tableHeaderRowsComputed} />

        <Template
          name="tableCell"
          predicate={({ tableRow, tableColumn }) => {
            const result = isBandedTableCell(tableRow, tableColumn);
            return result;
          }
          }
        >
          {params => (
            <TemplateConnector>
              {({
                sorting,
                isColumnSortingEnabled,
                isColumnGroupingEnabled,
                tableColumns,
                draggingEnabled,
                tableColumnResizingEnabled,
              }, {
                changeColumnSorting, changeColumnGrouping,
                changeTableColumnWidth, draftTableColumnWidth, cancelTableColumnWidthDraft,
              }) => {
                const { name: columnName } = params.tableColumn.column;
                const atLeastOneDataColumn = tableColumns
                  .filter(({ type }) => type === TABLE_DATA_TYPE).length > 1;
                const sortingEnabled = isColumnSortingEnabled && isColumnSortingEnabled(columnName);
                const groupingEnabled = isColumnGroupingEnabled &&
                  isColumnGroupingEnabled(columnName) &&
                  atLeastOneDataColumn;

                return (
                  <HeaderCell
                    {...params}

                    colSpan={params.tableColumn.column.colSpan}
                    rowSpan={params.tableColumn.column.rowSpan}

                    column={params.tableColumn.column}
                    sortingEnabled={sortingEnabled}
                    groupingEnabled={groupingEnabled}
                    showSortingControls={showSortingControls}
                    showGroupingControls={showGroupingControls}
                    draggingEnabled={draggingEnabled && atLeastOneDataColumn}
                    resizingEnabled={tableColumnResizingEnabled}
                    sortingDirection={showSortingControls
                      ? getColumnSortingDirection(sorting, columnName) : undefined}
                    onSort={({ direction, keepOther }) =>
                      changeColumnSorting({ columnName, direction, keepOther })}
                    onGroup={() => changeColumnGrouping({ columnName })}
                    onWidthChange={({ shift }) => changeTableColumnWidth({ columnName, shift })}
                    onWidthDraft={({ shift }) => draftTableColumnWidth({ columnName, shift })}
                    onWidthDraftCancel={() => cancelTableColumnWidthDraft()}
                  />
                );
              }}
            </TemplateConnector>
          )}
        </Template>
        <Template
          name="tableRow"
          predicate={({ tableRow }) => {
            return isBandedTableRow(tableRow);
          }}
        >
          {params => <HeaderRow {...params} />}
        </Template>
      </Plugin>
    );
  }
}

TableBandRow.propTypes = {
  showSortingControls: PropTypes.bool,
  showGroupingControls: PropTypes.bool,
  cellComponent: PropTypes.func.isRequired,
  rowComponent: PropTypes.func.isRequired,
};

TableBandRow.defaultProps = {
  showSortingControls: false,
  showGroupingControls: false,
};
