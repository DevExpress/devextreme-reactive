import { Getter, Action, Plugin } from '@devexpress/dx-vue-core';
import {
  changeColumnSorting,
  getColumnExtensionValueGetter,
  getPersistentSortedColumns,
  calculateKeepOther,
} from '@devexpress/dx-grid-core';

const columnExtensionValueGetter = (columnExtensions, defaultValue) =>
  getColumnExtensionValueGetter(columnExtensions, 'sortingEnabled', defaultValue);

export const SortingState = {
  props: {
    sorting: {
      type: Array,
    },
    columnExtensions: {
      type: Array,
    },
    columnSortingEnabled: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    changeColumnSorting(state, payload) {
      const persistentSortedColumns =
        getPersistentSortedColumns(state.sorting, this.columnExtensions);
      const keepOther =
        calculateKeepOther(state.sorting, payload.keepOther, persistentSortedColumns);
      const { sorting } = changeColumnSorting(state, { ...payload, keepOther });
      this.$emit('update:sorting', sorting);
    },
  },
  // componentWillReceiveProps(nextProps) {
  //   const {
  //     sorting,
  //   } = nextProps;
  //   this.setState({
  //     ...sorting !== undefined ? { sorting } : null,
  //   });
  // }
  render() {
    const { columnExtensions, columnSortingEnabled } = this;

    return (
      <Plugin
        name="SortingState"
      >
        <Getter name="sorting" value={this.sorting} />
        <Getter
          name="isColumnSortingEnabled"
          value={columnExtensionValueGetter(columnExtensions, columnSortingEnabled)}
        />
        <Action name="changeColumnSorting" action={this.changeColumnSorting} />
      </Plugin>
    );
  },
};
