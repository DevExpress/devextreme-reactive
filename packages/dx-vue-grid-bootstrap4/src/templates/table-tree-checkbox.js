import { SelectionControl } from './parts/selection-control';

export const TableTreeCheckbox = {
  props: {
    checked: {},
    indeterminate: {},
    disabled: {},
  },
  render() {
    return (
      <SelectionControl
        disabled={this.disabled}
        checked={this.checked}
        indeterminate={this.indeterminate}
        onChange={() => this.$emit('change')}
        class="mr-4"
        {...{ attrs: this.$attrs, on: this.$listeners }}
      />
    );
  },
};
