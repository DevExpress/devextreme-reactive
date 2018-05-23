export const TableTreeContent = {
  render() {
    return (
      <div
        class="text-nowrap w-100 dx-g-bs4-table-tree-content"
        {...{ attrs: this.$attrs, on: this.$listeners }}
      >
        {this.$slots.default}
      </div>
    );
  },
};
