import * as React from 'react';
import {
  Getter, Template, Plugin, TemplateConnector, Getters,
} from '@devexpress/dx-react-core';
import {
  tableRowsWithExpandedDetail,
  tableDetailCellColSpanGetter,
  isDetailRowExpanded,
  tableColumnsWithDetail,
  isDetailToggleTableCell,
  isDetailTableRow,
  isDetailTableCell,
  TABLE_DETAIL_TYPE,
} from '@devexpress/dx-grid-core';
import { TableRowDetailProps, TableCellProps, TableRowProps } from '../types';

const getCellColSpanComputed = (
  { getTableCellColSpan }: Getters,
) => tableDetailCellColSpanGetter(getTableCellColSpan);

const pluginDependencies = [
  { name: 'RowDetailState' },
  { name: 'Table' },
];

class TableRowDetailBase extends React.PureComponent<TableRowDetailProps> {
  static ROW_TYPE = TABLE_DETAIL_TYPE;
  static COLUMN_TYPE = TABLE_DETAIL_TYPE;
  static defaultProps = {
    contentComponent: () => null,
  };
  static components = {
    rowComponent: 'Row',
    cellComponent: 'Cell',
    toggleCellComponent: 'ToggleCell',
  };

  render() {
    const {
      rowHeight,
      contentComponent: Content,
      toggleCellComponent: ToggleCell,
      cellComponent: Cell,
      rowComponent: Row,
      toggleColumnWidth,
    } = this.props;

    const tableColumnsComputed = (
      { tableColumns }: Getters,
    ) => tableColumnsWithDetail(tableColumns, toggleColumnWidth);
    const tableBodyRowsComputed = (
      { tableBodyRows, expandedDetailRowIds }: Getters,
    ) => tableRowsWithExpandedDetail(tableBodyRows, expandedDetailRowIds, rowHeight!);

    return (
      <Plugin
        name="TableRowDetail"
        dependencies={pluginDependencies}
      >
        <Getter name="tableColumns" computed={tableColumnsComputed} />
        <Getter name="tableBodyRows" computed={tableBodyRowsComputed} />
        <Getter name="getTableCellColSpan" computed={getCellColSpanComputed} />

        <Template
          name="tableCell"
          predicate={(
            { tableRow, tableColumn }: any,
          ) => isDetailToggleTableCell(tableRow, tableColumn)}
        >
          {(params: TableCellProps) => (
            <TemplateConnector>
              {({ expandedDetailRowIds }, { toggleDetailRowExpanded }) => (
                <ToggleCell
                  {...params}
                  row={params.tableRow.row}
                  expanded={isDetailRowExpanded(expandedDetailRowIds, params.tableRow.rowId!)}
                  onToggle={() => toggleDetailRowExpanded({ rowId: params.tableRow.rowId })}
                />
              )}
            </TemplateConnector>
          )}
        </Template>
        <Template
          name="tableCell"
          predicate={({ tableRow }: any) => !!isDetailTableRow(tableRow)}
        >
          {(params: TableCellProps) => (
            <TemplateConnector>
              {({ tableColumns }) => {
                if (isDetailTableCell(params.tableColumn, tableColumns)) {
                  return (
                    <Cell
                      {...params}
                      row={params.tableRow.row}
                    >
                      {Content && <Content row={params.tableRow.row} />}
                    </Cell>
                  );
                }
                return null;
              }}
            </TemplateConnector>
          )}
        </Template>
        <Template
          name="tableRow"
          predicate={({ tableRow }: any) => !!isDetailTableRow(tableRow)}
        >
          {(params: TableRowProps) => (
            <Row
              {...params}
              row={params.tableRow.row}
            />
          )}
        </Template>
      </Plugin>
    );
  }
}

/** A plugin that renders detail rows. */
export const TableRowDetail: React.ComponentType<TableRowDetailProps> & {
  /** The detail column type's identifier. */
  COLUMN_TYPE: symbol;
  /** The detail row type's indentifier. */
  ROW_TYPE: symbol;
} = TableRowDetailBase;
