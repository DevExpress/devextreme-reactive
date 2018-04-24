import { Getter, Action, Plugin } from '@devexpress/dx-vue-core';
import {
  changeColumnFilter,
  getColumnExtensionValueGetter,
  filterExpression,
} from '@devexpress/dx-grid-core';

const columnExtensionValueGetter = (columnExtensions, defaultValue) =>
  getColumnExtensionValueGetter(columnExtensions, 'filteringEnabled', defaultValue);
const filterExpressionComputed = ({ filters, filterExpression: filterExpressionValue }) =>
  filterExpression(filters, filterExpressionValue);

export const FilteringState = {
  name: 'FilteringState',
  props: {
    filters: {
      type: Array,
      default: () => [],
    },
    columnExtensions: {
      type: Array,
    },
    columnFilteringEnabled: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    changeColumnFilter(payload) {
      this.$emit(
        'update:filters',
        changeColumnFilter(this.filters, payload),
      );
    },
  },
  render() {
    const { filters, columnExtensions, columnFilteringEnabled } = this;

    return (
      <Plugin
        name="FilteringState"
      >
        <Getter name="filters" value={filters} />
        <Getter name="filterExpression" computed={filterExpressionComputed} />
        <Getter
          name="isColumnFilteringEnabled"
          value={columnExtensionValueGetter(columnExtensions, columnFilteringEnabled)}
        />
        <Action name="changeColumnFilter" action={this.changeColumnFilter} />
      </Plugin>
    );
  },
};
