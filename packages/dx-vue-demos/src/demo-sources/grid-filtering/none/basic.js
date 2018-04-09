import {
  FilteringState,
  IntegratedFiltering,
} from '@devexpress/dx-vue-grid';
import { Grid, Table, TableHeaderRow, TableFilterRow } from '@devexpress/dx-vue-grid-bootstrap4';

export default {
  data() {
    return ({ filters: [] });
  },
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
          <FilteringState filters$sync={this.filters} />
          <IntegratedFiltering />

          <Table />
          <TableHeaderRow />
          <TableFilterRow />
        </Grid>
      </div>
    );
  },
};
