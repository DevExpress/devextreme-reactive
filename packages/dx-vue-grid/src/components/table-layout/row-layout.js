import { getTableRowColumnsWithColSpan } from '@devexpress/dx-grid-core';

const getRowStyle = ({ row }) => (row.height !== undefined
  ? ({ height: `${row.height}px` })
  : undefined);

export const RowLayout = {
  name: 'RowLayout',
  props: {
    row: {
      type: Object,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
    rowComponent: {
      type: Object,
      required: true,
    },
    cellComponent: {
      type: Object,
      required: true,
    },
  },
  render() {
    const {
      row,
      columns,
      rowComponent: Row,
      cellComponent: Cell,
    } = this;

    return (
      <Row
        tableRow={row}
        style={getRowStyle({ row })}
      >
        {
          getTableRowColumnsWithColSpan(columns, row.colSpanStart)
            .map(column => (
              <Cell
                key={column.key}
                tableRow={row}
                tableColumn={column}
                colSpan={column.colSpan}
              />
            ))
        }
      </Row>
    );
  },
};
