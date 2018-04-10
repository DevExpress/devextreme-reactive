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
      >
        <big className="text-muted">{this.getMessage('noData')}</big>
      </td>
    );
  },
};
