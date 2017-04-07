# Data Grid for React

Project status: **CTP**

- [Overview](#overview)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Reference](docs/reference)

## Overview

DevExtreme React DataGrid component allows to display table data with a set of different transformations such as paging, sorting, filtering, grouping and others. It also allows provides row selection and data editing. It has composable and extensible plugin-based architecture. It supports controlled and uncontrolled state modes and can be easily used in either a regular or a Redux-based application. It's provided with the Twitter Bootstrap rendering and theming out-of-the-box.

## Installation

Install package:

```
npm i @devexpress/dx-react-datagrid --save
```

This package does not contain any visual components, so all examples provided below use [DevExtreme React DataGrid Bootstrap3](../dx-react-datagrid-bootstrap3/README.md) package to use Bootstrap rendering for the DataGrid visual components.

Install DataGrid Bootstrap3 components package:

```
npm i @devexpress/dx-react-datagrid-bootstrap3 --save
```

## Getting Started

### Minimal Setup

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

### Plugins Overview

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

### Controlled and Uncontrolled state modes

To be described...

### Documentation

- [Guides by Features](docs/guides)
- [Plugin Reference](docs/reference)

