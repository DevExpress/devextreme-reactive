import * as React from 'react';

export class VirtualRowLayout extends React.Component<any, any> {
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
              style={column.animationState}
              colSpan={cell.colSpan}
            />
          );
        })}
      </Row>
    );
  }
}
