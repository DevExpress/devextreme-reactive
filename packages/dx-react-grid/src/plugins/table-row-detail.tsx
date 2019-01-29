import * as React from 'react';
import {
  Getter, Template, Plugin, TemplateConnector, Getters, PluginComponents,
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
import { TableRowDetailProps, CellProps, RowProps } from '../types';

const getCellColSpanComputed = (
  { getTableCellColSpan }: Getters,
) => tableDetailCellColSpanGetter(getTableCellColSpan);

const pluginDependencies = [
  { name: 'RowDetailState' },
  { name: 'Table' },
];

export class TableRowDetail extends React.PureComponent<TableRowDetailProps> {
  static components: PluginComponents;
  static ROW_TYPE = TABLE_DETAIL_TYPE;
  static COLUMN_TYPE = TABLE_DETAIL_TYPE;

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
          predicate={({ tableRow, tableColumn }: any) => isDetailToggleTableCell(tableRow, tableColumn)}
        >
          {(params: CellProps) => (
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
          {(params: CellProps) => (
            <TemplateConnector>
              {({ tableColumns }) => {
                if (isDetailTableCell(params.tableColumn, tableColumns)) {
                  return (
                    <Cell
                      {...params}
                      row={params.tableRow.row}
                    >
                      <Content row={params.tableRow.row} />
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
          {(params: RowProps) => (
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

TableRowDetail.components = {
  rowComponent: 'Row',
  cellComponent: 'Cell',
  toggleCellComponent: 'ToggleCell',
};
