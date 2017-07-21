# DevExtreme React Grid Bootstrap3

A template suite used to customize the React Grid with Bootstrap3 rendering.

## Installation

Install the main dx-react-grid package with its dependencies and templates for Bootstrap 3:

```
npm i --save @devexpress/dx-react-core @devexpress/dx-react-grid @devexpress/dx-react-grid-bootstrap3
```

Add the required modules to your project:

```js
import {
  Grid, TableView, TableHeaderRow
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
    <TableView />
    <TableHeaderRow />
  </Grid>
);
```

Make sure that [React-Boostrap](https://react-bootstrap.github.io) dependencies are installed and configured. Check the React-Bootstrap's [Getting Started](https://react-bootstrap.github.io/getting-started.html) article for configuration details. 

## Getting started

This package provides components and plugins implementing Bootstrap 3 rendering for the React Grid, which you can use instead of the ones provided by the original React Grid package.

See [demos](https://devexpress.github.io/devextreme-reactive/react/grid/demos/) for more information.

## Reference

The package exposes components and plugins with injected templates.

Components:

- [Grid](https://devexpress.github.io/devextreme-reactive/react/grid/docs/reference/grid/)

Plugins:

- [TableView](https://devexpress.github.io/devextreme-reactive/react/grid/docs/reference/table-view/)
- [TableHeaderRow](https://devexpress.github.io/devextreme-reactive/react/grid/docs/reference/table-header-row/)
- [TableSelection](https://devexpress.github.io/devextreme-reactive/react/grid/docs/reference/table-selection/)
- [TableFilterRow](https://devexpress.github.io/devextreme-reactive/react/grid/docs/reference/table-filter-row/)
- [TableRowDetail](https://devexpress.github.io/devextreme-reactive/react/grid/docs/reference/table-row-detail/)
- [TableGroupRow](https://devexpress.github.io/devextreme-reactive/react/grid/docs/reference/table-group-row/)
- [GroupingPanel](https://devexpress.github.io/devextreme-reactive/react/grid/docs/reference/grouping-panel/)
- [PagingPanel](https://devexpress.github.io/devextreme-reactive/react/grid/docs/reference/paging-panel/)
- [DragDropContext](https://devexpress.github.io/devextreme-reactive/react/grid/docs/reference/drag-drop-context/)

Each plugin has properties with the 'Template' postfix. Components passed to such properties are templates.

You can override templates by passing your component or rendering function, or return `undefined` from your custom template to render a UI item with a built-in template.

## License

[DevExtreme licensing](https://js.devexpress.com/licensing/).
