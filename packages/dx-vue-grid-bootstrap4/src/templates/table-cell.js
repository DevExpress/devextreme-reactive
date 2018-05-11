export const TableCell = {
  name: 'TableCell',
  functional: true,
  props: {
    row: null,
    tableRow: {
      type: Object,
    },
    column: {
      type: Object,
    },
    tableColumn: {
      type: Object,
    },
    value: null,
  },
  render(h, context) {
    const { tableColumn } = context.props;
    const align = (tableColumn && tableColumn.align) || 'left';

    return (
      <td
        class={{
          'dx-g-bs4-table-cell': true,
          'text-nowrap': !(tableColumn && tableColumn.wordWrapEnabled),
          [`text-${align}`]: align !== 'left',
        }}
        {...{ attrs: context.data, on: context.listeners } }
      >
        {context.slots().default ? context.children : context.props.value}
      </td>
    );
  },
};
