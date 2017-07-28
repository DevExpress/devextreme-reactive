/* global window document */

import React from 'react';
import PropTypes from 'prop-types';
import { getTableRowColumnsWithColSpan } from '@devexpress/dx-grid-core';
import { WindowedScroller } from './virtual-table/windowed-scroller';
import { VirtualBox } from './virtual-table/virtual-box';

const DEFAULT_HEIGHT = 37;
const MINIMAL_COLUMN_WIDTH = 120;

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
      let height = row.height || DEFAULT_HEIGHT;
      if (height === 'auto') {
        height = DEFAULT_HEIGHT;
      }
      return height;
    };
  }
  render() {
    const { headerRows, bodyRows, columns, cellTemplate } = this.props;

    const columnWidths = calculateColumnWidths(columns, this.state.viewportWidth);
    const scrollWidth = columnWidths.reduce((accum, width) => accum + width, 0);

    const tableRow = (row, position) => {
      const columnsWithColSpan = getTableRowColumnsWithColSpan(columns, row.colSpanStart);
      return (
        <VirtualBox
          rootTag="tr"

          position={position}
          crossSize={this.rowHeight(row)}
          direction="horizontal"
          itemCount={columnsWithColSpan.length}
          itemInfo={(columnIndex) => {
            const columnWithColSpan = columnsWithColSpan[columnIndex];
            const size = !columnWithColSpan.colspan
              ? columnWidths[columnIndex]
              : columns.slice(columnIndex).reduce(
                (accum, column) => accum + columnWidths[columns.indexOf(column)],
                0,
              );

            return {
              size,
              stick: false,
            };
          }}
          itemTemplate={(columnIndex, _, style) =>
            cellTemplate({ tableRow: row, tableColumn: columnsWithColSpan[columnIndex], style })}
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
          tableRow(headerRows[rowIndex], rowPosition)}
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
          tableRow(bodyRows[rowIndex], rowPosition)}
      />
    );

    return (
      <div
        style={{ height: '530px' }}
      >
        <WindowedScroller
          onViewportChange={viewport => this.setState({ viewportWidth: viewport.width })}
        >
          <VirtualBox
            rootTag="table"
            className="table"
            style={{ zIndex: 0, margin: 0 }}

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

VirtualTable.propTypes = {
  headerRows: PropTypes.array.isRequired,
  bodyRows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  cellTemplate: PropTypes.func.isRequired,
};
