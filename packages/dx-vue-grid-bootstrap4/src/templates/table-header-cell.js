export const TableHeaderCell = {
  props: {
    row: {},
    tableRow: {},
    column: {},
    tableColumn: {},
  },
  render() {
    return (
      <th>
        {this.$slots.default}
      </th>
    );
  },
};
