import * as React from 'react';
import * as PropTypes from 'prop-types';
import { getTableRowColumnsWithColSpan } from '@devexpress/dx-grid-core';

const getColumnStyle = ({ column }) => column.animationState;

const getRowStyle = ({ row }) => (row.height !== undefined
  ? ({ height: `${row.height}px` })
  : undefined);

export class RowLayout extends React.PureComponent {
  render() {
    const {
      row,
      columns,
      rowComponent: Row,
      cellComponent: Cell,
    } = this.props;

    // debugger;
    return (
      <Row
        tableRow={row}
        style={getRowStyle({ row })}
      >
        {
          getTableRowColumnsWithColSpan(columns, row.colSpanStart, row) // columns = tableColumns
            .map((column) => {
              return (
                <Cell
                  key={column.key}
                  tableRow={row}
                  tableColumn={column}
                  style={getColumnStyle({ column })}
                />
            )})
        }
      </Row>
    );
  }
}

RowLayout.propTypes = {
  row: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
  rowComponent: PropTypes.func.isRequired,
  cellComponent: PropTypes.func.isRequired,
};
