import * as React from 'react';
import { argumentsShallowEqual } from '@devexpress/dx-core';
import { VirtualRowLayoutProps } from '../../types';

const reducer = (acc, { column, colSpan }) => {
  const [columns, colSpans] = acc;
  columns.push(column);
  colSpans.push(colSpan);
  return acc;
};

export class VirtualRowLayout extends React.Component<VirtualRowLayoutProps> {
  shouldComponentUpdate(nextProps) {
    const { cells: prevCells, row: prevRow } = this.props;
    const { cells: nextCells, row: nextRow } = nextProps;
    const [nextColumns, nextColSpans] = nextCells.reduce(reducer, [[], []]);
    const [prevColumns, prevColSpans] = prevCells.reduce(reducer, [[], []]);

    const propsAreEqual = argumentsShallowEqual(nextColumns, prevColumns)
      && argumentsShallowEqual(nextColSpans, prevColSpans)
      && prevRow === nextRow;
    return !propsAreEqual;
  }
  render() {
    const { row, cells, rowComponent: Row, cellComponent: Cell } = this.props;
    return (
      <Row
        tableRow={row}
        style={row.height !== undefined
          ? { height: `${row.height}px` }
          : undefined}
      >
        {cells.map((cell) => {
          const { column } = cell;
          return (
            <Cell
              key={column.key}
              tableRow={row}
              tableColumn={column}
              colSpan={cell.colSpan}
            />
          );
        })}
      </Row>
    );
  }
}
