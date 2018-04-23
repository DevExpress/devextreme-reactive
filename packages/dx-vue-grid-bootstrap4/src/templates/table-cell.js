export const TableCell = {
  props: {
    row: {},
    tableRow: {},
    column: {},
    tableColumn: {},
  },
  render() {
    return (
      <td class="text-nowrap dx-g-bs4-table-cell">
        {this.$slots.default}
      </td>
    );
  },
};
