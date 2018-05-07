export const TableRow = {
  props: {
    row: {},
    tableRow: {},
  },
  render() {
    return (
      <tr>
        {this.$slots.default}
      </tr>
    );
  },
};
