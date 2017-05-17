# DevExtreme React Grid

- [Overview](#overview)
- [Getting Started](#getting-started)
- [Plugins Overview](#plugin-overview)
- [Controlled and Uncontrolled modes](#controlled-and-uncontrolled-modes)
- [Guides by Features](guides)
- [Plugin Reference](reference)

## Overview

DevExtreme React Grid is a component that displays data from a local or remote source in the form of a grid. It supports paging, sorting, filtering, grouping and other data shaping options, row selection and data editing. Support for controlled and uncontrolled state modes allows you to use Grid in a regular or Redux-based application. The DevExtreme Grid component has a composable and extensible plugin-based architecture and is provided with the Twitter Bootstrap rendering and theming out-of-the-box.

## Getting Started

### Installation

```
npm i @devexpress/dx-react-grid --save
```
This package does not contain visual components. In the examples below, the DevExtreme React Grid Bootstrap3 package is used to render visual components.

Install the Grid Bootstrap3 components package:

```
npm i @devexpress/dx-react-grid-bootstrap3 --save
```

Make sure that Bootstrap styles are linked to the page. If you have not yet configured Bootstrap for your project, check the [following link](http://getbootstrap.com/getting-started/#download).

### Polyfills

React Grid uses the latest standards of the web platform. This means that some old browsers do not support all features of modern ones.

You may need to include ES2015 (ES6) polyfill to support some old browsers like IE11, Android 4.

We recommend to use [BABEL Polyfill](https://babeljs.io/docs/usage/polyfill/). Feel free to use any other alternative.

### Using Grid component

By default, Grid renders nothing. All its functionality is implemented in nested plugin components of the root Grid component. Thus, it is required to specify at least one plugin that visualizes the grid data.

To display the data as a simple table, you can use the TableView plugin as follows:

```js
import {
  Grid
} from '@devexpress/dx-react-grid';
import {
  TableView
} from '@devexpress/dx-react-grid-bootstrap3';

const App = () => (
  <Grid
    rows={[{ id: 0, ... }, ...]}
    columns={[{ name: 'id', ... }, ...]}>
    <TableView />
  </Grid>
);
```

### Try Out React Grid

If you are interested in playing around with React Grid, you can use Plunker. You don't need to install anything. Try to start from [this basic example](http://plnkr.co/edit/Hf3ez8?p=preview).

## Plugin Overview

All the Grid functionality is provided by plugins. We can divide all the plugins into four logical groups:

- **State Management plugins**. Contain a part of the Grid state or obtain it from outside and can change the state in a response to  specified user actions.
- **Data Processing plugins**. Transform data passed to the Grid component before rendering it.
- **UI Plugins**. Render transformed data using the current state and configuration. Also, these plugins can invoke actions provided by the state management plugins to change the Grid state.
- **Core Plugins**. These plugins are the base building blocks for the previous three plugin groups. They can also be used separately in certain customization scenarios.

Note that the plugins are composable and can technically be nested into each other.

Refer to the [Reference](reference) to see the complete plugin list.

### Plugin Order

All Grid plugins consist of core plugins. Each core plugin component has unique behavior. That is why the order of the plugins is important. For example, if data processing is based on some state, it should be linked after an appropriate state plugin. See the following example:


```js
import {
  Grid, FilteringState, LocalFiltering
} from '@devexpress/dx-react-grid'
import {
  TableView
} from '@devexpress/dx-react-grid-bootstrap3';

const App = () => (
  <Grid rows={[...]} columns={[...]}>
    <FilteringState defaultFilters={[...]}/>
    <LocalFiltering/>
    <TableView/>
  </Grid>
);
```

Note that in the previous example, the TableView plugin is linked after the data processing one. The same rule is applied to visualization plugins. See the following example:

```js
import {
  Grid, FilteringState, LocalFiltering
} from '@devexpress/dx-react-grid'
import {
  TableView, TableFilterRow
} from '@devexpress/dx-react-grid-bootstrap3';

const App = () => (
  <Grid rows={[...]} columns={[...]}>
    <FilteringState defaultFilters={[...]}/>
    <LocalFiltering/>
    <TableView/>
    <TableFilterRow filterCellTemplate={...}/>
  </Grid>
);
```

NOTE: Refer to the plugin documentation for information on its requirements.

### UI Plugins

It is required to specify a visual component for this type of plugins. They are not included by default. You can create your own templates based on the plugin specification or use one of the predefined ones:
- DevExtreme React Grid for [Bootstrap 3](http://getbootstrap.com/) (used in examples)
- DevExtreme React Grid for [Material UI](http://www.material-ui.com) (coming soon...)

## <a name="controlled-and-uncontrolled-modes"></a>Controlled (stateless) and Uncontrolled (stateful) modes

Depending on a particular use-case, you may need to control the Grid state yourself or delegate state management to the component. For instance, to persist the Grid sorting configured by an end-user and restore it withing the next app usage session, you need to switch the sorting state to controlled mode. In this case, Grid will accept the sorting configuration via the [SortingState](reference/sorting-state.md) plugin properties and notify you once an end-user has changed the sorting configuration. It's very similar to the [controlled components concept](https://facebook.github.io/react/docs/forms.html#controlled-components).

In your code it will look as follows:

```js
export class MyApp extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [...],
      rows: [...],
      sorting: [{ columnName: 'date', direction: 'desc' }],
    };

    this.changeSorting = sorting => this.setState({ sorting });
  }
  render() {
    const { rows, columns, sorting } = this.state;

    return (
      <Grid rows={rows} columns={columns}>
        <SortingState sorting={sorting} onSortingChange={this.changeSorting} />
        ...
      </Grid>
    );
  }
}
```

So, `sorting` represents the Grid sorting configuration. In turn, the `changeSorting` function is a handler that is invoked every time the sorting configuration changes. Note that all state management plugins work with the serializable state. It means that you can persist and restore it in [localStorage](https://developer.mozilla.org/en/docs/Web/API/Window/localStorage) or any other storage that can store string values. The controlled state mode can also be helpful if you need to indicate the current state in your UI or bind some controls existing outside the Grid. For instance, it's easy to put a ComboBox with available sort orders and let end-users use it for sorting Grid data.

In uncontrolled state mode, the Grid component manages its UI state internally. You do not need to specify the state value and state change handler properties. Yet, you can provide Grid with the initial state value using the property with the `default` prefix. For instance, we can convert the previous example into uncontrolled mode:

```js
  <Grid rows={[...]} columns={[...]}>
    <SortingState />
    ...
  </Grid>
```

If you want to specify the default sorting configuration, it will look as follows:

```js
  <Grid rows={[...]} columns={[...]}>
    <SortingState defaultSorting={[ columnName: 'date', direction: 'desc' ]} />
    ...
  </Grid>
```

Sometimes you may need to control the Grid state partially. For instance, you want to manage filters, but do not wish to manage sorting and grouping. You can configure Grid as follows:

```js
  <Grid rows={[...]} columns={[...]}>
    <FilteringState filters={filters} onFiltersChange={this.changeFilters}/>
    <SortingState />
    <GroupingState />
    ...
  </Grid>
```

Note: If you are using Redux and performing time traveling, the partially controlled state can cause side-effects. In this case, we recommend using the fully-controlled state so the Grid behaves as a stateless component without side-effects.
