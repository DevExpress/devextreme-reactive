import * as React from 'react';
import {
  Getter, Template, Plugin, TemplateConnector, TemplatePlaceholder, Getters,
} from '@devexpress/dx-react-core';
import { getMessagesFormatter } from '@devexpress/dx-core';
import {
  getColumnSortingDirection,
  tableRowsWithHeading,
  isHeadingTableCell,
  isHeadingTableRow,
  TABLE_DATA_TYPE,
  TABLE_HEADING_TYPE,
} from '@devexpress/dx-grid-core';
import { TableHeaderRowProps, TableCellProps, TableRowProps } from '../types';

// const tableHeaderRowsComputed = (
//   { tableHeaderRows }: Getters,
// ) => tableRowsWithHeading(tableHeaderRows);
const tableHeaderRowsComputed = ({ tableHeaderRows }: Getters) => {
  // console.log('computed')
  const res = tableRowsWithHeading(tableHeaderRows || []);
  // console.log('header rows comp', res);
  return res;
};

class TableHeaderRowBase extends React.PureComponent<TableHeaderRowProps> {
  static ROW_TYPE = TABLE_HEADING_TYPE;
  static defaultProps = {
    showSortingControls: false,
    showGroupingControls: false,
    messages: {},
  };
  static components = {
    cellComponent: 'Cell',
    rowComponent: 'Row',
    contentComponent: 'Content',
    sortLabelComponent: 'SortLabel',
    titleComponent: 'Title',
    groupButtonComponent: 'GroupButton',
  };


  render() {
    const {
      showSortingControls,
      showGroupingControls,
      cellComponent: HeaderCell,
      rowComponent: HeaderRow,
      contentComponent: Content,
      sortLabelComponent: SortLabel,
      groupButtonComponent: GroupButton,
      titleComponent: Title,
      messages,
    } = this.props;
    const getMessage = getMessagesFormatter(messages);

    return (
      <Plugin
        name="TableHeaderRow"
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
          predicate={({ tableRow, tableColumn }: any) => isHeadingTableCell(tableRow, tableColumn)}
        >
          {(params: TableCellProps) => (
            <TemplateConnector>
              {({
                sorting, tableColumns, draggingEnabled, tableColumnResizingEnabled,
                isColumnSortingEnabled, isColumnGroupingEnabled,
              }, {
                changeColumnSorting, changeColumnGrouping,
                changeTableColumnWidth, draftTableColumnWidth, cancelTableColumnWidthDraft,
              }) => {
                const { name: columnName, title: columnTitle } = params.tableColumn.column!;
                const atLeastOneDataColumn = tableColumns
                  .filter(({ type }) => type === TABLE_DATA_TYPE).length > 1;
                const sortingEnabled = isColumnSortingEnabled
                  && isColumnSortingEnabled(columnName);
                const groupingEnabled = isColumnGroupingEnabled
                  && isColumnGroupingEnabled(columnName)
                  && atLeastOneDataColumn;

                return (
                  <HeaderCell
                    {...params}
                    column={params.tableColumn.column!}
                    draggingEnabled={draggingEnabled && atLeastOneDataColumn}
                    resizingEnabled={tableColumnResizingEnabled}
                    onWidthChange={({ shift }) => changeTableColumnWidth({ columnName, shift })}
                    onWidthDraft={({ shift }) => draftTableColumnWidth({ columnName, shift })}
                    onWidthDraftCancel={() => cancelTableColumnWidthDraft()}
                    // @deprecated
                    sortingEnabled={sortingEnabled}
                    // @deprecated
                    groupingEnabled={groupingEnabled}
                    // @deprecated
                    showSortingControls={showSortingControls!}
                    // @deprecated
                    showGroupingControls={showGroupingControls!}
                    // @deprecated
                    sortingDirection={showSortingControls && sorting !== undefined
                      ? getColumnSortingDirection(sorting, columnName)! : undefined}
                    // @deprecated
                    onSort={
                      ({ direction, keepOther }) => changeColumnSorting({
                        columnName, direction, keepOther,
                      })}
                    // @deprecated
                    onGroup={() => changeColumnGrouping({ columnName })}
                    // @deprecated
                    before={(
                      <TemplatePlaceholder
                        name="tableHeaderCellBefore"
                        params={{
                          column: params.tableColumn.column,
                        }}
                      />
                    )}
                  >
                    <TemplatePlaceholder
                      name="tableHeaderCellBefore"
                      params={{
                        column: params.tableColumn.column,
                      }}
                    />
                    <Content
                      column={params.tableColumn.column!}
                      align={params.tableColumn.align!}
                    >
                      {showSortingControls ? (
                        <SortLabel
                          column={params.tableColumn.column!}
                          align={params.tableColumn.align!}
                          direction={getColumnSortingDirection(sorting, columnName) || null}
                          disabled={!sortingEnabled}
                          onSort={({ direction, keepOther }) => {
                            changeColumnSorting({ columnName, direction, keepOther });
                          }}
                          getMessage={getMessage}
                        >
                          <Title>
                            {columnTitle || columnName}
                          </Title>
                        </SortLabel>
                      ) : (
                        <Title>
                          {columnTitle || columnName}
                        </Title>
                      )}
                    </Content>
                    {showGroupingControls ? (
                      <GroupButton
                        disabled={!groupingEnabled}
                        onGroup={() => changeColumnGrouping({ columnName })}
                      />
                    ) : null}
                  </HeaderCell>
                );
              }}
            </TemplateConnector>
          )}
        </Template>
        <Template
          name="tableRow"
          predicate={({ tableRow }: any) => !!isHeadingTableRow(tableRow)}
        >
          {(params: TableRowProps) => <HeaderRow {...params} />}
        </Template>
      </Plugin>
    );
  }
}

TableHeaderRowBase.components = {
  cellComponent: 'Cell',
  rowComponent: 'Row',
  contentComponent: 'Content',
  sortLabelComponent: 'SortLabel',
  titleComponent: 'Title',
  groupButtonComponent: 'GroupButton',
};

/***
 * A plugin that renders the table's header row. The Column's `title` field specifies the
 * column's title in the header row.The plugin also allows you to manage a column's sorting
 * and grouping state and initiate column dragging.
 * */
export const TableHeaderRow: React.ComponentType<TableHeaderRowProps> & {
  /** The header row type's identifier. */
  ROW_TYPE: symbol;
} = TableHeaderRowBase;
