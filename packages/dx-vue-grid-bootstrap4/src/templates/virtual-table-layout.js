import {
  TableLayout,
  VirtualTableLayout as VirtualTableLayoutCore,
} from '@devexpress/dx-vue-grid';

const MINIMAL_COLUMN_WIDTH = 150;

export const VirtualTableLayout = {
  name: 'VirtualTableLayout',
  render() {
    return (
      <TableLayout
        layoutComponent={VirtualTableLayoutCore}
        minColumnWidth={MINIMAL_COLUMN_WIDTH}
        { ...{ attrs: { ...this.$attrs }, listeners: { ...this.$listeners } }}
      />
    );
  },
};
