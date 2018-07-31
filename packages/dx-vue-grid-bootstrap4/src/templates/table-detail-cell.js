export const TableDetailCell = {
  props: {
    colSpan: {
      type: Number,
    },
  },
  render() {
    return (
      <td
        colSpan={this.colSpan}
        class="table-active"
      >
        {this.$slots.default}
      </td>
    );
  },
};
