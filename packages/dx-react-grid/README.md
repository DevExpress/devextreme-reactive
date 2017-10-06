# DevExtreme React Grid

## Overview

DevExtreme React Grid is a component that displays table data from a local or remote source. It supports paging, sorting, filtering, grouping and other data shaping options, row selection, and data editing. Support for controlled and uncontrolled state modes allows you to use the Grid in a regular or Redux-based application. The DevExtreme Grid component has a composable and extendable plugin-based architecture and is provided with Twitter Bootstrap and Material UI rendering and theming out of the box.

## Getting Started

### Installation

Install the dx-react-grid package and its dependencies using the following command:

```
npm i --save @devexpress/dx-react-core @devexpress/dx-react-grid
```

This package does not contain visual components. In the examples below, visual components are rendered using the Bootstrap 3 package. However, you can use any of the following:

- Bootstrap 3

  ```
  npm i --save @devexpress/dx-react-grid-bootstrap3
  ```

  Make sure that [React-Boostrap](https://react-bootstrap.github.io) dependencies are installed and properly configured. Check the React-Bootstrap's [Getting Started](https://react-bootstrap.github.io/getting-started.html) article for configuration details.

- Material UI

  ```
  npm i --save @devexpress/dx-react-grid-material-ui
  ```

  Make sure that [Material UI](https://material-ui-1dab0.firebaseapp.com/) dependencies are installed and properly configured. Check the Material UI's [Getting Started](https://material-ui-1dab0.firebaseapp.com/getting-started/installation) article for configuration details.

### Polyfills

React Grid uses the latest web platform standards. Thus, it cannot support older browsers like IE11 and Android 4. Use the ES2015 (ES6) polyfill to support these browsers. We recommend [BABEL Polyfill](https://babeljs.io/docs/usage/polyfill/), but you can use an alternative.

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

### Try Out The React Grid

Follow the links below to try out the React Grid:

- [WebpackBin for Bootstrap3](https://www.webpackbin.com/bins/-KoCcFwPPtps5fEN0PkI)
- [WebpackBin for Material UI](https://www.webpackbin.com/bins/-KoCeS-_jZrZuTecv-wd)

## Documentation

[Guides](https://devexpress.github.io/devextreme-reactive/react/grid/docs/guides/)
[API Reference](https://devexpress.github.io/devextreme-reactive/react/grid/docs/reference/)

## License

[DevExtreme licensing](https://js.devexpress.com/licensing/).
