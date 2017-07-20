# DevExtreme React Grid

## Overview

The DevExtreme React Grid component has a composable and extendable plugin-based architecture that allows you to display table data with a set of different transformations, such as paging, sorting, filtering, grouping, etc. It also allows row selection and data editing, supports the controlled and uncontrolled state modes, and can be used in either a regular or a Redux-based application. It comes with Twitter Bootstrap rendering and theming out of the box.

## Installation

#### Install package

Install this package with its dependencies using the following command:

```
npm i --save @devexpress/dx-react-core @devexpress/dx-react-grid
```

This package does not contain visual components. In the examples below, the DevExtreme React Grid uses the Bootstrap 3 package to render visual components. However, you can use any of the following ones:

- Bootstrap 3

  ```
  npm i --save @devexpress/dx-react-grid-bootstrap3
  ```
  Make sure that [React-Boostrap](https://react-bootstrap.github.io) dependencies are installed and configured. check the React-Bootstrap's [Getting Started](https://react-bootstrap.github.io/getting-started.html) article For configuration details.

- Material UI

  ```
  npm i --save @devexpress/dx-react-grid-material-ui
  ```

  Make sure that the [Material UI](https://material-ui-1dab0.firebaseapp.com/) dependencies are installed and configured. Check the [following link](https://material-ui-1dab0.firebaseapp.com/getting-started/installation) if you have not configured the Material UI yet.

#### Add a Grid to your app:

The Grid renders nothing by default. Plugin components, nested into the root Grid component, implement its functionality. You should specify at least one plugin that visualizes the data provided for the grid.

You can use the TableView plugin to display data as a simple table:

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

## Documentation

[React Grid Documentation](https://devexpress.github.io/devextreme-reactive/react/grid/docs/)

## License

[DevExtreme licensing](https://js.devexpress.com/licensing/).
