import { SelectionControl } from './parts/selection-control';

export const TableSelectAllCell = {
  props: {
    allSelected: {
      type: Boolean,
    },
    someSelected: {
      type: Boolean,
    },
    disabled: {
      type: Boolean,
    },
    rowSpan: {
      type: Number,
      default: undefined,
    },
    tableColumn: {},
    tableRow: {},
  },
  render() {
    const {
      rowSpan, disabled,
      allSelected, someSelected,
    } = this;
    const { toggle: onToggle } = this.$listeners;
    return (
      <th
        class={{
          'text-center': true,
          'align-middle': !rowSpan,
          'align-bottom': !!rowSpan,
        }}
        rowSpan={rowSpan}
      >
        <SelectionControl
          disabled={disabled}
          checked={allSelected}
          indeterminate={someSelected}
          onChange={onToggle}
        />
      </th>
    );
  },
};
