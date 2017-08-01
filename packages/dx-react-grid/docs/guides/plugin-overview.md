# React Grid - Plugin Overview

Plugins provide all the Grid functionality and can be divided into four logical groups:

- **State Management plugins**. Contain a part of the Grid state or obtain it from outside and can change the state in response to  specified user actions.
- **Data Processing plugins**. Transform data passed to the Grid component before rendering it.
- **UI Plugins**. Render transformed data using the current state and configuration. Also, these plugins can invoke actions the state management plugins provide to change the Grid state.
- **Core Plugins**. These plugins are the base building blocks for the previous three plugin groups. They can also be used separately in certain customization scenarios.

Note that the plugins are composable and can be nested into each other.

Refer to the [Reference](../reference) to see the complete plugin list.

## Plugin Order

The plugins' order is important because all Grid plugins consist of core plugins, each of which has a unique behavior. For example, if data processing is based on some state, it should be linked after an appropriate state plugin:


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

Note that in the previous example, the TableView plugin is linked after the data processing one. The same rule applies to visualization plugins:

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

NOTE: Refer to the plugin documentation for information on its requirements.

## UI Plugins

It is required to specify a visual component for this type of plugins (not included by default). You can create your templates based on the plugin specification or use one of the predefined ones:
- DevExtreme React Grid for [Bootstrap 3](http://getbootstrap.com/) (used in examples)
- DevExtreme React Grid for [Material UI](http://www.material-ui.com) (used in examples as an alternative)