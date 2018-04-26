export const Table = {
  render() {
    return (
      <table
        class="table mb-0 w-100 dx-g-bs4-overflow-hidden dx-g-bs4-table"
        {...{ attrs: this.$attrs, on: this.$listeners }}
      >
        {this.$slots.default}
      </table>
    );
  },
};
