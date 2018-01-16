# DevExtreme React Grid Bootstrap3

A template suite used to render the React Grid based on Bootstrap 3 components.

## Installation

Install the main dx-react-grid package with its dependencies and Bootstrap 3 templates:

```
npm i --save @devexpress/dx-react-core @devexpress/dx-react-grid @devexpress/dx-react-grid-bootstrap3
```

Add the required modules to your project:

```jsx
import {
  Grid, Table, TableHeaderRow
} from '@devexpress/dx-react-grid-bootstrap3';

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

Make sure that [React-Boostrap](https://react-bootstrap.github.io) dependencies are installed and properly configured. Check the React-Bootstrap's [Getting Started](https://react-bootstrap.github.io/getting-started.html) article for configuration details.

## Getting started

This package provides components and plugins implementing Bootstrap 3 rendering for the React Grid, which you can use instead of the original React Grid package ones.

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
