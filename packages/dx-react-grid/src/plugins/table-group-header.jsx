import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Getter, Template, Plugin, TemplateConnector, TemplatePlaceholder } from '@devexpress/dx-react-core';
import {
  getColumnMeta,
  isBandedTableRow,
  tableRowsWithBands,
  isHeadingTableCell,
} from '@devexpress/dx-grid-core';

const CellPlaceholder = props => <TemplatePlaceholder params={props} />;

export class TableGroupHeader extends React.PureComponent {
  render() {
    const {
      showSortingControls,
      showGroupingControls,
      cellComponent: Cell,
      rowComponent: HeaderRow,
      headerCellComponent: HeaderCell,
      bandColumns,
    } = this.props;

    const tableHeaderRowsComputed = ({ tableHeaderRows }) =>
      tableRowsWithBands(tableHeaderRows, bandColumns);

    return (
      <Plugin
        name="TableGroupHeader"
        dependencies={[
          { name: 'Table' },
          { name: 'SortingState', optional: !showSortingControls },
          { name: 'GroupingState', optional: !showGroupingControls },
          { name: 'DragDropProvider', optional: true },
          { name: 'TableColumnResizing', optional: true },
        ]}
      >
        <Getter name="tableHeaderRows" computed={tableHeaderRowsComputed} />

        <Template name="tableCell" predicate={({ tableRow }) => isBandedTableRow(tableRow)}>
          {() => null}
        </Template>

        <Template
          name="tableCell"
          predicate={({ tableColumn, tableRow }) => isBandedTableRow(tableRow) || (tableRow.type === 'heading' && tableColumn.type !== 'data') || tableRow.type === 'heading'}
        >
          {params => (
            <TemplateConnector>
              {({ tableColumns, tableHeaderRows }) => {
                if (params.skip === true) return <TemplatePlaceholder />;

                const maxLevel = tableHeaderRows.filter(column => column.type === 'band').length + 1;
                if (params.tableColumn.type !== 'data') {
                  if (params.tableRow.level === 0) {
                    return (
                      <TemplatePlaceholder
                        name="tableCell"
                        params={{
                          ...params,
                          tableRow: { ...tableHeaderRows.find(row => row.type === 'heading'), level: 0 },
                          rowSpan: maxLevel,
                          skip: true,
                        }}
                      />
                    );
                  } return null;
                }
                const tableRowLevel = params.tableRow.level;
                const dataTableColumns = tableColumns.filter(column => column.type === 'data');
                const currentColumnMeta =
                  getColumnMeta(params.tableColumn.column.name, bandColumns, tableRowLevel);

                const rowLevel = params.tableRow.level === undefined
                  ? maxLevel - 1 : params.tableRow.level;
                if (currentColumnMeta.level < rowLevel) return null;
                if (currentColumnMeta.level === rowLevel) {
                  return (
                    <TemplatePlaceholder
                      name="tableCell"
                      params={{
                        ...params,
                        tableRow: tableHeaderRows.find(row => row.type === 'heading'),
                        rowSpan: (maxLevel - rowLevel),
                        skip: true,
                      }}
                    />
                  );
                }

                const currColumnIndex = dataTableColumns.findIndex(tableColumn =>
                  tableColumn.key === params.tableColumn.key);
                if (currColumnIndex > 0) {
                  const prevColumnMeta = getColumnMeta(
                    dataTableColumns[currColumnIndex - 1].column.name,
                      bandColumns,
                      tableRowLevel,
                    );
                  if (prevColumnMeta.title === currentColumnMeta.title) return null;
                }

                let colSpan = 1;
                for (let index = currColumnIndex + 1; index < dataTableColumns.length; index += 1) {
                  const columnMeta =
                    getColumnMeta(dataTableColumns[index].column.name, bandColumns, tableRowLevel);
                  if (columnMeta.title === currentColumnMeta.title) {
                    colSpan += 1;
                  } else break;
                }

                return (
                  <Cell
                    {...params}
                    colSpan={colSpan}
                    value={currentColumnMeta.title}
                    column={currentColumnMeta}
                  />
                );
              }}
            </TemplateConnector>
          )}
        </Template>
        <Template
          name="tableCell"
          predicate={({ tableRow, tableColumn }) => isHeadingTableCell(tableRow, tableColumn)}
        >
          {params => <HeaderCell component={CellPlaceholder} {...params} />}
        </Template>
        <Template
          name="tableRow"
          predicate={({ tableRow }) => isBandedTableRow(tableRow)}
        >
          {params => <HeaderRow {...params} />}
        </Template>
      </Plugin>
    );
  }
}

TableGroupHeader.propTypes = {
  bandColumns: PropTypes.array.isRequired,
  showSortingControls: PropTypes.bool,
  showGroupingControls: PropTypes.bool,
  cellComponent: PropTypes.func.isRequired,
  rowComponent: PropTypes.func.isRequired,
  headerCellComponent: PropTypes.func.isRequired,
};

TableGroupHeader.defaultProps = {
  showSortingControls: false,
  showGroupingControls: false,
};
