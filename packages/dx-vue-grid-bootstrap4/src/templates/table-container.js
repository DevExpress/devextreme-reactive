export const TableContainer = {
  render() {
    return (
      <div
        class="table-responsive"
        {...{ attrs: this.$attrs, on: this.$listeners }}
      >
        {this.$slots.default}
      </div>
    );
  },
};
