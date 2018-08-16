import { RowLayout } from './row-layout';

export const RowsBlockLayout = {
  name: 'RowsBlockLayout',
  props: {
    rows: {
      type: Array,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
    blockComponent: {
      type: Object,
      required: true,
    },
    rowComponent: {
      type: Object,
      required: true,
    },
    cellComponent: {
      type: Object,
      required: true,
    },
    getCellColSpan: {
      getCellColSpan: Function,
      required: true,
    },
  },
  render() {
    const {
      rows,
      columns,
      blockComponent: Block,
      rowComponent,
      cellComponent,
      getCellColSpan,
    } = this;

    return (
      <Block>
        {
          rows
            .map(row => (
              <RowLayout
                key={row.key}
                row={row}
                columns={columns}
                rowComponent={rowComponent}
                cellComponent={cellComponent}
                getCellColSpan={getCellColSpan}
              />
            ))
        }
      </Block>
    );
  },
};
