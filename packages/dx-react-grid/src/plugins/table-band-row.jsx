import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Getter, Template, Plugin, TemplateConnector, TemplatePlaceholder } from '@devexpress/dx-react-core';
import {
  getColumnMeta,
  isBandedTableRow,
  isBandedTableCell,
  tableRowsWithBands,
  isHeadingTableCell,
} from '@devexpress/dx-grid-core';

const CellPlaceholder = props => <TemplatePlaceholder params={props} />;

export class TableBandRow extends React.PureComponent {
  render() {
    const {
      showSortingControls,
      showGroupingControls,
      cellComponent: Cell,
      rowComponent: HeaderRow,
      headerCellComponent: HeaderCell,
      emptyCellComponent: EmptyCell,
      stubCellComponent: StubCell,
      bandColumns,
    } = this.props;

    const tableHeaderRowsComputed = ({ tableHeaderRows }) =>
      tableRowsWithBands(tableHeaderRows, bandColumns);

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
        <Getter
          name="tableHeaderRows"
          computed={tableHeaderRowsComputed}
        />

        <Template name="tableCell" predicate={({ tableRow }) => isBandedTableRow(tableRow)}>
          {params => (
            <StubCell {...params} />
          )}
        </Template>
        <Template
          name="tableCell"
          predicate={({ tableColumn, tableRow }) => isBandedTableCell(tableRow, tableColumn)}
        >
          {params => (
            <TemplateConnector>
              {({ tableColumns }) => {
                const tableRowLevel = params.tableRow.level;
                const dataTableColumns = tableColumns.filter(column => column.type === 'data');
                const currentColumnMeta =
                  getColumnMeta(params.tableColumn.column.name, bandColumns, tableRowLevel);

                if (currentColumnMeta.level <= params.tableRow.level) return <EmptyCell />;

                const currentColumnIndex =
                dataTableColumns.findIndex(tableColumn =>
                  tableColumn.key === params.tableColumn.key);
                if (currentColumnIndex > 0) {
                  const prevColumnMeta = getColumnMeta(
                    dataTableColumns[currentColumnIndex - 1].column.name,
                      bandColumns,
                      tableRowLevel,
                    );
                  if (prevColumnMeta.title === currentColumnMeta.title) return null;
                }

                let colSpan = 1;
                for (let index = currentColumnIndex + 1; index < dataTableColumns.length; index += 1) {
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

TableBandRow.propTypes = {
  bandColumns: PropTypes.array.isRequired,
  showSortingControls: PropTypes.bool,
  showGroupingControls: PropTypes.bool,
  cellComponent: PropTypes.func.isRequired,
  rowComponent: PropTypes.func.isRequired,
  emptyCellComponent: PropTypes.func.isRequired,
  headerCellComponent: PropTypes.func.isRequired,
  stubCellComponent: PropTypes.func.isRequired,
};

TableBandRow.defaultProps = {
  showSortingControls: false,
  showGroupingControls: false,
};
