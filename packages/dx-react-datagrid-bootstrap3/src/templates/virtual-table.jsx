/* global window document */

import React from 'react';
import { Sizer } from './virtual-table/sizer';
import { WindowedScroller } from './virtual-table/windowed-scroller';
import { VirtualBox } from './virtual-table/virtual-box';
import { closest } from './utils/table';

const DEFAULT_HEIGHT = 38;
const MINIMAL_COLUMN_WIDTH = 100;

const calculateColumnWidths = (columns, tableWidth) => {
  const occupiedWidth = columns
    .map(column => column.width)
    .filter(width => !!width)
    .reduce((accum, width) => accum + width, 0);
  const restWidthSpread = columns
    .map(column => column.width)
    .filter(width => !width)
    .length;
  const calculatedWidth = (tableWidth - occupiedWidth) / restWidthSpread;
  const widthForAutoColumn = Math.max(calculatedWidth, MINIMAL_COLUMN_WIDTH);

  return columns
    .map(column => column.width)
    .map(width => (!!width && width !== 'auto' ? width : widthForAutoColumn));
};

export class VirtualTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      viewportWidth: 0,
      autoHeights: new WeakMap(),
    };

    this.rowHeight = (row) => {
      let height = DEFAULT_HEIGHT;
      if (row.height) {
        height = row.height === 'auto' ? this.state.autoHeights.get(row) || DEFAULT_HEIGHT : row.height;
      }
      return height;
    };
  }
  render() {
    const { headerRows, bodyRows, columns, cellContentTemplate, onClick } = this.props;

    const columnWidths = calculateColumnWidths(columns, this.state.viewportWidth);
    const scrollWidth = columnWidths.reduce((accum, width) => accum + width, 0);

    const tableHeaderCell = ({ row, column }) => {
      const template = cellContentTemplate({ row, column });
      return (
        <th
          data-cell={JSON.stringify({ rowId: row.id, columnName: column.name })}
        >
          {template}
        </th>
      );
    };

    const tableCell = ({ row, column }) => {
      let template = cellContentTemplate({ row, column });
      if (row.height === 'auto') {
        template = (
          <Sizer
            height={this.rowHeight(row) - 17} // TODO: paddings
            onHeightChange={(height) => {
              const { autoHeights } = this.state;
              autoHeights.set(row, height + 17); // TODO: paddings
              this.setState({ autoHeights });
            }}
          >
            {template}
          </Sizer>
        );
      }
      return (
        <td
          data-cell={JSON.stringify({ rowId: row.id, columnName: column.name })}
        >
          {template}
        </td>
      );
    };

    const tableRow = (row, cellTemplate, position) => {
      const colspan = row.colspan;
      const columnLength = colspan !== undefined ? colspan + 1 : columns.length;
      return (
        <VirtualBox
          rootTag="tr"

          position={position}
          crossSize={this.rowHeight(row)}
          direction="horizontal"
          itemCount={columnLength}
          itemInfo={(columnIndex) => {
            const size = columnIndex !== colspan
              ? columnWidths[columnIndex]
              : columns.slice(colspan).reduce(
                (accum, column) => accum + columnWidths[columns.indexOf(column)],
                0,
              );

            return {
              size,
              stick: false,
            };
          }}
          itemTemplate={columnIndex => cellTemplate({ row, column: columns[columnIndex] })}
        />
      );
    };

    const tableHead = position => (
      <VirtualBox
        key="thead"
        rootTag="thead"

        iref={(ref) => {
          if (!ref) return;
          const { style } = ref;
          style.backgroundColor = window.getComputedStyle(document.body).backgroundColor;
        }}

        position={position}
        stick
        direction="vertical"
        itemCount={headerRows.length}
        itemInfo={rowIndex => ({
          size: this.rowHeight(headerRows[rowIndex]),
          stick: false,
        })}
        itemTemplate={(rowIndex, rowPosition) =>
          tableRow(headerRows[rowIndex], tableHeaderCell, rowPosition)}
      />
    );

    const tableBody = position => (
      <VirtualBox
        key="tbody"
        rootTag="tbody"

        position={position}
        direction="vertical"
        itemCount={bodyRows.length}
        itemInfo={rowIndex => ({
          size: this.rowHeight(bodyRows[rowIndex]),
          stick: false,
        })}
        itemTemplate={(rowIndex, rowPosition) =>
          tableRow(bodyRows[rowIndex], tableCell, rowPosition)}
      />
    );

    return (
      <div
        style={{ height: '360px' }}
        onClick={(e) => {
          const { target } = e;
          const cellEl = closest(target, 'th') || closest(target, 'td');
          if (!cellEl) return;

          const { rowId, columnName } = JSON.parse(cellEl.getAttribute('data-cell'));
          const row = [...headerRows, ...bodyRows].find(r => r.id === rowId);
          const column = columns.find(c => c.name === columnName);
          onClick({ row, column, e });
        }}
      >
        <WindowedScroller
          onViewportChange={viewport => this.setState({ viewportWidth: viewport.width })}
        >
          <VirtualBox
            rootTag="table"
            className="table"

            crossSize={scrollWidth}
            direction="vertical"
            itemCount={2}
            itemInfo={(rowIndex) => {
              const size = rowIndex === 0
                    ? headerRows.reduce((accum, row) => accum + this.rowHeight(row), 0)
                    : bodyRows.reduce((accum, row) => accum + this.rowHeight(row), 0);

              return {
                size,
                stick: rowIndex === 0 ? 'before' : false,
              };
            }}
            itemTemplate={(rowIndex, position) =>
              (rowIndex === 0 ? tableHead(position) : tableBody(position))}
          />
        </WindowedScroller>
      </div>
    );
  }
}
VirtualTable.defaultProps = {
  onClick: () => {},
};
VirtualTable.propTypes = {
  headerRows: React.PropTypes.array.isRequired,
  bodyRows: React.PropTypes.array.isRequired,
  columns: React.PropTypes.array.isRequired,
  cellContentTemplate: React.PropTypes.func.isRequired,
  onClick: React.PropTypes.func,
};
