export const TableNoDataCell = {
  props: {
    row: {},
    tableRow: {},
    column: {},
    tableColumn: {},
    getMessage: {},
  },
  render() {
    return (
      <td
        class="py-5 text-center"
        {...{ attrs: this.$attrs, on: this.$listeners }}
      >
        <big className="text-muted">{this.getMessage('noData')}</big>
      </td>
    );
  },
};
