export const DxToolbar = {
  render() {
    return (
      <div
        class="card-header py-2 d-flex position-relative dx-g-bs4-toolbar"
      >
        {this.$slots.default}
      </div>
    );
  },
};
