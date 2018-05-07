import { Getter, Action, Plugin } from '@devexpress/dx-vue-core';
import { toggleDetailRowExpanded } from '@devexpress/dx-grid-core';

export const RowDetailState = {
  name: 'RowDetailState',
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
      <Plugin
        name="RowDetailState"
      >
        <Getter name="expandedDetailRowIds" value={this.expandedRowIds} />
        <Action name="toggleDetailRowExpanded" action={this.toggleDetailRowExpanded} />
      </Plugin>
    );
  },
};
