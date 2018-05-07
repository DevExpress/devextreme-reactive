import { DxGetter, DxPlugin } from '@devexpress/dx-vue-core';
import {
  filteredRows,
  getColumnExtension,
  unwrappedFilteredRows,
} from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { name: 'DxFilteringState', optional: true },
  { name: 'DxSearchState', optional: true },
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
      <DxPlugin
        name="DxIntegratedFiltering"
        dependencies={pluginDependencies}
      >
        <DxGetter name="rows" computed={rowsComputed} />
        <DxGetter name="rows" computed={unwrappedRowsComputed} />
      </DxPlugin>
    );
  },
};
