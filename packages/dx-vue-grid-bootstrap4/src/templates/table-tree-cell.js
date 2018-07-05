export const TableTreeCell = {
  props: {
    column: {},
    tableRow: {},
    tableColumn: {},
    row: {},
  },
  render() {
    return (
      <td
        {...{ attrs: this.$attrs, on: this.$listeners }}
      >
        <div
          class="d-flex flex-direction-row align-items-center"
        >
          {this.$slots.default}
        </div>
      </td>
    );
  },
};
