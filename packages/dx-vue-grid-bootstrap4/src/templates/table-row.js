export const TableRow = {
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
        {...{ attrs: this.$attrs, on: this.$listeners }}
        style={{
          color: 'red',
          ...this.height && { height: this.height },
        }}
      >
        {this.$slots.default}
      </tr>
    );
  },
};
