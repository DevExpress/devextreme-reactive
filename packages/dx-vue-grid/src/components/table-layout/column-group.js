export const ColumnGroup = {
  name: 'ColumnGroup',
  props: {
    columns: {
      type: Array,
      required: true,
    },
  },
  render() {
    const { columns } = this;

    return (
      <colgroup>
        {columns.map(column => (
          <col
            key={column.key}
            style={column.width !== undefined
              ? { width: `${column.width}px` }
              : null}
          />
        ))}
      </colgroup>
    );
  },
};
