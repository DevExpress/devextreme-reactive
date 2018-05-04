import {
  TableLayout,
  VirtualTableLayout as VirtualTableLayoutCore,
} from '@devexpress/dx-vue-grid';

const MINIMAL_COLUMN_WIDTH = 150;

export const VirtualTableLayout = {
  name: 'VirtualTableLayout',
  render() {
    debugger
    console.log('VirtualTableLayout vue-bs4');
    return (
      <TableLayout
        layoutComponent={VirtualTableLayoutCore}
        minColumnWidth={MINIMAL_COLUMN_WIDTH}
        { ...{ attrs: { ...this.$attrs }, listeners: { ...this.$listeners } }}
      />
    );
  },
};
