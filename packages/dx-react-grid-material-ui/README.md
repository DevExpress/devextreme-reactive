# DevExtreme React Grid Material UI

A template suite used to customize React Grid with the Material UI rendering.

## Installation

Install the package and its dependencies:

```
npm i @devexpress/dx-react-grid --save
npm i @devexpress/dx-react-grid-material-ui --save
```

Add the required modules to your project:

```js
import {
  Grid
} from '@devexpress/dx-react-grid';
import {
  TableView
} from '@devexpress/dx-react-grid-material-ui';

export const App = () => (
  <Grid
    rows={[{ id: 0, ... }, ...]}
    columns={[{ name: 'id', ... }, ...]}>
    <TableView />
  </Grid>
);
```

Make sure that [Material UI](https://material-ui-1dab0.firebaseapp.com/) dependenices are installed and configured. If you have not yet configured Material UI for your project, check the [following link](https://material-ui-1dab0.firebaseapp.com/getting-started/installation).

## Getting started

This package provides templates implementing Material UI rendering for the React Grid UI plugins and the UI Plugins with injected templates as well. You can use these templates instead of the ones in the original React Grid repository.

See [demos](https://devexpress.github.io/devextreme-reactive/react/grid/demos/) for more information.

## Reference

The package exposes components and plugins with injected templates.

The list of components:

- [Grid](https://devexpress.github.io/devextreme-reactive/react/grid/docs/reference/grid/)

The list of plugins:

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

You can override templates by passing your component or rendering function, or return `undefined` from your custom template if you want to render a UI item with a built-in template.

## License

[DevExtreme licensing](https://js.devexpress.com/licensing/).
