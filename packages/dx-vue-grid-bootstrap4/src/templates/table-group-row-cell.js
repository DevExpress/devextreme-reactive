import { ExpandButton } from './parts/expand-button';

export const TableGroupCell = {
  props: {
    colSpan: {
      type: Number,
    },
    row: {
      type: Object,
    },
    column: {
      type: Object,
    },
    expanded: {
      type: Boolean,
    },
    // onToggle: {
    //   type: Function,
    // },
    tableRow: {
      type: Object,
    },
    tableColumn: {
      type: Object,
    },
  },
  render() {
    const {
      // onToggle,
      colSpan, expanded, column, row,
    } = this;
    //const handleClick = () => onToggle();
    return (
      <td
        colSpan={colSpan}
        class="dx-g-bs4-cursor-pointer"
        // onClick={handleClick}
      >
        <ExpandButton
          expanded={expanded}
          // onToggle={onToggle}
          class="mr-2"
        />
        <strong>{column.title || column.name}: </strong>
        {this.$slots.default || row.value}
      </td>
    );
  },
};

