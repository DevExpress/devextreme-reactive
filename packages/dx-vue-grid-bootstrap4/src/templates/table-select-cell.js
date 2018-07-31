import { SelectionControl } from './parts/selection-control';

export const TableSelectCell = {
  props: {
    selected: {
      type: Boolean,
      default: false,
    },
    row: null,
    tableRow: {
      type: Object,
    },
    tableColumn: {
      type: Object,
    },
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
