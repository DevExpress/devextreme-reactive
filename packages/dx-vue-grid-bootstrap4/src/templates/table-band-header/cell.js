export const Cell = {
  props: {
    column: {
      type: Object,
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
    return (
      <th
        class="dx-g-bs4-banded-cell dx-g-bs4-table-cell text-nowrap border-left border-right border-bottom"
        {...{ attrs: this.$attrs, on: this.$listeners }}
      >
        {this.$slots.default}
      </th>
    );
  },
};
