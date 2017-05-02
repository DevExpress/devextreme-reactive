# Data Grid for React

Project status: **CTP**

- [Overview](#overview)
- [Getting Started](#getting-started)
- [Plugins Overview](#plugins-overview)
- [Controlled and Uncontrolled modes](#controlled-and-uncontrolled-modes)
- [Guides by Features](guides)
- [Plugin Reference](reference)

## Overview

DevExtreme React DataGrid component allows to display table data with a set of different transformations such as paging, sorting, filtering, grouping and others. It also allows provides row selection and data editing. It has composable and extensible plugin-based architecture. It supports controlled and uncontrolled state modes and can be easily used in either a regular or a Redux-based application. It's provided with the Twitter Bootstrap rendering and theming out-of-the-box.

## Getting Started

### Installation

```
npm i @devexpress/dx-react-datagrid --save
```

This package does not contain any visual components, so all examples provided below use [DevExtreme React DataGrid Bootstrap3](../dx-react-datagrid-bootstrap3/README.md) package to use Bootstrap rendering for the DataGrid visual components.

Install DataGrid Bootstrap3 components package:

```
npm i @devexpress/dx-react-datagrid-bootstrap3 --save
```

Make sure that Bootstrap styles are linked to a page. If you have not yet configured Bootstrap for your project, check the following link: http://getbootstrap.com/getting-started/#download.

### Using DataGrid component:

By default DataGrid renders nothing. All its functionality is implemented via plugin components that are nested into the root DataGrid component. So we should specify at least one plugin that visualize the data provided to the grid.

To display the data as a simple table you can use the TableView plugin as follows:

```js
import {
  DataGrid
} from '@devexpress/dx-react-datagrid';
import {
  TableView
} from '@devexpress/dx-react-datagrid-bootstrap3';

const App = () => (
  <DataGrid
    rows={[{ id: 0, ... }, ...]}
    columns={[{ name: 'id', ... }, ...]}>
    <TableView />
  </DataGrid>
);
```

## Plugins Overview

All the DataGrid functionality is provided by plugins. We can devide all the plugins into the four logical groups:

- **State Management plugins**. These plugins can contain a piece of the DataGrid state or obtain it from the outside. Also they can change the state in respond to the actions defined by them.
- **Data Processing plugins**. These plugins transform data passed into the DataGrid component befor the data is rendered.
- **UI Plugins**. These plugins render transformed data taking current state and configuration into account. Also they can emit actions provides by state management plugins to change the DataGrid state.
- **Core Plugins**. These plugins are the base building blocks for the previous three groups of plugins. They also can be used separately in some customization scenarious.

Note, that plugins are composable and technically can be nested to each other.

Follow the link to see full plugin list: [Reference](#reference)

### Plugin Order

All DataGrid plugins consists of core plugins.

Each core plugin component has some unique behavior. See details: [DevExtreme React Core](../dx-react-core/README.md)

This is the reason why we should specify plugins in correct order. So, if data processing is based on some state, it should be inserted after appropriate state plugin. See the following example:

```js
import {
  DataGrid, FilteringState, LocalFiltering
} from '@devexpress/dx-react-datagrid'
import {
  TableView
} from '@devexpress/dx-react-datagrid-bootstrap3';

const App = () => (
  <DataGrid rows={[...]} columns={[...]}>
    <FilteringState defaultFilters={[...]}/>
    <LocalFiltering/>
    <TableView/>
  </DataGrid>
);
```

As you may notice, that in previous example, the TableView plugin specified after data processing one. The same rule is applied for visualization plugins. See the following example:

```js
import {
  DataGrid, FilteringState, LocalFiltering
} from '@devexpress/dx-react-datagrid'
import {
  TableView, TableFilterRow
} from '@devexpress/dx-react-datagrid-bootstrap3';

const App = () => (
  <DataGrid rows={[...]} columns={[...]}>
    <FilteringState defaultFilters={[...]}/>
    <LocalFiltering/>
    <TableView/>
    <TableFilterRow filterCellTemplate={...}/>
  </DataGrid>
);
```

NOTE: Refer to the plugin documentation if you have questions about requirements for specific plugin.

### UI Plugins

It is required to specify visual component for this type of plugins. They are not included by default. You can write your own templates based on plugins specification or use one of the predefined:
- [DevExtreme React DataGrid for Bootstrap 3](../dx-react-datagrid-bootstrap3/README.md) (used in examples)
- DevExtreme React DataGrid for [Material UI](http://www.material-ui.com) (coming soon...)

## Controlled (stateless) and Uncontrolled (stateful) modes

Depending on a particular use-case you might need to control the DataGrid state by yourself or to delegate state management to the component. For instance,
if you need to persist the DataGrid sorting configured by an end-user and restore it withing the next app usage session, you'll need to switch the sorting
state into the controlled mode. In this case, DataGrid will accept sorting configuration via the SortingState plugin properties, and notify you once an
end-user has changed sorting configuration. It's very similar to the [controlled components concept](https://facebook.github.io/react/docs/forms.html#controlled-components).

In your code it will look as follows:

```js
  <DataGrid rows={[...]} columns={[...]}>
    <SortingState sortings={sortings} sortingsChange={onSortingsChange} />
    ...
  </DataGrid>
```

So, the `sortings` represents the DataGrid sorting configuration. And the `onSortingsChange` function is a handler that is invoked every time the sorting configuration changes.
Note that all state management plugins work with serializable state. It means you can persist and restore it into `localstorage` or any other storage that can store string
values. Controlled state mode can also be helpful if you need to indicate the current state in your UI or to bind some controls that live outside the DataGrid. For inctance,
it's easy to put a ComboBox with available sort orders and let end-users to use it to sort data withing DataGrid.

In the uncontrolled state mode the DataGrid component manages its UI state internally. You do not have to specify the state value and state change handler properties. But you can
provide DataGrid with the initial state value using the property with the `default` prefix. For instance, we can convert the previous example into the uncontrolled mode:

```js
  <DataGrid rows={[...]} columns={[...]}>
    <SortingState />
    ...
  </DataGrid>
```

If you want to specify default sorting configuration, it will look as follows:

```js
  <DataGrid rows={[...]} columns={[...]}>
    <SortingState defaultSortings={[ column: 'data', direction: 'desc' ]} />
    ...
  </DataGrid>
```

Sometimes you might want to controll the DataGrid state partially. For inctance, you want to manage filters but do not care about sorting and grouping. You can configure it as 
follows:

```js
  <DataGrid rows={[...]} columns={[...]}>
    <FilteringState filters={filters} filtersChange={onFiltersChange}/>
    <SortingState />
    <GroupingState />
    ...
  </DataGrid>
```

Note: If you are using Redux and perform time traveling, partially controlled state might cause side-effects. So, we recommend using fully-controlled state so the DataGrid
behaves as a stateless component without side-effects.