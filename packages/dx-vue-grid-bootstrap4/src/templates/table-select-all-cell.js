import { SelectionControl } from './parts/selection-control';

export const TableSelectAllCell = {
  props: {
    allSelected: {
      type: Boolean,
      default: false,
    },
    someSelected: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    rowSpan: {
      type: Number,
    },
    tableColumn: {
      type: Object,
    },
    tableRow: {
      type: Object,
    },
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
