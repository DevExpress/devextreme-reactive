export const TableBody = {
  render() {
    return (
      <tbody
        {...{ attrs: this.$attrs, on: this.$listeners }}
      >
        {this.$slots.default}
      </tbody>
    );
  },
};
