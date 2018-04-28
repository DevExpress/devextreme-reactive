import { Getter, Plugin } from '@devexpress/dx-vue-core';
import {
  filteredRows,
  getColumnExtension,
  unwrappedFilteredRows,
} from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { name: 'DxFilteringState', optional: true },
  { name: 'SearchState', optional: true },
];

const unwrappedRowsComputed = ({ rows }) => unwrappedFilteredRows(rows);

export const DxIntegratedFiltering = {
  name: 'DxIntegratedFiltering',
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
    }) => filteredRows(
      rows,
      filterExpression,
      getCellValue,
      getColumnPredicate,
    );

    return (
      <Plugin
        name="DxIntegratedFiltering"
        dependencies={pluginDependencies}
      >
        <Getter name="rows" computed={rowsComputed} />
        <Getter name="rows" computed={unwrappedRowsComputed} />
      </Plugin>
    );
  },
};
