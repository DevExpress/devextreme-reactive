# DevExtreme React Grid

## Overview

The DevExtreme React Grid component has a composable and extensible plugin-based architecture and allows you to display table data with a set of different transformations, such as paging, sorting, filtering, grouping, etc. It also allows row selection and data editing, supports the controlled and uncontrolled state modes and can be used in either a regular or a Redux-based application. It is provided with Twitter Bootstrap rendering and theming out-of-the-box.

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

  Make sure that Bootstrap styles are linked to the page. If you have not yet configured Bootstrap for your project, check the [following link](http://getbootstrap.com/getting-started/#download).

- Material UI

  ```
  npm i --save @devexpress/dx-react-grid-material-ui
  ```

  Make sure that [Material UI](https://material-ui-1dab0.firebaseapp.com/) dependenices are installed and configured. If you have not yet configured Material UI for your project, check the [following link](https://material-ui-1dab0.firebaseapp.com/getting-started/installation).

#### Add a Grid to your app:

The Grid renders nothing by default. All its functionality is implemented via plugin components that are nested into the root Grid component. You should specify at least one plugin that visualizes the data provided for the grid.

You can use the TableView plugin as follows to display the data as a simple table:

```js
import {
  Grid, TableView
} from '@devexpress/dx-react-grid-bootstrap3'/* or '@devexpress/dx-react-grid-material-ui' */;

const App = () => (
  <Grid
    rows={[{ id: 0, ... }, ...]}
    columns={[{ name: 'id', ... }, ...]}>
    <TableView />
  </Grid>
);
```

## Documentation

[React Grid Documentation](https://devexpress.github.io/devextreme-reactive/react/grid/docs/)

## License

[DevExtreme licensing](https://js.devexpress.com/licensing/).
