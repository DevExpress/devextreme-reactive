import * as React from 'react';
import { RowLayoutProps } from '../../types';
import { getRowStyle } from '../../utils/helpers';

const getColumnStyle = ({ column }) => column.animationState;

/** @internal */
export const RowLayout: React.FunctionComponent<RowLayoutProps> = React.memo((props) => {
  const {
    row,
    columns,
    rowComponent: Row,
    cellComponent: Cell,
    getCellColSpan,
  } = props;

  const getColSpan = React.useCallback(
    (tableRow, tableColumn) => getCellColSpan!({ tableRow, tableColumn, tableColumns: columns }),
    [columns, getCellColSpan],
  );

  return (
    <Row
      tableRow={row}
      style={getRowStyle({ row })}
    >
      {
        columns
          .map(column => (
            <Cell
              key={column.key}
              tableRow={row}
              tableColumn={column}
              style={getColumnStyle({ column })}
              colSpan={getColSpan(row, column)}
            />
          ))
      }
    </Row>
  );
});
