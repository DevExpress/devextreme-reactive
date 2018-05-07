export const TableStubRow = {
  props: {
    row: {},
    tableRow: {},
    height: {
      type: String,
    },
  },
  render() {
    return (
      <tr
        style={{
          height: this.height,
        }}
      >
        {this.$slots.default}
      </tr>
    );
  },
};
