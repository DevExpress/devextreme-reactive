export const TableRow = {
  props: {
    row: null,
    tableRow: {
      type: Object,
    },
    tableColumn: {
      type: Object,
    },
  },
  render() {
    return (
      <tr>
        {this.$slots.default}
      </tr>
    );
  },
};
