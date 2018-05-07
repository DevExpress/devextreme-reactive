export const TableRow = {
  props: {
    row: {},
    tableRow: {},
    height: {
      type: String,
    },
    // style1: {},
  },
  render() {
    console.log(this.height);
    console.log(this.$attrs.height);
    debugger
    return (
      <tr
        {...{ attrs: this.$attrs, on: this.$listeners }}
        style={{
          ...this.height && { height: this.height },
        }}
        // style={this.style1}
      >
        {this.$slots.default}
      </tr>
    );
  },
};
