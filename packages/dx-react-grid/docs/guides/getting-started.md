# React Grid - Getting Started

## Overview

DevExtreme React Grid is a component that displays table data from a local or remote source. It supports paging, sorting, filtering, grouping and other data shaping options, row selection, and data editing. Support for controlled and uncontrolled state modes allows you to use the Grid in a regular or Redux-based application. The DevExtreme Grid component has a composable and extendable plugin-based architecture and is provided with Twitter Bootstrap and Material-UI rendering and theming out of the box.

## Installation

Install the dx-react-grid package and its dependencies using the following command:

```
npm i --save @devexpress/dx-react-core.npm-tag() @devexpress/dx-react-grid.npm-tag()
```

This package does not contain visual components. In the examples below, visual components are rendered using the Material-UI package. However, you can use any of the following:

- Material-UI

  ```
  npm i --save @devexpress/dx-react-grid-material-ui.npm-tag()
  ```

  Make sure that the [Material-UI](https://material-ui.com/) dependencies are installed and properly configured. Check the Material-UI's [Getting Started](https://material-ui.com/getting-started/installation) article for configuration details.

- Bootstrap 4

  ```
  npm i --save @devexpress/dx-react-grid-bootstrap4.npm-tag()
  ```

  Make sure that the [OpenIconic](https://useiconic.com/open) icons are installed and properly configured.

  Add the DevExtreme React Grid styles in the root .js file:

  ```js
  import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';
  ```

  NOTE: The DevExtreme React Grid does not include Bootstrap CSS.

- Bootstrap 3

  ```
  npm i --save @devexpress/dx-react-grid-bootstrap3.npm-tag()
  ```

  Make sure that the [React-Bootstrap](https://react-bootstrap.github.io) dependencies are installed and properly configured. Check the React-Bootstrap's [Getting Started](https://react-bootstrap.github.io/getting-started/introduction) article for configuration details.

  NOTE: The DevExtreme React Grid does not include Bootstrap CSS so this needs to be installed as well.

## Supported Browsers

React Grid supports the latest stable releases of all major browsers: Google Chrome, Mozilla Firefox, Safari, Opera, and Microsoft Edge.

React Grid can work in other browsers if they use the latest version of WebKit, Blink, or Gecko, whether directly or via the platform's web view API. Some of these browsers may require adding [polyfills](#polyfills). However, such browsers, including Internet Explorer, may not work correctly.

## Polyfills

React Grid uses the latest web platform standards, and cannot support older browsers like IE11 and Android 4. Use the ES2015 (ES6) polyfill to support these browsers. We recommend [BABEL Polyfill](https://babeljs.io/docs/usage/polyfill/), but you can use an alternative.

## Use the Grid Component

The Grid renders nothing by default. The root Grid component's nested plugin components implement its functionality, and it is necessary to specify at least one plugin that visualizes the grid data.

Use the Table plugin to display the data as a simple table:

```jsx
import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';
// import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-bootstrap4';
// import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-bootstrap3';

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
    <Table />
    <TableHeaderRow />
  </Grid>
);
```

## Try Out the React Grid

Follow the links below to try out the React Grid:

- [CodeSandbox for Material-UI](https://codesandbox.io/s/13qvz1qqzl)
- [CodeSandbox for Bootstrap4](https://codesandbox.io/s/rymyjlonpq)
- [CodeSandbox for Bootstrap3](https://codesandbox.io/s/7o46mkowx)

## License

[DevExtreme licensing](https://js.devexpress.com/licensing/).
