import { Getter, Action, Plugin } from '@devexpress/dx-vue-core';
import { toggleSelection } from '@devexpress/dx-grid-core';

export const SelectionState = {
  name: 'SelectionState',
  props: {
    selection: {
      type: Array,
      required: true,
    },
  },
  methods: {
    toggleSelection(payload) {
      this.$emit(
        'update:selection',
        toggleSelection(this.selection, payload),
      );
    },
  },
  render() {
    return (
      <Plugin
        name="SelectionState"
      >
        <Getter name="selection" value={this.selection} />
        <Action name="toggleSelection" action={this.toggleSelection} />
      </Plugin>
    );
  },
};
