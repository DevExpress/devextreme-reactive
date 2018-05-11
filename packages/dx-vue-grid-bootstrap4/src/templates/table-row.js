export const TableRow = {
  name: 'TableRow',
  functional: true,
  props: {
    row: null,
    tableRow: {
      type: Object,
    },
    tableColumn: {
      type: Object,
    },
  },
  render(h, context) {
    return (
      <tr
        {...{ attrs: context.attrs, on: context.listeners }}
      >
        {context.children}
      </tr>
    );
  },
};
