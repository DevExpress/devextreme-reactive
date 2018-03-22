export const Table = {
  render() {
    return (
      <table
        class="table mb-0"
        style={{
          tableLayout: 'fixed',
          width: '100%',
        }}
      >
        {this.$slots.default}
      </table>
    );
  },
};
