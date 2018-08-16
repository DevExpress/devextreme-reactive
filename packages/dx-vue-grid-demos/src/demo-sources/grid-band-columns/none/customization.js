import { DxDataTypeProvider } from '@devexpress/dx-vue-grid';
import {
  DxGrid,
  DxTable,
  DxTableHeaderRow,
  DxTableBandHeader,
} from '@devexpress/dx-vue-grid-bootstrap4';
import { countries } from '../countries';

const PercentFormatter = {
  props: ['value'],
  template: `
    <span>{{value}}%</span>
  `,
};

const PercentTypeProvider = {
  template: `
    <dx-data-type-provider
      :formatterComponent="$options.components.PercentFormatter"
      :for="$attrs.for"
    />
  `,
  components: {
    DxDataTypeProvider,
    PercentFormatter,
  },
};

const BandCell = {
  inheritAttrs: false,
  props: ['column'],
  data() {
    const { title } = this.column;
    let icon = 0;
    if (title === 'Population') icon = 'person';
    if (title === 'Nominal GDP') icon = 'bar-chart';
    if (title === 'By Sector') icon = 'globe';
    return { icon };
  },
  template: `
    <dx-cell
      v-bind="$attrs"
      v-on="$listeners"
      class="text-secondary"
    >
      <slot />
      <span :class="\`ml-2 oi oi-\${icon}\`"></span>
    </dx-cell>
  `,
  components: {
    DxCell: DxTableBandHeader.components.DxCell,
  },
};

const HeaderCell = {
  inheritAttrs: false,
  template: `
    <dx-header-cell
      v-bind="$attrs"
      v-on="$listeners"
      class="text-info"
    />
  `,
  components: {
    DxHeaderCell: DxTableHeaderRow.components.DxCell,
  },
};

export default {
  data() {
    return {
      columns: [
        { name: 'Country', title: 'Country' },
        { name: 'Area', title: 'Area, sq. km.' },
        { name: 'Population_Total', title: 'Total' },
        { name: 'Population_Urban', title: 'Urban' },
        { name: 'GDP_Total', title: 'Total, min $' },
        { name: 'GDP_Industry', title: 'Industry' },
        { name: 'GDP_Services', title: 'Services' },
        { name: 'GDP_Agriculture', title: 'Agriculture' },
      ],
      columnBands: [
        {
          title: 'Population',
          children: [
            { columnName: 'Population_Total' },
            { columnName: 'Population_Urban' },
          ],
        },
        {
          title: 'Nominal GDP',
          children: [
            { columnName: 'GDP_Total' },
            {
              title: 'By Sector',
              children: [
                { columnName: 'GDP_Agriculture' },
                { columnName: 'GDP_Industry' },
                { columnName: 'GDP_Services' },
              ],
            },
          ],
        },
      ],
      tableColumnExtensions: [
        { columnName: 'Area', width: 125, align: 'right' },
        { columnName: 'Population_Total', width: 110, align: 'right' },
        { columnName: 'Population_Urban', width: 75, align: 'right' },
        { columnName: 'GDP_Total', width: 115, align: 'right' },
        { columnName: 'GDP_Industry', width: 90, align: 'right' },
        { columnName: 'GDP_Services', width: 90, align: 'right' },
        { columnName: 'GDP_Agriculture', width: 110, align: 'right' },
      ],
      percentColumns: ['GDP_Industry', 'GDP_Services', 'GDP_Agriculture', 'Population_Urban'],
      rows: countries,
    };
  },
  template: `
    <div class="card">
      <dx-grid
        :rows="rows"
        :columns="columns"
      >
        <percent-type-provider
          :for="percentColumns"
        />
        <dx-table
          :columnExtensions="tableColumnExtensions"
        />
        <dx-table-header-row
          :cellComponent="$options.components.HeaderCell"
        />
        <dx-table-band-header
          :columnBands="columnBands"
          :cellComponent="$options.components.BandCell"
        />
      </dx-grid>
    </div>
  `,
  components: {
    DxGrid,
    DxTable,
    DxTableHeaderRow,
    DxTableBandHeader,
    PercentTypeProvider,
    BandCell,
    HeaderCell,
  },
};
