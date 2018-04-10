export const Table = {
  render() {
    return (
      <table
        class="table mb-0 w-100 dx-rg-bs4-overflow-hidden dx-rg-bs4-table"
      >
        {this.$slots.default}
      </table>
    );
  },
};
