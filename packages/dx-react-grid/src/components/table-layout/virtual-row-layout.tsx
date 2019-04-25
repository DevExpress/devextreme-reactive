import * as React from 'react';
import { VirtualRowLayoutProps } from '../../types';
import { getRowStyle } from '../../utils/helpers';

export class VirtualRowLayout extends React.Component<VirtualRowLayoutProps> {
  shouldComponentUpdate(nextProps) {
    const { cells: prevCells, row: prevRow } = this.props;
    const { cells: nextCells, row: nextRow } = nextProps;

    if (prevRow !== nextRow || prevCells.length !== nextCells.length) {
      return true;
    }

    const propsAreNotEqual = nextCells.some((nextCell, i) => {
      const prevCell = prevCells[i];
      return prevCell.column !== nextCell.column || prevCell.colSpan !== nextCell.colSpan;
    });

    return propsAreNotEqual;
  }

  render() {
    const { row, cells, rowComponent: Row, cellComponent: Cell } = this.props;
    return (
      <Row
        tableRow={row}
        style={getRowStyle({ row })}
      >
        {cells.map(({ column, colSpan }) => {
          return (
            <Cell
              key={column.key}
              tableRow={row}
              tableColumn={column}
              colSpan={colSpan}
            />
          );
        })}
      </Row>
    );
  }
}
