import { Getter, Action, Plugin } from '@devexpress/dx-vue-core';
import { changeColumnFilter, getColumnExtensionValueGetter, pushFilterExpression } from '@devexpress/dx-grid-core';

const columnExtensionValueGetter = (columnExtensions, defaultValue) =>
  getColumnExtensionValueGetter(columnExtensions, 'filteringEnabled', defaultValue);

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
        <Getter name="filterExpression" computed={pushFilterExpression(filters)} />
        <Getter
          name="isColumnFilteringEnabled"
          value={columnExtensionValueGetter(columnExtensions, columnFilteringEnabled)}
        />
        <Action name="changeColumnFilter" action={this.changeColumnFilter} />
      </Plugin>
    );
  },
};
