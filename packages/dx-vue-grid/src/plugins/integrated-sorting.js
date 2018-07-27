import { DxGetter, DxPlugin } from '@devexpress/dx-vue-core';
import { sortedRows, getColumnExtension } from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { name: 'DxSortingState' },
];

export const DxIntegratedSorting = {
  name: 'DxIntegratedSorting',
  props: {
    columnExtensions: {
      type: Array,
    },
  },
  render() {
    const { columnExtensions } = this;
    const getColumnCompare = columnName => getColumnExtension(columnExtensions, columnName).compare;

    const rowsComputed = ({
      rows, sorting, getCellValue, isGroupRow, getRowLevelKey,
    }) => sortedRows(rows, sorting, getCellValue, getColumnCompare, isGroupRow, getRowLevelKey);

    return (
      <DxPlugin
        name="DxIntegratedSorting"
        dependencies={pluginDependencies}
      >
        <DxGetter name="rows" computed={rowsComputed} />
      </DxPlugin>
    );
  },
};
