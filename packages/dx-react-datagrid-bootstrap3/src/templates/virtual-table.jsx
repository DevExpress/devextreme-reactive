/* global window document */

import React from 'react';
import { Sizer } from './virtual-table/sizer';
import { WindowedScroller } from './virtual-table/windowed-scroller';
import { VirtualBox } from './virtual-table/virtual-box';

const DEFAULT_HEIGHT = 38;
const DEFAULT_WIDTH = 200;

export class VirtualTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      autoHeights: new WeakMap(),
    };

    this.rowHeight = (row) => {
      let height = DEFAULT_HEIGHT;
      if (row.height) {
        height = row.height === 'auto' ? this.state.autoHeights.get(row) || DEFAULT_HEIGHT : row.height;
      }
      return height;
    };
    this.columnWidth = column => column.width || DEFAULT_WIDTH;
  }
  render() {
    const { headerRows, bodyRows, columns, cellContentTemplate } = this.props;

    const tableHeaderCell = ({ row, column }) => {
      const template = cellContentTemplate({ row, column });
      return (
        <th>
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
        <td>
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
              ? this.columnWidth(columns[columnIndex])
              : columns.slice(colspan).reduce(
                (accum, column) => accum + this.columnWidth(column),
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
      <div style={{ height: '500px' }}>
        <WindowedScroller>
          <VirtualBox
            rootTag="table"
            className="table"

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
  headerRows: React.PropTypes.array.isRequired,
  bodyRows: React.PropTypes.array.isRequired,
  columns: React.PropTypes.array.isRequired,
  cellContentTemplate: React.PropTypes.func.isRequired,
};
