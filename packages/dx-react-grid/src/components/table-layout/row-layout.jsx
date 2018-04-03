import * as React from 'react';
import * as PropTypes from 'prop-types';

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
      getCellColSpan,
    } = this.props;

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
                colSpan={getCellColSpan(row, column)}
              />
            ))
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
  getCellColSpan: PropTypes.func.isRequired,
};
