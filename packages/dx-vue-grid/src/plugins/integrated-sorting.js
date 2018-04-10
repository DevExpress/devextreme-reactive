import { Getter, Plugin } from '@devexpress/dx-vue-core';
import { sortedRows, getColumnExtension } from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { name: 'SortingState' },
];

export const IntegratedSorting = {
  name: 'IntegratedSorting',
  props: {
    columnExtensions: {
      type: Array,
    },
  },
  render() {
    const { columnExtensions } = this;
    const getColumnCompare = columnName =>
      getColumnExtension(columnExtensions, columnName).compare;

    const rowsComputed = ({
      rows, sorting, getCellValue, isGroupRow, getRowLevelKey,
    }) =>
      sortedRows(rows, sorting, getCellValue, getColumnCompare, isGroupRow, getRowLevelKey);

    return (
      <Plugin
        name="IntegratedSorting"
        dependencies={pluginDependencies}
      >
        <Getter name="rows" computed={rowsComputed} />
      </Plugin>
    );
  },
};
