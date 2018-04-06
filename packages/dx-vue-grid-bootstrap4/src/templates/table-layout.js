import { TableLayout as TableLayoutCore, StaticTableLayout } from '@devexpress/dx-vue-grid';

const MINIMAL_COLUMN_WIDTH = 150;

export const TableLayout = {
  render() {
    return (
      <TableLayoutCore
        {...{ attrs: this.$attrs }}
        layoutComponent={StaticTableLayout}
        minColumnWidth={MINIMAL_COLUMN_WIDTH}
      />
    );
  },
};
