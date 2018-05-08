export const TableStubRow = {
  props: {
    tableRow: {
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
