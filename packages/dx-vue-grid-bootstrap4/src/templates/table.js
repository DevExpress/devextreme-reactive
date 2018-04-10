export const Table = {
  render() {
    return (
      <table
        class="table mb-0 w-100"
        style={{
          tableLayout: 'fixed',
        }}
      >
        {this.$slots.default}
      </table>
    );
  },
};
