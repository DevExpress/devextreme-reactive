import { Grid, Table } from '@devexpress/dx-vue-grid-bootstrap4';

export default {
  render() {
    return (
      <div class="card">
        <Grid
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
      </div>
    );
  },
};
