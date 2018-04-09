import { Getter, Plugin } from '@devexpress/dx-vue-core';
import { filteredRows, getColumnExtension } from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { name: 'FilteringState', optional: true },
  { name: 'SearchState', optional: true },
];

export const IntegratedFiltering = {
  name: 'IntegratedFiltering',
  props: {
    columnExtensions: {
      type: Array,
    },
  },
  render() {
    const { columnExtensions } = this;
    const getColumnPredicate = columnName =>
      getColumnExtension(columnExtensions, columnName).predicate;

    const rowsComputed = ({
      rows,
      filterExpression,
      getCellValue,
      isGroupRow,
      getRowLevelKey,
    }) => filteredRows(
      rows,
      filterExpression,
      getCellValue,
      getColumnPredicate,
      isGroupRow,
      getRowLevelKey,
    );

    return (
      <Plugin
        name="IntegratedFiltering"
        dependencies={pluginDependencies}
      >
        <Getter name="rows" computed={rowsComputed} />
      </Plugin>
    );
  },
};
