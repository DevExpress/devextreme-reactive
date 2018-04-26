export const TableHead = {
  render() {
    return (
      <thead
        {...{ attrs: this.$attrs, on: this.$listeners }}
      >
        {this.$slots.default}
      </thead>
    );
  },
};
