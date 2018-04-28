import { Getter, Action, Plugin } from '@devexpress/dx-vue-core';
import { toggleDetailRowExpanded } from '@devexpress/dx-grid-core';

export const DxRowDetailState = {
  name: 'DxRowDetailState',
  props: {
    expandedRowIds: {
      type: Array,
      default: () => [],
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
      <Plugin
        name="DxRowDetailState"
      >
        <Getter name="expandedDetailRowIds" value={this.expandedRowIds} />
        <Action name="toggleDetailRowExpanded" action={this.toggleDetailRowExpanded} />
      </Plugin>
    );
  },
};
