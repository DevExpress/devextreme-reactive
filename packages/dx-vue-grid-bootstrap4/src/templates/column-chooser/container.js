export const Container = {
  render() {
    return (
      <div
        class="py-2"
      >
        {this.$slots.default}
      </div>
    );
  },
};
