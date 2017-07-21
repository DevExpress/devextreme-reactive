# DevExtreme React Grid Material UI

A template suite used to customize the React Grid with Material UI rendering.

## Installation

Install the main dx-react-grid package with its Material UI dependencies and templates:

```
npm i --save @devexpress/dx-react-core @devexpress/dx-react-grid @devexpress/dx-react-grid-material-ui
```

Add the required modules to your project:

```js
import {
  Grid, TableView, TableHeaderRow
} from '@devexpress/dx-react-grid-material-ui';

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

Make sure that the [Material UI](https://material-ui-1dab0.firebaseapp.com/) dependenices are installed and configured. Check the [following link](https://material-ui-1dab0.firebaseapp.com/getting-started/installation) if you have not configured the Material UI yet.

## Getting started

This package provides components and plugins implementing Material UI rendering for the React Grid, which you can use instead of the ones provided by the original React Grid package.

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
