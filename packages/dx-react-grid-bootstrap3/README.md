# DevExtreme React Grid Bootstrap3

A template suite used to customize React Grid with the Bootstrap3 rendering.

## Installation

Install the package and its dependencies:

```
npm i @devexpress/dx-react-grid --save
npm i @devexpress/dx-react-grid-bootstrap3 --save
```

Add the required modules to your project:

```js
import {
  Grid, TableView
} from '@devexpress/dx-react-grid-bootstrap3';

export const App = () => (
  <Grid
    rows={[{ id: 0, ... }, ...]}
    columns={[{ name: 'id', ... }, ...]}>
    <TableView />
  </Grid>
);
```

Make sure that Bootstrap styles are linked to the page. If you have not yet configured Bootstrap for your project, check the [following link](http://getbootstrap.com/getting-started/#download).

## Getting started

This package provides templates implementing Bootstrap 3 rendering for the React Grid UI plugins and the UI Plugins with injected templates as well. For your convenience, these templates can be used instead of the ones contained in the original React Grid repository.

See [demos](https://devexpress.github.io/devextreme-reactive/react/grid/demos/) for more information.

## Reference

The package exposes plugins with injected templates. Here is the list of the plugins:

- [TableView](https://devexpress.github.io/devextreme-reactive/react/grid/docs/reference/table-view/)
- [TableHeaderRow](https://devexpress.github.io/devextreme-reactive/react/grid/docs/reference/table-header-row/)
- [TableSelection](https://devexpress.github.io/devextreme-reactive/react/grid/docs/reference/table-selection/)
- [TableFilterRow](https://devexpress.github.io/devextreme-reactive/react/grid/docs/reference/table-filter-row/)
- [TableRowDetail](https://devexpress.github.io/devextreme-reactive/react/grid/docs/reference/table-row-detail/)
- [TableGroupRow](https://devexpress.github.io/devextreme-reactive/react/grid/docs/reference/table-group-row/)
- [GroupingPanel](https://devexpress.github.io/devextreme-reactive/react/grid/docs/reference/grouping-panel/)
- [PagingPanel](https://devexpress.github.io/devextreme-reactive/react/grid/docs/reference/paging-panel/)

Each plugin has properties with the 'Template' postfix. Components passed to such properties are templates.

Templates can be overridden by passing your own component or rendering function. If you want to render a UI item with a built-in template, you can return `undefined` from your custom template.

## License

[DevExtreme licensing](https://js.devexpress.com/licensing/).
