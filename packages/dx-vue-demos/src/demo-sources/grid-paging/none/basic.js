import {
  PagingState,
  IntegratedPaging,
} from '@devexpress/dx-vue-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel,
} from '@devexpress/dx-vue-grid-bootstrap4';

import { generateRows } from '../../../demo-data/generator';

export default {
  data() {
    return {
      pageSize: 5,
    };
  },
  render() {
    return (
      <div class="card">
        <Grid
          rows={generateRows({ length: 8 })}
          columns={[
            { name: 'name', title: 'Name' },
            { name: 'sex', title: 'Sex' },
            { name: 'city', title: 'City' },
            { name: 'car', title: 'Car' },
          ]}
        >
          <PagingState
            pageSize$sync={this.pageSize}
          />

          <IntegratedPaging />
          <Table />
          <TableHeaderRow />
          <PagingPanel
            pageSizes={[5, 10]}
          />
        </Grid>
      </div>
    );
  },
};
