Install the dx-react-grid package and its dependencies using the following command:

```
npm i --save @devexpress/dx-react-core.npm-tag() @devexpress/dx-react-grid.npm-tag()
```

This package does not contain visual components. In the examples below, visual components are rendered using the Material UI package. However, you can use any of the following:

- Material UI

  ```
  npm i --save @devexpress/dx-react-grid-material-ui.npm-tag()
  ```

  Make sure that the [Material UI](https://material-ui-1dab0.firebaseapp.com/) dependencies are installed and properly configured. Check the Material UI's [Getting Started](https://material-ui-1dab0.firebaseapp.com/getting-started/installation) article for configuration details.

- Bootstrap 4

  ```
  npm i --save @devexpress/dx-react-grid-bootstrap4.npm-tag()
  ```

  Make sure that [reactstrap](https://reactstrap.github.io/) dependencies are installed and properly configured. Check the reactstrap's [Getting Started](https://reactstrap.github.io/) article for configuration details. Also you need add to your project the [OpenIconic](https://useiconic.com/open) icons.

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
