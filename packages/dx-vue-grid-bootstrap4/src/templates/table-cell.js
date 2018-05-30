export const TableCell = {
  name: 'TableCell',
  props: {
    row: null,
    tableRow: {
      type: Object,
    },
    column: {
      type: Object,
    },
    tableColumn: {
      type: Object,
    },
    value: null,
  },
  render() {
    const { tableColumn } = this;
    const align = (tableColumn && tableColumn.align) || 'left';

    return (
      <td
        class={{
          'dx-g-bs4-table-cell': true,
          'text-nowrap': !(tableColumn && tableColumn.wordWrapEnabled),
          [`text-${align}`]: align !== 'left',
        }}
        {...{ attrs: this.$attrs, on: this.$listeners } }
      >
        {this.$slots.default || this.value}
      </td>
    );
  },
};
