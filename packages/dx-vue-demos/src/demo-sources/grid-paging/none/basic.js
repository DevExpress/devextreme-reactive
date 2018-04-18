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
      currentPage: 0,
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
            currentPage$sync={this.currentPage}
            pageSize={this.pageSize}
          />

          <IntegratedPaging />
          <Table />
          <TableHeaderRow />
          <PagingPanel />
        </Grid>
      </div>
    );
  },
};
