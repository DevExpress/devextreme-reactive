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

const tableHeaderRowsComputed = ({ tableHeaderRows }) => tableRowsWithHeading(tableHeaderRows);

export class TableHeaderRow extends React.PureComponent {
  render() {
    const {
      allowSorting,
      allowGroupingByClick,
      allowDragging,
      allowResizing,
      cellComponent,
      rowComponent: HeaderRow,
      cellLayoutComponent: CellLayout,
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
              {({
                sorting, grouping, columns,
              }, {
                setColumnSorting, groupByColumn,
                changeTableColumnWidths, changeDraftTableColumnWidths,
              }) => {
                const { tableColumn: { column, draft } } = params;
                const { name: columnName } = column;
                const groupingSupported = grouping !== undefined &&
                  grouping.length < columns.length - 1;

                return (
                  <CellLayout
                    {...params}
                    column={column}
                    draft={draft}
                    getMessage={getMessage}
                    cellComponent={cellComponent}
                    allowSorting={allowSorting && sorting !== undefined}
                    allowGroupingByClick={allowGroupingByClick && groupingSupported}
                    allowDragging={allowDragging && (!grouping || groupingSupported)}
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
  allowGroupingByClick: PropTypes.bool,
  allowDragging: PropTypes.bool,
  allowResizing: PropTypes.bool,
  cellComponent: PropTypes.func.isRequired,
  rowComponent: PropTypes.func.isRequired,
  cellLayoutComponent: PropTypes.func.isRequired,
  messages: PropTypes.object,
};

TableHeaderRow.defaultProps = {
  allowSorting: false,
  allowGroupingByClick: false,
  allowDragging: false,
  allowResizing: false,
  messages: null,
};
