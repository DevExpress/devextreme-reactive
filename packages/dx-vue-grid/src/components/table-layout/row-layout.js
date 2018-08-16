const getRowStyle = ({ row }) => (row.height !== undefined
  ? ({ height: `${row.height}px` })
  : undefined);

export const RowLayout = {
  name: 'RowLayout',
  props: {
    row: {
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
    getCellColSpan: {
      getCellColSpan: Function,
      required: true,
    },
  },
  render() {
    const {
      row,
      columns,
      rowComponent: Row,
      cellComponent: Cell,
      getCellColSpan,
    } = this;
    const getColSpan = (
      tableRow, tableColumn,
    ) => getCellColSpan({ tableRow, tableColumn, tableColumns: columns });

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
                colSpan={getColSpan(row, column)}
              />
            ))
        }
      </Row>
    );
  },
};
