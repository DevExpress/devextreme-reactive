export const TableCell = {
  props: {
    row: {},
    tableRow: {},
    column: {},
    tableColumn: {},
  },
  render() {
    return (
      <td class="dx-rg-bs4-table-cell">
        {this.$slots.default}
      </td>
    );
  },
};
