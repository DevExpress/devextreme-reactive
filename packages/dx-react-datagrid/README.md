# Data Grid for React

## Overview

The DevExtreme React DataGrid component allows you to display table data with a set of different transformations, such as paging, sorting, filtering, grouping, etc. It also allows row selection and data editing. It has a composable and extensible plugin-based architecture. It supports the controlled and uncontrolled state modes, and can be easily used in either a regular or a Redux-based application. It's provided with the Twitter Bootstrap rendering and theming out-of-the-box.

## Installation

#### Install package:

```
npm i @devexpress/dx-react-datagrid --save
```

This package does not contain any visual components, so all examples provided below use the [DevExtreme React DataGrid Bootstrap3](../dx-react-datagrid-bootstrap3/README.md) package to use Bootstrap rendering for the DataGrid visual components.

Install the DataGrid Bootstrap3 components package:

```
npm i @devexpress/dx-react-datagrid-bootstrap3 --save
```

Make sure that Bootstrap styles are linked to the page. If you have not yet configured Bootstrap for your project, check the following link: http://getbootstrap.com/getting-started/#download.

#### Add a DataGrid to your app:

By default DataGrid renders nothing. All its functionality is implemented via plugin components that are nested into the root DataGrid component. So, we should specify at least one plugin that visualizes the data provided for the grid.

To display the data as a simple table, you can use the TableView plugin as follows:

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

## Documentation

[DataGrid for React Documentation](docs)

