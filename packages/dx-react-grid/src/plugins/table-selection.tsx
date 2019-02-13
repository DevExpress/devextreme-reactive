import * as React from 'react';
import {
  Getter, Template, Plugin,
  TemplateConnector,
  Getters,
} from '@devexpress/dx-react-core';
import {
  TABLE_SELECT_TYPE,
  tableColumnsWithSelection,
  isSelectTableCell,
  isSelectAllTableCell,
  isDataTableRow,
} from '@devexpress/dx-grid-core';
import { TableSelectionProps, TableCellProps, TableRowProps } from '../types';

class TableSelectionBase extends React.PureComponent<TableSelectionProps> {
  static defaultProps = {
    highlightRow: false,
    selectByRowClick: false,
    showSelectAll: false,
    showSelectionColumn: true,
  };
  static components = {
    rowComponent: 'Row',
    cellComponent: 'Cell',
    headerCellComponent: 'HeaderCell',
  };
  static COLUMN_TYPE = TABLE_SELECT_TYPE;

  render() {
    const {
      highlightRow,
      selectByRowClick,
      showSelectionColumn,
      showSelectAll,
      headerCellComponent: HeaderCell,
      cellComponent: Cell,
      rowComponent: Row,
      selectionColumnWidth,
    } = this.props;

    const tableColumnsComputed = (
      { tableColumns }: Getters,
    ) => tableColumnsWithSelection(tableColumns, selectionColumnWidth);

    return (
      <Plugin
        name="TableSelection"
        dependencies={[
          { name: 'Table' },
          { name: 'SelectionState' },
          { name: 'IntegratedSelection', optional: !showSelectAll },
        ]}
      >
        {showSelectionColumn && (
          <Getter name="tableColumns" computed={tableColumnsComputed} />
        )}

        {(showSelectionColumn && showSelectAll) && (
          <Template
            name="tableCell"
            predicate={({
              tableRow, tableColumn,
            }: any) => isSelectAllTableCell(tableRow, tableColumn)}
          >
            {(params: TableCellProps) => (
              <TemplateConnector>
                {({ selectAllAvailable, allSelected, someSelected }, { toggleSelectAll }) => (
                  <HeaderCell
                    {...params}
                    disabled={!selectAllAvailable}
                    allSelected={allSelected}
                    someSelected={someSelected}
                    onToggle={select => toggleSelectAll(select)}
                  />
                )}
              </TemplateConnector>
            )}
          </Template>
        )}
        {showSelectionColumn && (
          <Template
            name="tableCell"
            predicate={({ tableRow, tableColumn }: any) => isSelectTableCell(tableRow, tableColumn)}
          >
            {(params: TableCellProps) => (
              <TemplateConnector>
                {({ selection }, { toggleSelection }) => (
                  <Cell
                    {...params}
                    row={params.tableRow.row}
                    selected={selection.indexOf(params.tableRow.rowId) !== -1}
                    onToggle={() => toggleSelection({ rowIds: [params.tableRow.rowId] })}
                  />
                )}
              </TemplateConnector>
            )}
          </Template>
        )}
        {(highlightRow || selectByRowClick) && (
          <Template
            name="tableRow"
            predicate={({ tableRow }: any) => !!isDataTableRow(tableRow)}
          >
            {(params: TableRowProps) => (
              <TemplateConnector>
                {({ selection }, { toggleSelection }) => (
                  <Row
                    {...params}
                    selectByRowClick={selectByRowClick}
                    selected={highlightRow && selection.indexOf(params.tableRow.rowId) !== -1}
                    onToggle={() => toggleSelection({ rowIds: [params.tableRow.rowId] })}
                  />
                )}
              </TemplateConnector>
            )}
          </Template>
        )}
      </Plugin>
    );
  }
}

export const TableSelection: React.ComponentType<TableSelectionProps> = TableSelectionBase;
