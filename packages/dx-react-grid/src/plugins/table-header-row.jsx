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
  TABLE_DATA_TYPE,
} from '@devexpress/dx-grid-core';

const tableHeaderRowsComputed = ({ tableHeaderRows }) => tableRowsWithHeading(tableHeaderRows);

export class TableHeaderRow extends React.PureComponent {
  render() {
    const {
      showSortingControls,
      showGroupingControls,
      cellComponent: HeaderCell,
      rowComponent: HeaderRow,
      messages,
    } = this.props;
    const getMessage = getMessagesFormatter(messages);

    return (
      <PluginContainer
        pluginName="TableHeaderRow"
        dependencies={[
          { pluginName: 'Table' },
          { pluginName: 'SortingState', optional: !showSortingControls },
          { pluginName: 'GroupingState', optional: !showGroupingControls },
          { pluginName: 'DragDropProvider', optional: true },
          { pluginName: 'TableColumnResizing', optional: true },
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
                sorting, tableColumns, allowDragging, allowTableColumnResizing,
              }, {
                setColumnSorting, groupByColumn,
                changeTableColumnWidths, changeDraftTableColumnWidths,
              }) => {
                const { name: columnName } = params.tableColumn.column;
                const atLeastOneDataColumn = tableColumns
                  .filter(({ type }) => type === TABLE_DATA_TYPE).length > 1;

                return (
                  <HeaderCell
                    {...params}
                    column={params.tableColumn.column}
                    getMessage={getMessage}
                    showSortingControls={showSortingControls && sorting !== undefined}
                    showGroupingControls={showGroupingControls && atLeastOneDataColumn}
                    allowDragging={allowDragging && atLeastOneDataColumn}
                    allowResizing={allowTableColumnResizing}
                    sortingDirection={showSortingControls && sorting !== undefined
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
  showSortingControls: PropTypes.bool,
  showGroupingControls: PropTypes.bool,
  cellComponent: PropTypes.func.isRequired,
  rowComponent: PropTypes.func.isRequired,
  messages: PropTypes.object,
};

TableHeaderRow.defaultProps = {
  showSortingControls: false,
  showGroupingControls: false,
  messages: null,
};
