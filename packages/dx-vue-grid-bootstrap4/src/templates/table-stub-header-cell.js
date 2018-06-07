export const TableStubHeaderCell = {
  name: 'TableStubHeaderCell',
  props: {
    tableRow: {
      type: Object,
    },
    tableColumn: {
      type: Object,
    },
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
