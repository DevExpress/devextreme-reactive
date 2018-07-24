import { ExpandButton } from './parts/expand-button';

export const TableGroupCell = {
  props: {
    colSpan: {
      type: Number,
    },
    row: null,
    column: {
      type: Object,
    },
    expanded: {
      type: Boolean,
    },
    tableRow: {
      type: Object,
    },
    tableColumn: {
      type: Object,
    },
  },
  render() {
    const {
      colSpan, expanded, column, row,
    } = this;
    const handleClick = () => this.$emit('toggle');
    return (
      <td
        colSpan={colSpan}
        class="dx-g-bs4-cursor-pointer"
        onClick={handleClick}
      >
        <ExpandButton
          expanded={expanded}
          onToggle={handleClick}
          class="mr-2"
        />
        <strong>{column.title || column.name}: </strong>
        {this.$slots.default || row.value}
      </td>
    );
  },
};
