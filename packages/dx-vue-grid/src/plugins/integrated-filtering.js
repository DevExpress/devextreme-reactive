import { Getter, Plugin } from '@devexpress/dx-vue-core';
import {
  filteredRows,
  getColumnExtension,
  unwrappedFilteredRows,
} from '@devexpress/dx-grid-core';

const pluginDependencies = [
  { name: 'FilteringState', optional: true },
  { name: 'SearchState', optional: true },
];

const unwrappedRowsComputed = ({ rows }) => unwrappedFilteredRows(rows);

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
    }) => filteredRows(
      rows,
      filterExpression,
      getCellValue,
      getColumnPredicate,
    );

    return (
      <Plugin
        name="IntegratedFiltering"
        dependencies={pluginDependencies}
      >
        <Getter name="rows" computed={rowsComputed} />
        <Getter name="rows" computed={unwrappedRowsComputed} />
      </Plugin>
    );
  },
};
