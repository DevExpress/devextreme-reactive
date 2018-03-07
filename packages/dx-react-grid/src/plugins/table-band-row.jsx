import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Getter, Template, Plugin, TemplateConnector } from '@devexpress/dx-react-core';
import {
  addBandRows,
  isBandedTableRow,
  isBandedTableCell,
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
      addBandRows(tableHeaderRows, bandColumns);

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
                const getMeta = (columnName) => {
                  let currentBandTitle = null;
                  let columnLevel = 0;

                  const maxBandLevel = (bands, level, title) => {
                    bands.forEach((column) => {
                      if (column.columnName === columnName) {
                        columnLevel = level;
                        currentBandTitle = title;
                      }
                      if (column.nested !== undefined) {
                        maxBandLevel(column.nested, level + 1, level > params.tableRow.level ? title : column.title);
                      }
                    });
                  };

                  maxBandLevel(bandColumns, 0);

                  return ({ title: currentBandTitle, level: columnLevel });
                };

                const meta = getMeta(params.tableColumn.column.name);

                if (meta.level <= params.tableRow.level) {
                  return <HeaderCell />;
                }

                const columnIndex = tableColumns.findIndex(tableColumn => tableColumn.key === params.tableColumn.key);
                if (columnIndex > 0) {
                  const prevMeta = getMeta(tableColumns[columnIndex - 1].column.name);
                  if (prevMeta.title === meta.title) {
                    return null;
                  }
                }

                let colSpan = 1;

                for (let index = columnIndex + 1; index < tableColumns.length; index += 1) {
                  if (getMeta(tableColumns[index].column.name).title === meta.title) {
                    colSpan += 1;
                  } else {
                    break;
                  }
                }

                return (
                  <HeaderCell
                    {...params}

                    colSpan={colSpan}
                    value={meta.title}
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
