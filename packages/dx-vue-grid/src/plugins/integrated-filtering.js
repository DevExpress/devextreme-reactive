import { DxGetter, DxPlugin } from '@devexpress/dx-vue-core';
import {
  filteredRows,
  getColumnExtension,
  filteredCollapsedRowsGetter,
  unwrappedFilteredRows,
  defaultFilterPredicate,
} from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { name: 'DxFilteringState', optional: true },
  { name: 'DxSearchState', optional: true },
];

const getCollapsedRowsComputed = ({ rows }) => filteredCollapsedRowsGetter(rows);
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
    const getColumnPredicate = columnName => getColumnExtension(
      columnExtensions, columnName,
    ).predicate;

    const rowsComputed = ({
      rows,
      filterExpression,
      getCellValue,
      getRowLevelKey,
      getCollapsedRows,
    }) => filteredRows(
      rows,
      filterExpression,
      getCellValue,
      getColumnPredicate,
      getRowLevelKey,
      getCollapsedRows,
    );

    return (
      <DxPlugin
        name="DxIntegratedFiltering"
        dependencies={pluginDependencies}
      >
        <DxGetter name="rows" computed={rowsComputed} />
        <DxGetter name="getCollapsedRows" computed={getCollapsedRowsComputed} />
        <DxGetter name="rows" computed={unwrappedRowsComputed} />
      </DxPlugin>
    );
  },
};

DxIntegratedFiltering.defaultPredicate = defaultFilterPredicate;
