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
      <tr
        {...{ attrs: this.$attrs, on: this.$listeners }}
      >
        {this.$slots.default}
      </tr>
    );
  },
};
