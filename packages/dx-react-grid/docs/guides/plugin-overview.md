# React Grid - Plugin Overview

Plugins provide all the Grid functionality and can be divided into four logical groups:

- **State Management plugins** control a part of the Grid state internally or provide properties for external state management (see [controlled and uncontrolled modes](controlled-and-uncontrolled-modes.md)).
- **Data Processing plugins** transform data passed to the Grid component before rendering.
- **UI plugins** render the transformed data using the current state and configuration. UI plugins can also invoke actions that state management plugins provide to change the Grid's state. In some cases, UI plugins can control a part of the Grid state by themselves, taking the job of State Management plugins.
- **Core plugins** are the base building blocks for the first three groups. These plugins can also be used separately in certain scenarios.

Note that the plugins are composable and can be nested into each other.

Refer to the [Reference](../../reference) to see the complete plugin list.

## Plugin Order

The plugin order is important. Plugins implementing an interface should be linked before the plugin that uses it. For example, a data processing plugin is based on some state. Thus, it should follow the appropriate state plugin:

```js
import {
  FilteringState, LocalFiltering
} from '@devexpress/dx-react-grid'
import {
  Grid, TableView
} from '@devexpress/dx-react-grid-bootstrap3'/* or '@devexpress/dx-react-grid-material-ui' */;

const App = () => (
  <Grid rows={[/* ... */]} columns={[/* ... */]}>
    <FilteringState defaultFilters={[/* ... */]}/>
    <LocalFiltering/>
    <TableView/>
  </Grid>
);
```

Some visualization plugins extend the `TableView`'s functionality, and they should follow it in the code as demonstrated in the following example:

```js
import {
  FilteringState, LocalFiltering
} from '@devexpress/dx-react-grid'
import {
  Grid, TableView, TableFilterRow
} from '@devexpress/dx-react-grid-bootstrap3'/* or '@devexpress/dx-react-grid-material-ui' */;

const App = () => (
  <Grid rows={[/* ... */]} columns={[/* ... */]}>
    <FilteringState defaultFilters={[/* ... */]}/>
    <LocalFiltering/>
    <TableView/>
    <TableFilterRow filterCellTemplate={ /* ... */ }/>
  </Grid>
);
```

NOTE: Refer to the plugin's reference for information on its dependencies.

The order of data processing plugins is also important because they transform data in the same order they appear in the code. For example, if the `LocalPaging` plugin precedes the `LocalFiltering`, the Grid filters the current page data. Swap the plugins to paginate filtered data.

## UI Plugins

The Grid's UI plugins use templates to render the UI. A template is a function that returns a [ReactElement](https://facebook.github.io/react/docs/react-api.html#createelement) depending on the argument values. You can implement your templates or use one of the predefined template suites:
- [DevExtreme React Grid for Bootstrap 3](https://github.com/DevExpress/devextreme-reactive/tree/master/packages/dx-react-grid-bootstrap3/) - renders the Grid's UI elements based on the [Bootstrap 3](http://getbootstrap.com/) components
- [DevExtreme React Grid for Material UI](https://github.com/DevExpress/devextreme-reactive/tree/master/packages/dx-react-grid-material-ui) - renders the Grid's UI elements based on the [Material UI](http://www.material-ui.com) components
