import {
  FilteringState,
  IntegratedFiltering,
} from '@devexpress/dx-vue-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableFilterRow,
} from '@devexpress/dx-vue-grid-bootstrap4';

import { generateRows } from '../../../demo-data/generator';

export default {
  data() {
    return {
      filters: [],
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
