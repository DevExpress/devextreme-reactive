import * as React from 'react';
import { RowLayoutProps } from '../../types';

const getColumnStyle = ({ column }) => column.animationState;

const getRowStyle = ({ row }) => (row.height !== undefined
  ? ({ height: `${row.height}px` })
  : undefined);

  /** @internal */
export class RowLayout extends React.PureComponent<RowLayoutProps> {
  render() {
    const {
      row,
      columns,
      rowComponent: Row,
      cellComponent: Cell,
      getCellColSpan,
    } = this.props;
    const getColSpan = (
      tableRow, tableColumn,
    ) => getCellColSpan!({ tableRow, tableColumn, tableColumns: columns });

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
  }
}
