import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Getter, Template, Plugin, TemplateConnector, TemplatePlaceholder } from '@devexpress/dx-react-core';
import {
  getColumnMeta,
  isBandedTableRow,
  isBandedOrHeaderRow,
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
      stubCellComponent: StubCell,
      emptyCellComponent: EmptyCell,
      columnGroups,
    } = this.props;

    const tableHeaderRowsComputed = ({ tableHeaderRows }) =>
      tableRowsWithBands(tableHeaderRows, columnGroups);

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

        <Template
          name="tableCell"
          predicate={({ tableRow, tableColumn }) => tableRow.type === 'heading' && tableColumn.type === 'flex'}
        >
          {params => <StubCell style={{ ...params.style }} rowSpan={params.rowSpan} />}
        </Template>

        <Template
          name="tableCell"
          predicate={({ tableRow }) => isBandedOrHeaderRow(tableRow)}
        >
          {params => (
            <TemplateConnector>
              {({ tableColumns, tableHeaderRows }) => {
                if (params.rowSpan) return <TemplatePlaceholder />;

                const maxLevel = tableHeaderRows.filter(column => column.type === 'band').length + 1;
                const currentRowLevel = params.tableRow.level === undefined
                  ? maxLevel - 1 : params.tableRow.level;
                const currentColumnMeta = params.tableColumn.type === 'data'
                  ? getColumnMeta(params.tableColumn.column.name, columnGroups, currentRowLevel)
                  : { level: 0, title: '' };

                // рендерит заглушки всех ячеек, которые стоят перед текущей
                if (currentColumnMeta.level < currentRowLevel) return <EmptyCell />;
                if (currentColumnMeta.level === currentRowLevel) {
                  // рендерит текущую ячейку на нужной строке с типом хедер
                  return (
                    <TemplatePlaceholder
                      name="tableCell"
                      params={{
                        ...params,
                        tableRow: tableHeaderRows.find(row => row.type === 'heading'),
                        rowSpan: maxLevel - currentRowLevel,
                      }}
                    />
                  );
                }

                const currColumnIndex = tableColumns.findIndex(tableColumn =>
                  tableColumn.key === params.tableColumn.key);
                if (currColumnIndex > 0 && tableColumns[currColumnIndex - 1].type === 'data') {
                  const prevColumnMeta = getColumnMeta(
                      tableColumns[currColumnIndex - 1].column.name,
                      columnGroups,
                      currentRowLevel,
                    );
                  // если ячейка относится к предыдущей группе, то не рендерим её
                  if (prevColumnMeta.title === currentColumnMeta.title) return null;
                }

                // рендеринг широких главных ячеек. Вычислениее ширины
                let colSpan = 1;
                for (let index = currColumnIndex + 1; index < tableColumns.length; index += 1) {
                  if (tableColumns[index].type !== 'data') break;
                  const columnMeta =
                    getColumnMeta(tableColumns[index].column.name, columnGroups, currentRowLevel);
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
  columnGroups: PropTypes.array.isRequired,
  showSortingControls: PropTypes.bool,
  showGroupingControls: PropTypes.bool,
  cellComponent: PropTypes.func.isRequired,
  rowComponent: PropTypes.func.isRequired,
  headerCellComponent: PropTypes.func.isRequired,
  stubCellComponent: PropTypes.func.isRequired,
  emptyCellComponent: PropTypes.func.isRequired,
};

TableGroupHeader.defaultProps = {
  showSortingControls: false,
  showGroupingControls: false,
};
