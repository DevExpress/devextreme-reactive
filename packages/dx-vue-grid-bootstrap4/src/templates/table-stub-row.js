export const TableStubRow = {
  name: 'TableStubRow',
  props: {
    tableRow: {
      type: Object,
    },
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
