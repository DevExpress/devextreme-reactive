```js
import {
  DxGrid,
  DxTable,
  DxTableHeaderRow,
} from '@devexpress/dx-vue-grid-bootstrap4';

const App = {
  data() {
    return {
      columns: [
        { name: 'id', title: 'ID' },
        { name: 'product', title: 'Product' },
        { name: 'owner', title: 'Owner' },
      ],
      rows: [
        { id: 0, product: 'DevExtreme', owner: 'DevExpress' },
        { id: 1, product: 'DevExtreme Reactive', owner: 'DevExpress' },
      ],
    };
  },
  template: `
    <dx-grid
      :rows="rows"
      :columns="columns"
    >
      <dx-table />
      <dx-table-header-row />
    </dx-grid>
  `,
  components: {
    DxGrid,
    DxTable,
    DxTableHeaderRow,
  },
};
```
