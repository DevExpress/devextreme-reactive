export const TableStubHeaderCell = {
  props: {
    tableRow: {},
    tableColumn: {},
  },
  render() {
    return (
      <th
        {...{ attrs: this.$attrs, on: this.$listeners }}
        class="p-0"
      />
    );
  },
};
