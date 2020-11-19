import * as React from 'react';
import { VirtualRowLayoutProps } from '../../types';
import { getRowStyle } from '../../utils/helpers';

const shouldUpdateRow = (prevProps, nextProps) => {
  const { cells: prevCells, row: prevRow } = prevProps;
  const { cells: nextCells, row: nextRow } = nextProps;

  if (prevRow !== nextRow || prevCells.length !== nextCells.length) {
    return true;
  }

  const propsAreEqual = !nextCells.some((nextCell, i) => {
    const prevCell = prevCells[i];
    return prevCell.column !== nextCell.column || prevCell.colSpan !== nextCell.colSpan;
  });

  return propsAreEqual;
};

export const VirtualRowLayout = React.memo<VirtualRowLayoutProps>(({
  row, cells, rowComponent: Row, cellComponent: Cell, forwardedRef,
}) => {
  return (
    <Row
      forwardedRef={forwardedRef}
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
}, shouldUpdateRow);
