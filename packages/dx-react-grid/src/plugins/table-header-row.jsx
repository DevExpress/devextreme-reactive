import React from 'react';
import PropTypes from 'prop-types';
import {
  Getter, Template, PluginContainer, TemplateConnector,
} from '@devexpress/dx-react-core';
import {
  getColumnSortingDirection,
  tableRowsWithHeading,
  isHeadingTableCell,
  isHeadingTableRow,
  getMessagesFormatter,
} from '@devexpress/dx-grid-core';
import { TableHeaderCellLayout } from '../components/table-header-cell-layout';

const tableHeaderRowsComputed = ({ tableHeaderRows }) => tableRowsWithHeading(tableHeaderRows);

export class TableHeaderRow extends React.PureComponent {
  render() {
    const {
      allowSorting,
      showGroupingControls,
      allowDragging,
      allowResizing,
      cellComponent: Cell,
      rowComponent: HeaderRow,
      messages,
    } = this.props;
    const getMessage = getMessagesFormatter(messages);

    const getCellComponent = ({ groupingSupported, allowCellDragging, ...restParams }) =>
      ({ draft }) => (
        <TemplateConnector>
          {({
            sorting,
          }, {
            setColumnSorting, groupByColumn,
            changeTableColumnWidths, changeDraftTableColumnWidths,
          }) => {
            const { tableColumn: { column } } = restParams;
            const { name: columnName } = column;

            return (
              <Cell
                {...restParams}
                column={column}
                draft={draft}
                getMessage={getMessage}
                allowSorting={allowSorting && sorting !== undefined}
                showGroupingControls={showGroupingControls && groupingSupported}
                allowDragging={allowCellDragging}
                allowResizing={allowResizing}
                sortingDirection={allowSorting && sorting !== undefined
                  ? getColumnSortingDirection(sorting, columnName) : undefined}
                onSort={({ keepOther, cancel }) =>
                  setColumnSorting({ columnName, keepOther, cancel })}
                onGroup={() =>
                  groupByColumn({ columnName })}
                onWidthChange={({ shift }) =>
                  changeTableColumnWidths({ shifts: { [columnName]: shift } })}
                onDraftWidthChange={({ shift }) =>
                  changeDraftTableColumnWidths({ shifts: { [columnName]: shift } })}
              />
            );
          }}
        </TemplateConnector>
      );

    return (
      <PluginContainer
        pluginName="TableHeaderRow"
        dependencies={[
          { pluginName: 'Table' },
          { pluginName: 'SortingState', optional: !allowSorting },
          { pluginName: 'GroupingState', optional: !showGroupingControls },
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
              {({ grouping, columns }) => {
                const { tableColumn: { column, draft } } = params;
                const groupingSupported = grouping !== undefined &&
                  grouping.length < columns.length - 1;
                const allowCellDragging = allowDragging && (!grouping || groupingSupported);

                const CellComponent = getCellComponent({
                  ...params,
                  groupingSupported,
                  allowCellDragging,
                });

                return (
                  <TableHeaderCellLayout
                    column={column}
                    allowDragging={allowCellDragging}
                    draft={draft}
                    cellComponent={CellComponent}
                  />
                );
              }}
            </TemplateConnector>
          )}
        </Template>
        <Template
          name="tableRow"
          predicate={({ tableRow }) => isHeadingTableRow(tableRow)}
        >
          {params => <HeaderRow {...params} />}
        </Template>
      </PluginContainer>
    );
  }
}

TableHeaderRow.propTypes = {
  allowSorting: PropTypes.bool,
  showGroupingControls: PropTypes.bool,
  allowDragging: PropTypes.bool,
  allowResizing: PropTypes.bool,
  cellComponent: PropTypes.func.isRequired,
  rowComponent: PropTypes.func.isRequired,
  messages: PropTypes.object,
};

TableHeaderRow.defaultProps = {
  allowSorting: false,
  showGroupingControls: false,
  allowDragging: false,
  allowResizing: false,
  messages: null,
};
