export const TableRow = {
  name: 'TableRow',
  props: {
    row: null,
    tableRow: {
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
