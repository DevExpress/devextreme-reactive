import { SelectionControl } from './parts/selection-control';

export const TableSelectCell = {
  props: {
    selected: {
      type: Boolean,
    },
    row: {},
    tableRow: {},
    tableColumn: {},
  },
  render() {
    const { toggle: onToggle } = this.$listeners;
    const { selected } = this;
    return (
      <td
        class="text-center align-middle"
      >
        <SelectionControl
          checked={selected}
          onChange={onToggle}
        />
      </td>
    );
  },
};
