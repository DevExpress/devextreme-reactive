import {
  DxEditingState,
  DxSortingState,
  DxPagingState,
  DxIntegratedSorting,
  DxIntegratedPaging,
} from '@devexpress/dx-vue-grid';

import {
  DxGrid,
  DxTable,
  DxTableHeaderRow,
  DxTableEditColumn,
  DxTableEditRow,
  DxPagingPanel,
} from '@devexpress/dx-vue-grid-bootstrap4';

import {
  generateRows,
  globalSalesValues,
} from '../../../demo-data/generator';

import { ProgressBarCell } from '../../../theme-sources/none/components/progress-bar-cell';
import { HighlightedCell } from '../../../theme-sources/none/components/highlighted-cell';
import { CurrencyTypeProvider } from '../../../theme-sources/none/components/currency-type-provider';
import { PercentTypeProvider } from '../../../theme-sources/none/components/percent-type-provider';

const MyCommandButton = {
  props: ['icon', 'text', 'hint', 'color'],
  template: `
    <button
      class="btn btn-link"
      style="padding: 11px"
      @click="(e) => {
        this.$emit('execute');
        e.stopPropagation();
      }"
      :title="hint"
    >
      <span :class="color || ''">
        <i v-if="icon" :class="\`oi oi-\${icon}\`" :style="{ marginRight: text ? '5px' : 0 }" />
        {{text}}
      </span>
    </button>
  `,
};

const MyCommand = {
  props: ['id'],
  data() {
    return {
      commandComponentProps: {
        add: {
          icon: 'plus',
          hint: 'Create new row',
        },
        edit: {
          icon: 'pencil',
          hint: 'Edit row',
          color: 'text-warning',
        },
        delete: {
          icon: 'trash',
          hint: 'Delete row',
          color: 'text-danger',
        },
        commit: {
          icon: 'check',
          hint: 'Save changes',
          color: 'text-success',
        },
        cancel: {
          icon: 'x',
          hint: 'Cancel changes',
          color: 'text-danger',
        },
      },
    };
  },
  template: `
    <my-command-button
      v-bind="commandComponentProps[id]"
      v-on="$listeners"
    />
  `,
  components: {
    MyCommandButton,
  },
};

const availableValues = {
  product: globalSalesValues.product,
  region: globalSalesValues.region,
  customer: globalSalesValues.customer,
};

const MyCell = {
  inheritAttrs: false,
  props: ['column'],
  data() {
    const componentIds = {
      discount: 'progress-bar-cell',
      amount: 'highlighted-cell',
    };
    return {
      componentId: componentIds[this.column.name] || 'dx-cell',
    };
  },
  template: `
    <component
      :is="componentId"
      :column="column"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <slot />
    </component>
  `,
  components: {
    DxCell: DxTable.components.DxCell,
    ProgressBarCell,
    HighlightedCell,
  },
};

const MyLookupEditCell = {
  inheritAttrs: false,
  props: ['column', 'availableColumnValues', 'value'],
  template: `
    <td
      style="verticalAlign: middle; padding: 1px;"
    >
      <select
        class="form-control"
        :style="{ width: '100%', textAlign: column.align }"
        :value="value"
        @change="e => this.$emit('valueChange', e.target.value)"
      >
        <option v-for="item in availableColumnValues" :key="item" :value="item">
          {{ item }}
        </option>
      </select>
    </td>
  `,
};

const MyEditCell = {
  inheritAttrs: false,
  props: ['column'],
  created() {
    this.availableValues = availableValues;
  },
  data() {
    return {
      componentId: availableValues[this.column.name] ? 'my-lookup-edit-cell' : 'dx-cell',
    };
  },
  template: `
    <component
      :is="componentId"
      :column="column"
      :availableColumnValues="availableValues[column.name]"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <slot />
    </component>
  `,
  components: {
    DxCell: DxTableEditRow.components.DxCell,
    MyLookupEditCell,
  },
};

export default {
  data() {
    return {
      columns: [
        { name: 'product', title: 'Product' },
        { name: 'amount', title: 'Sale Amount' },
        { name: 'discount', title: 'Discount' },
        { name: 'saleDate', title: 'Sale Date' },
        { name: 'customer', title: 'Customer' },
      ],
      tableColumnExtensions: [
        { columnName: 'amount', align: 'right', width: 150 },
        { columnName: 'discount', width: 110 },
      ],
      rows: generateRows({
        columnValues: { id: ({ index }) => index, ...globalSalesValues },
        length: 12,
      }),
      sorting: [],
      editingRowIds: [],
      addedRows: [],
      rowChanges: {},
      deletedRowIds: [],
      currentPage: 0,
      pageSize: 0,
      pageSizes: [5, 10, 0],
      currencyColumns: ['amount'],
      percentColumns: ['discount'],
    };
  },
  methods: {
    updateAddedRows(addedRows) {
      this.addedRows = addedRows.map(row => (Object.keys(row).length ? row : {
        amount: 0,
        discount: 0,
        saleDate: new Date().toISOString().split('T')[0],
        product: availableValues.product[0],
        region: availableValues.region[0],
        customer: availableValues.customer[0],
      }));
    },
    getRowId(row) {
      return row.id;
    },
    commitChanges({ added, changed, deleted }) {
      let { rows } = this;
      if (added) {
        const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
        rows = [
          ...rows,
          ...added.map((row, index) => ({
            id: startingAddedId + index,
            ...row,
          })),
        ];
      }
      if (changed) {
        rows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
      }
      if (deleted) {
        const deletedSet = new Set(deleted);
        rows = rows.filter(row => !deletedSet.has(row.id));
      }
      this.rows = rows;
    },
  },
  template: `
    <div class="card">
      <dx-grid
        :rows="rows"
        :columns="columns"
        :getRowId="getRowId"
      >
        <percent-type-provider
          :for="percentColumns"
        />
        <currency-type-provider
          :for="currencyColumns"
        />
        <dx-editing-state
          :addedRows="addedRows"
          @update:addedRows="updateAddedRows"
          :rowChanges.sync="rowChanges"
          :deletedRowIds.sync="deletedRowIds"
          :editingRowIds.sync="editingRowIds"
          @commitChanges="commitChanges"
        />
        <dx-sorting-state
          :sorting.sync="sorting"
        />
        <dx-paging-state
          :pageSize.sync="pageSize"
          :currentPage.sync="currentPage"
        />
        <dx-integrated-sorting />
        <dx-integrated-paging />
        <dx-table
          :columnExtensions="tableColumnExtensions"
          :cellComponent="$options.components.MyCell"
        />
        <dx-table-header-row
          showSortingControls
        />
        <dx-table-edit-row
          :cellComponent="$options.components.MyEditCell"
        />
        <dx-table-edit-column
          :width="100"
          :showAddCommand="!addedRows.length"
          showEditCommand
          showDeleteCommand
          :commandComponent="$options.components.MyCommand"
        />
        <dx-paging-panel
          :pageSizes="pageSizes"
        />
      </dx-grid>
    </div>
  `,
  components: {
    DxEditingState,
    DxSortingState,
    DxPagingState,
    DxIntegratedSorting,
    DxIntegratedPaging,
    DxGrid,
    DxTable,
    DxTableHeaderRow,
    DxTableEditColumn,
    DxTableEditRow,
    DxPagingPanel,
    MyCommand,
    MyCell,
    MyEditCell,
    CurrencyTypeProvider,
    PercentTypeProvider,
  },
};
