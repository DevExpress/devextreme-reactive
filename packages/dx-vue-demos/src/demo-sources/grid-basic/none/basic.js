import { Grid, Table, TableHeaderRow } from '@devexpress/dx-vue-grid-bootstrap4';

import {
  generateRows,
  globalSalesValues,
} from '../../../demo-data/generator';

export default {
  render() {
    return (
      <div class="card">
        <Grid
          rows={generateRows({ columnValues: globalSalesValues, length: 8 })}
          columns={[
            { name: 'region', title: 'Region' },
            { name: 'sector', title: 'Sector' },
            { name: 'channel', title: 'Channel' },
            { name: 'customer', title: 'Customer' },
            { name: 'product', title: 'Product' },
            { name: 'amount', title: 'Sale Amount' },
          ]}
        >
          <Table />
          <TableHeaderRow />
        </Grid>
      </div>
    );
  },
};
