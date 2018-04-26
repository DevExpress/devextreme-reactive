export const TableCell = {
  props: {
    row: {},
    tableRow: {},
    column: {},
    tableColumn: {},
    value: {},
  },
  render() {
    const align = (this.tableColumn && this.tableColumn.align) || 'left';
    return (
      <td
        class={{
          'dx-g-bs4-table-cell': true,
          'text-nowrap': !(this.tableColumn && this.tableColumn.wordWrapEnabled),
          [`text-${align}`]: align !== 'left',
        }}
        {...{ attrs: this.$attrs, on: this.$listeners }}
      >
        {this.$slots.default || this.value}
      </td>
    );
  },
};
