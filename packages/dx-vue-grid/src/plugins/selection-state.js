import { Getter, Action, Plugin } from '@devexpress/dx-vue-core';
import { toggleSelection } from '@devexpress/dx-grid-core';

export const DxSelectionState = {
  name: 'DxSelectionState',
  props: {
    selection: {
      type: Array,
      default: () => [],
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
        name="DxSelectionState"
      >
        <Getter name="selection" value={this.selection} />
        <Action name="toggleSelection" action={this.toggleSelection} />
      </Plugin>
    );
  },
};
