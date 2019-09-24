import {
  DxFilteringState,
  DxIntegratedFiltering,
} from '@devexpress/dx-vue-grid';
import {
  DxGrid,
  DxTable,
  DxTableHeaderRow,
  DxTableFilterRow,
} from '@devexpress/dx-vue-grid-bootstrap4';

import { generateRows } from '../../../demo-data/generator';

const toLowerCase = value => String(value).toLowerCase();
const cityPredicate = (value, filter) => toLowerCase(value).startsWith(toLowerCase(filter.value));

export default {
  data() {
    return {
      filters: [],
      columns: [
        { name: 'name', title: 'Name' },
        { name: 'gender', title: 'Gender' },
        { name: 'city', title: 'City' },
        { name: 'car', title: 'Car' },
      ],
      integratedFilteringColumnExtensions: [
        { columnName: 'city', predicate: cityPredicate },
      ],
      rows: generateRows({ length: 8 }),
    };
  },
  template: `
    <div class="card">
      <dx-grid
        :rows="rows"
        :columns="columns"
      >
        <dx-filtering-state
          :filters.sync="filters"
        />
        <dx-integrated-filtering
          :columnExtensions="integratedFilteringColumnExtensions"
        />
        <dx-table />
        <dx-table-header-row />
        <dx-table-filter-row />
      </dx-grid>
    </div>
  `,
  components: {
    DxFilteringState,
    DxIntegratedFiltering,
    DxGrid,
    DxTable,
    DxTableHeaderRow,
    DxTableFilterRow,
  },
};
