export const TableRow = {
  props: {
    row: {},
    tableRow: {},
  },
  render() {
    return (
      <tr
        {...{ attrs: this.$attrs, on: this.$listeners }}
      >
        {this.$slots.default}
      </tr>
    );
  },
};
