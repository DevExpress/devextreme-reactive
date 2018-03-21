export const Table = {
  render() {
    return (
      <table
        class="table"
        style={{
          tableLayout: 'fixed',
        }}
      >
        {this.$slots.default}
      </table>
    );
  },
};
