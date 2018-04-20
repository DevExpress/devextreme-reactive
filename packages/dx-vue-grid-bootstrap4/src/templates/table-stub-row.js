export const TableStubRow = {
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
