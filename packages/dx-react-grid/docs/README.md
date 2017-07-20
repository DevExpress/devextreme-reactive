# DevExtreme React Grid

- [Overview](#overview)
- [Getting Started](#getting-started)
- [Plugins Overview](#plugin-overview)
- [Controlled and Uncontrolled modes](#controlled-and-uncontrolled-modes)
- [Guides by Features](guides)
- [Plugin Reference](reference)

## Overview

DevExtreme React Grid is a component that displays data from a local or remote source in the form of a grid. It supports paging, sorting, filtering, grouping and other data shaping options, row selection, and data editing. Support for controlled and uncontrolled state modes allows you to use the Grid in a regular or Redux-based application. The DevExtreme Grid component has a composable and extendable plugin-based architecture and is provided with Twitter Bootstrap rendering and theming out of the box.

## Getting Started

### Installation

Install this package with its dependencies using the following command:

```
npm i --save @devexpress/dx-react-core @devexpress/dx-react-grid
```

This package does not contain visual components. In the examples below, visual components are rendered using the Bootstrap 3 package. However, you can use any of the following ones:

- Bootstrap 3

  ```
  npm i --save @devexpress/dx-react-grid-bootstrap3
  ```

   Make sure that the [React-Boostrap](https://react-bootstrap.github.io) dependencies are installed and configured. Check the [following link](https://react-bootstrap.github.io/getting-started.html) if you have not configured the React-Bootstrap yet.

- Material UI

  ```
  npm i --save @devexpress/dx-react-grid-material-ui
  ```

  Make sure that [Material UI](https://material-ui-1dab0.firebaseapp.com/) dependencies are installed and configured. Check the Material UI's [Getting Started](https://material-ui-1dab0.firebaseapp.com/getting-started/installation) article  for configuration details.

### Polyfills

React Grid uses the latest web platform standards. This means that older browsers might not support all the modern features.

You may need to include ES2015 (ES6) polyfill to support browsers like IE11 and Android 4.

We recommend [BABEL Polyfill](https://babeljs.io/docs/usage/polyfill/), but you can use an alternative.

### Using Grid component

The Grid renders nothing by default. The root Grid component's nested plugin components implement its functionality, and it is necessary to specify at least one plugin that visualizes the grid data.

Use the TableView plugin to display the data as a simple table:

```js
import {
  Grid, TableView, TableHeaderRow
} from '@devexpress/dx-react-grid-bootstrap3'/* or '@devexpress/dx-react-grid-material-ui' */;

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

### Try Out React Grid

You can use the following links if you are interested in trying out the React Grid:
- [WebpackBin for Bootstrap3](https://www.webpackbin.com/bins/-KoCcFwPPtps5fEN0PkI)
- [WebpackBin for Material UI](https://www.webpackbin.com/bins/-KoCeS-_jZrZuTecv-wd)

## Plugin Overview

Plugins provide all the Grid functionality and can be divided into four logical groups:

- **State Management plugins**. Contain a part of the Grid state or obtain it from outside and can change the state in response to  specified user actions.
- **Data Processing plugins**. Transform data passed to the Grid component before rendering it.
- **UI Plugins**. Render transformed data using the current state and configuration. Also, these plugins can invoke actions the state management plugins provide to change the Grid state.
- **Core Plugins**. These plugins are the base building blocks for the previous three plugin groups. They can also be used separately in certain customization scenarios.

Note that the plugins are composable and can be nested into each other.

Refer to the [Reference](reference) to see the complete plugin list.

### Plugin Order

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

### UI Plugins

It is required to specify a visual component for this type of plugins (not included by default). You can create your templates based on the plugin specification or use one of the predefined ones:
- DevExtreme React Grid for [Bootstrap 3](http://getbootstrap.com/) (used in examples)
- DevExtreme React Grid for [Material UI](http://www.material-ui.com) (used in examples as an alternative)

## <a name="controlled-and-uncontrolled-modes"></a>Controlled (stateless) and Uncontrolled (stateful) modes

You may need to control the Grid state or delegate state management to a component, for instance, when switching the sorting state to the controlled mode to persist the Grid sorting an end-user configured and restoring it within the next app usage session. In this case, the Grid accepts the sorting configuration via the [SortingState](reference/sorting-state.md) plugin properties and notifies you once an end-user has changed the sorting configuration, similar to the [controlled components concept](https://facebook.github.io/react/docs/forms.html#controlled-components).

In your code, it looks as follows:

```js
export class MyApp extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [/* ... */],
      rows: [/* ... */],
      sorting: [{ columnName: 'date', direction: 'desc' }],
    };

    this.changeSorting = sorting => this.setState({ sorting });
  }
  render() {
    const { rows, columns, sorting } = this.state;

    return (
      <Grid rows={rows} columns={columns}>
        <SortingState sorting={sorting} onSortingChange={this.changeSorting} />
        { /* ... */ }
      </Grid>
    );
  }
}
```

`Sorting` represents the Grid sorting configuration, and the `changeSorting` function is a handler that is invoked every time the sorting configuration changes. Note that all the state management plugins work with the serializable state. This means that you can persist and restore it in [localStorage](https://developer.mozilla.org/en/docs/Web/API/Window/localStorage) or any other storage that can store string values. The controlled state mode can also be helpful if you need to indicate the current state in your UI or bind controls existing outside the Grid, for example, to put a ComboBox with the available sort orders and let end-users use it for sorting Grid data.

In the uncontrolled state mode, the Grid component manages its UI state internally. It is not necessary to specify the state value and state change handler properties. You can provide Grid with the initial state value using the property with the `default` prefix, for instance, converting the previous example into the uncontrolled mode:

```js
<Grid rows={[/* ... */]} columns={[/* ... */]}>
  <SortingState />
  { /* ... */ }
</Grid>
```

Specify the default sorting configuration as follows:

```js
<Grid rows={[/* ... */]} columns={[/* ... */]}>
  <SortingState defaultSorting={[ columnName: 'date', direction: 'desc' ]} />
  { /* ... */ }
</Grid>
```

You can configure the Grid when you need to control its state partially, for example, to manage filters without managing sorting and grouping:

```js
<Grid rows={[/* ... */]} columns={[/* ... */]}>
  <FilteringState filters={filters} onFiltersChange={this.changeFilters}/>
  <SortingState />
  <GroupingState />
  { /* ... */ }
</Grid>
```

Note: We recommend using the fully-controlled state to avoid the side-effects the partially controlled state can cause when using Redux and performing time traveling.
