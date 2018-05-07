import { DxGetter, DxAction, DxPlugin } from '@devexpress/dx-vue-core';
import { changeColumnFilter, getColumnExtensionValueGetter, pushFilterExpression } from '@devexpress/dx-grid-core';

const columnExtensionValueGetter = (columnExtensions, defaultValue) =>
  getColumnExtensionValueGetter(columnExtensions, 'filteringEnabled', defaultValue);

export const DxFilteringState = {
  name: 'DxFilteringState',
  props: {
    filters: {
      type: Array,
      required: true,
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
      <DxPlugin
        name="DxFilteringState"
      >
        <DxGetter name="filters" value={filters} />
        <DxGetter name="filterExpression" computed={pushFilterExpression(filters)} />
        <DxGetter
          name="isColumnFilteringEnabled"
          value={columnExtensionValueGetter(columnExtensions, columnFilteringEnabled)}
        />
        <DxAction name="changeColumnFilter" action={this.changeColumnFilter} />
      </DxPlugin>
    );
  },
};
