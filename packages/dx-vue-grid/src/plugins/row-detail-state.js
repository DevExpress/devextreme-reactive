import { DxGetter, DxAction, DxPlugin } from '@devexpress/dx-vue-core';
import { toggleDetailRowExpanded } from '@devexpress/dx-grid-core';

export const DxRowDetailState = {
  name: 'DxRowDetailState',
  props: {
    expandedRowIds: {
      type: Array,
      required: true,
    },
  },
  methods: {
    toggleDetailRowExpanded(payload) {
      this.$emit(
        'update:expandedRowIds',
        toggleDetailRowExpanded(this.expandedRowIds, payload),
      );
    },
  },
  render() {
    return (
      <DxPlugin
        name="DxRowDetailState"
      >
        <DxGetter name="expandedDetailRowIds" value={this.expandedRowIds} />
        <DxAction name="toggleDetailRowExpanded" action={this.toggleDetailRowExpanded} />
      </DxPlugin>
    );
  },
};
