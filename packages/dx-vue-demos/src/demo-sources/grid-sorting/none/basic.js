import {
  SortingState,
  IntegratedSorting,
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
      sorting: [],
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
          <SortingState
            sorting$sync={this.sorting}
          />
          <PagingState
            pageSize={5}
          />

          <IntegratedPaging />
          <IntegratedSorting />
          <Table />
          <TableHeaderRow showSortingControls />
          <PagingPanel
            pageSizes={[5, 10]}
          />
        </Grid>
      </div>
    );
  },
};
