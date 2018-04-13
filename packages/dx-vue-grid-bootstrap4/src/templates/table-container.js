export const TableContainer = {
  render() {
    return (
      <div class="table-responsive">
        {this.$slots.default}
      </div>
    );
  },
};
