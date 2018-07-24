import { DxGetter, DxAction, DxPlugin } from '@devexpress/dx-vue-core';
import {
  changeColumnSorting,
  getColumnExtensionValueGetter,
  getPersistentSortedColumns,
  calculateKeepOther,
} from '@devexpress/dx-grid-core';

export const DxSortingState = {
  name: 'DxSortingState',
  props: {
    sorting: {
      type: Array,
      required: true,
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
    changeColumnSorting(payload) {
      const persistentSortedColumns = getPersistentSortedColumns(
        this.sorting, this.columnExtensions,
      );
      const keepOther = calculateKeepOther(
        this.sorting, payload.keepOther, persistentSortedColumns,
      );
      this.$emit(
        'update:sorting',
        changeColumnSorting({ sorting: this.sorting }, { ...payload, keepOther }).sorting,
      );
    },
  },

  render() {
    const { columnExtensions, columnSortingEnabled } = this;
    const columnExtensionValueGetter = (extensions, defaultValue) => getColumnExtensionValueGetter(extensions, 'sortingEnabled', defaultValue);

    return (
      <DxPlugin
        name="DxSortingState"
      >
        <DxGetter name="sorting" value={this.sorting} />
        <DxGetter
          name="isColumnSortingEnabled"
          value={columnExtensionValueGetter(columnExtensions, columnSortingEnabled)}
        />
        <DxAction name="changeColumnSorting" action={this.changeColumnSorting} />
      </DxPlugin>
    );
  },
};
