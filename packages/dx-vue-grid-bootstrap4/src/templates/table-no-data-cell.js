export const TableNoDataCell = {
  props: {
    tableRow: {
      type: Object,
    },
    tableColumn: {
      type: Object,
    },
    getMessage: {
      type: Function,
      required: true,
    },
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
