import { Grid, Table } from '@devexpress/dx-vue-grid-bootstrap4';

export default {
  render() {
    return (
      <Grid
        // rootComponent={{
        //   render() {
        //     return (<Grid.Root class="a">{this.$slots.default}</Grid.Root>);
        //   },
        // }}
        rows={[
          { id: 0, product: 'DevExtreme', owner: 'DevExpress' },
          { id: 1, product: 'DevExtreme Reactive', owner: 'DevExpress' },
        ]}
        columns={[
          { name: 'id', title: 'ID' },
          { name: 'product', title: 'Product' },
          { name: 'owner', title: 'Owner' },
        ]}
      >
        <Table />
      </Grid>
    );
  },
};
