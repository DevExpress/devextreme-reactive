import { DxGetter, DxAction, DxPlugin } from '@devexpress/dx-vue-core';
import { toggleRowExpanded } from '@devexpress/dx-grid-core';

export const DxTreeDataState = {
  name: 'DxTreeDataState',
  props: {
    expandedRowIds: {
      type: Array,
      required: true,
    },
  },
  methods: {
    toggleRowExpanded(payload) {
      this.$emit(
        'update:expandedRowIds',
        toggleRowExpanded(this.expandedRowIds, payload),
      );
    },
  },
  render() {
    return (
      <DxPlugin
        name="DxTreeDataState"
      >
        <DxGetter name="expandedRowIds" value={this.expandedRowIds} />
        <DxAction name="toggleRowExpanded" action={this.toggleRowExpanded} />
      </DxPlugin>
    );
  },
};
