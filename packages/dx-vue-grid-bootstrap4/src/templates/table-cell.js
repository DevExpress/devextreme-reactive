export const TableCell = {
  props: {
    row: {},
    tableRow: {},
    column: {},
    tableColumn: {},
  },
  render() {
    return (
      <td style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {this.$slots.default}
      </td>
    );
  },
};
