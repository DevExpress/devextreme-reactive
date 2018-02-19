# DevExtreme React Grid Bootstrap4

A template suite used to render the React Grid based on Bootstrap 4 components.

## Installation

Install the main dx-react-grid package with its dependencies and Bootstrap 4 templates:

```
npm i --save @devexpress/dx-react-core @devexpress/dx-react-grid @devexpress/dx-react-grid-bootstrap4
```

Add the DevExtreme React Grid styles to your index.html file or import CSS to root .js file

```html
<link rel="stylesheet" type="text/css" href="node_modules/@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css" />
```

```js
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';
```

NOTE: The DevExtreme React Grid does not include Bootstrap CSS so this needs to be installed as well.

Add the required modules to your project:

```jsx
import {
  Grid, Table, TableHeaderRow
} from '@devexpress/dx-react-grid-bootstrap4';

const App = () => (
  <Grid
    rows={[
      { id: 0, product: 'DevExtreme', owner: 'DevExpress' },
      { id: 1, product: 'DevExtreme Reactive', owner: 'DevExpress' },
    ]}
    columns={[
      { name: 'id', title: 'ID' },
      { name: 'product', title: 'Product' },
      { name: 'owner', title: 'Owner' },
    ]}>
    <Table />
    <TableHeaderRow />
  </Grid>
);
```

Make sure that [reactstrap](https://reactstrap.github.io/) dependencies are installed and properly configured. Check the reactstrap's [Getting Started](https://reactstrap.github.io/) article for configuration details.

## Getting started

This package provides components and plugins implementing Bootstrap 4 rendering for the React Grid, which you can use instead of the original React Grid package ones.

See [demos](https://devexpress.github.io/devextreme-reactive/react/grid/demos/) for more information.

## Reference

The package exposes components and plugins with injected template components.

Components:

- [Grid](https://devexpress.github.io/devextreme-reactive/react/grid/docs/reference/grid/)

Plugins:

- [DragDropProvider](https://devexpress.github.io/devextreme-reactive/react/grid/docs/reference/drag-drop-provider/)
- [GroupingPanel](https://devexpress.github.io/devextreme-reactive/react/grid/docs/reference/grouping-panel/)
- [ColumnChooser](https://devexpress.github.io/devextreme-reactive/react/grid/docs/reference/column-chooser/)
- [PagingPanel](https://devexpress.github.io/devextreme-reactive/react/grid/docs/reference/paging-panel/)
- [Table](https://devexpress.github.io/devextreme-reactive/react/grid/docs/reference/table/)
- [TableColumnResizing](https://devexpress.github.io/devextreme-reactive/react/grid/docs/reference/table-column-resizing/)
- [TableColumnReordering](https://devexpress.github.io/devextreme-reactive/react/grid/docs/reference/table-column-reordering/)
- [TableColumnVisibility](https://devexpress.github.io/devextreme-reactive/react/grid/docs/reference/table-column-visibility/)
- [TableEditColumn](https://devexpress.github.io/devextreme-reactive/react/grid/docs/reference/table-edit-column/)
- [TableEditRow](https://devexpress.github.io/devextreme-reactive/react/grid/docs/reference/table-edit-row/)
- [TableFilterRow](https://devexpress.github.io/devextreme-reactive/react/grid/docs/reference/table-filter-row/)
- [TableGroupRow](https://devexpress.github.io/devextreme-reactive/react/grid/docs/reference/table-group-row/)
- [TableHeaderRow](https://devexpress.github.io/devextreme-reactive/react/grid/docs/reference/table-header-row/)
- [TableRowDetail](https://devexpress.github.io/devextreme-reactive/react/grid/docs/reference/table-row-detail/)
- [TableSelection](https://devexpress.github.io/devextreme-reactive/react/grid/docs/reference/table-selection/)
- [Toolbar](https://devexpress.github.io/devextreme-reactive/react/grid/docs/reference/toolbar/)
- [VirtualTable](https://devexpress.github.io/devextreme-reactive/react/grid/docs/reference/virtual-table/)

## License

[DevExtreme licensing](https://js.devexpress.com/licensing/).
