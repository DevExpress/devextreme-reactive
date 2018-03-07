# DevExtreme React Grid Bootstrap4

A template suite used to render the React Grid's UI elements based on [Bootstrap 4](http://getbootstrap.com/) components.

## Installation

Install the main dx-react-grid package with its dependencies and Bootstrap 4 templates using the following command:

```
npm i --save @devexpress/dx-react-core @devexpress/dx-react-grid @devexpress/dx-react-grid-bootstrap4
```

Add the DevExtreme React Grid styles in the root .js file:

```js
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';
```

The DevExtreme React Grid also requires adding the [OpenIconic](https://useiconic.com/open) icons to your project.

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

The dx-react-grid-bootstrap4 package provides components and plugins that implement Bootstrap 4 rendering for the React Grid. You can use them instead of the ones the React Grid package provides.

See [demos](https://devexpress.github.io/devextreme-reactive/react/grid/demos/) for more information.

## Reference

The package exposes components and plugins with injected template components.

Components:

- [Grid](https://devexpress.github.io/devextreme-reactive/react/grid/docs/reference/grid/) - the Grid component

Plugins:

- [DragDropProvider](https://devexpress.github.io/devextreme-reactive/react/grid/docs/reference/drag-drop-provider/) - implements the drag-and-drop functionality and visualizes columns that are being dragged
- [GroupingPanel](https://devexpress.github.io/devextreme-reactive/react/grid/docs/reference/grouping-panel/) - renders the Grouping Panel in the Grid’s header
- [ColumnChooser](https://devexpress.github.io/devextreme-reactive/react/grid/docs/reference/column-chooser/) - allows a user to show and hide grid columns at runtime
- [PagingPanel](https://devexpress.github.io/devextreme-reactive/react/grid/docs/reference/paging-panel/) - renders the paging panel
- [Table](https://devexpress.github.io/devextreme-reactive/react/grid/docs/reference/table/) - renders Grid data as a table
- [TableColumnResizing](https://devexpress.github.io/devextreme-reactive/react/grid/docs/reference/table-column-resizing/) - manages table column widths
- [TableColumnReordering](https://devexpress.github.io/devextreme-reactive/react/grid/docs/reference/table-column-reordering/) - manages the displayed columns’ order
- [TableColumnVisibility](https://devexpress.github.io/devextreme-reactive/react/grid/docs/reference/table-column-visibility/) - manages Grid columns’ visibility
- [TableEditColumn](https://devexpress.github.io/devextreme-reactive/react/grid/docs/reference/table-edit-column/) - renders a command column
- [TableEditRow](https://devexpress.github.io/devextreme-reactive/react/grid/docs/reference/table-edit-row/) - renders a row being edited
- [TableFilterRow](https://devexpress.github.io/devextreme-reactive/react/grid/docs/reference/table-filter-row/) - renders a filter row
- [TableGroupRow](https://devexpress.github.io/devextreme-reactive/react/grid/docs/reference/table-group-row/) - renders group rows and enables them to expand and collapse
- [TableHeaderRow](https://devexpress.github.io/devextreme-reactive/react/grid/docs/reference/table-header-row/) - renders the table’s header row
- [TableRowDetail](https://devexpress.github.io/devextreme-reactive/react/grid/docs/reference/table-row-detail/) - renders detail rows
- [TableSelection](https://devexpress.github.io/devextreme-reactive/react/grid/docs/reference/table-selection/) - visualizes table rows’ selection state by rendering selection checkboxes and highlighting the selected rows
- [Toolbar](https://devexpress.github.io/devextreme-reactive/react/grid/docs/reference/toolbar/) - renders the Grid toolbar
- [VirtualTable](https://devexpress.github.io/devextreme-reactive/react/grid/docs/reference/virtual-table/) - renders a scrollable table

## License

[DevExtreme licensing](https://js.devexpress.com/licensing/).
