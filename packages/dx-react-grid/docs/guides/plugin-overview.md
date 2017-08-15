# React Grid - Plugin Overview

Plugins provide all the Grid functionality and can be divided into four logical groups:

- **State Management plugins**. Controls a part of the Grid state internally or provide properties for external state management (see [controlled and uncontrolled modes](controlled-and-uncontrolled-modes.md)).
- **Data Processing plugins**. Transform data passed to the Grid component before rendering.
- **UI Plugins**. Render the transformed data using the current state and configuration. UI plugins can also invoke actions that state management plugins provide to change the Grid's state.
- **Core Plugins**. The base building blocks for the plugins relating to the first three groups. These plugins can also be used separately in certain scenarios.

Note that the plugins are composable and can be nested into each other.

Refer to the [Reference](../reference) to see the complete plugin list.

## Plugin Order

The plugin order is important. A plugin should be linked after the plugins it depends on. For example, a data processing plugin is based on some state. Thus, it should follow the appropriate state plugin:


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

Visualization plugins depend on the `TableView` one. That is why, they should follow it in the code as demonstrated in the following example:

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

NOTE: Refer to the plugin's reference for the information on its dependencies.

## UI Plugins

The Grid's UI plugins use templates to render the UI. A template is a function that returns a [ReactElement](https://facebook.github.io/react/docs/react-api.html#createelement) depending on the argument values. You can implement your own templates or use one of the predefined template suites:
- [DevExtreme React Grid for Bootstrap 3](https://github.com/DevExpress/devextreme-reactive/tree/master/packages/dx-react-grid-bootstrap3/) - renders the Grid's UI elements based on the [Bootstrap 3](http://getbootstrap.com/) components
- [DevExtreme React Grid for Material UI](https://github.com/DevExpress/devextreme-reactive/tree/master/packages/dx-react-grid-material-ui) - renders the Grid's UI elements based on the [Material UI](http://www.material-ui.com) components
