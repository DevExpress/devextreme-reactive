export const TableStubHeaderCell = {
  name: 'TableStubHeaderCell',
  functional: true,
  props: {
    tableRow: {
      type: Object,
    },
    tableColumn: {
      type: Object,
    },
  },
  render(h, context) {
    return (
      <th
        {...{ attrs: context.props, on: context.listeners }}
        class="p-0"
      />
    );
  },
};
