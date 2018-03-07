import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Getter, Template, Plugin, TemplateConnector } from '@devexpress/dx-react-core';
import {
  getColumnMeta,
  isBandedTableRow,
  isBandedTableCell,
  tableRowsWithBands,
} from '@devexpress/dx-grid-core';

export class TableBandRow extends React.PureComponent {
  render() {
    const {
      showSortingControls,
      showGroupingControls,
      cellComponent: HeaderCell,
      rowComponent: HeaderRow,
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

        <Template
          name="tableCell"
          predicate={({ tableColumn, tableRow }) => isBandedTableCell(tableRow, tableColumn)}
        >
          {params => (
            <TemplateConnector>
              {({ tableColumns }) => {
                const tableRowLevel = params.tableRow.level;
                const currentColumnMeta =
                  getColumnMeta(params.tableColumn.column.name, bandColumns, tableRowLevel);

                if (currentColumnMeta.level <= params.tableRow.level) return <HeaderCell />;

                const currentColumnIndex =
                  tableColumns.findIndex(tableColumn => tableColumn.key === params.tableColumn.key);
                if (currentColumnIndex > 0) {
                  const prevColumnMeta = getColumnMeta(
                      tableColumns[currentColumnIndex - 1].column.name,
                      bandColumns,
                      tableRowLevel,
                    );
                  if (prevColumnMeta.title === currentColumnMeta.title) return null;
                }

                let colSpan = 1;
                for (let index = currentColumnIndex + 1; index < tableColumns.length; index += 1) {
                  const columnMeta =
                    getColumnMeta(tableColumns[index].column.name, bandColumns, tableRowLevel);
                  if (columnMeta.title === currentColumnMeta.title) {
                    colSpan += 1;
                  } else break;
                }

                return (
                  <HeaderCell
                    {...params}

                    colSpan={colSpan}
                    value={currentColumnMeta.title}
                  />
                );
              }}
            </TemplateConnector>
          )}
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
};

TableBandRow.defaultProps = {
  showSortingControls: false,
  showGroupingControls: false,
};
