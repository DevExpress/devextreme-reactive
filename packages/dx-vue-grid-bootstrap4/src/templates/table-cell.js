export const TableCell = {
  props: {
    row: {},
    tableRow: {},
    column: {},
    tableColumn: {},
    value: {},
  },
  render() {
    const { value, tableColumn } = this;
    return (
      <td class={{
        'text-nowrap dx-g-bs4-table-cell': true,
        'text-right': tableColumn && tableColumn.align === 'right',
        'text-center': tableColumn && tableColumn.align === 'center',
      }}
      >
        {this.$slots.default || value}
      </td>
    );
  },
};
