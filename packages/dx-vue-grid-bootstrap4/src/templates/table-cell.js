export const TableCell = {
  props: {
    row: {},
    tableRow: {},
    column: {},
    tableColumn: {},
  },
  render() {
    return (
      <td>
        {this.$slots.default}
      </td>
    );
  },
};
