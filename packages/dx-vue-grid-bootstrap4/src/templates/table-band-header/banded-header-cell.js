export const BandedHeaderCell = {
  props: {
    component: {
      type: Object,
    },
  },
  render() {
    const { component: HeaderCellComponent } = this;
    return (
      <HeaderCellComponent
        class="dx-g-bs4-banded-header-cell border-left border-right"
        {...{ attrs: this.$attrs, on: this.$listeners }}
      />
    );
  },
};
