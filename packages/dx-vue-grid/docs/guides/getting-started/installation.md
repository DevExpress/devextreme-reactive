Install the dx-vue-grid package and its dependencies using the following command:

```
npm i --save @devexpress/dx-vue-core.npm-tag() @devexpress/dx-vue-grid.npm-tag()
```

This package does not contain visual components. In the examples below, visual components are rendered using the Bootstrap 4 package. However, you can use any of the following:

- Bootstrap 4

  ```
  npm i --save @devexpress/dx-vue-grid-bootstrap4.npm-tag()
  ```

  You need add to your project the [OpenIconic](https://useiconic.com/open) icons.

  Add the DevExtreme Vue Grid styles in the root .js file:

  ```js
  import '@devexpress/dx-vue-grid-bootstrap4/dist/dx-vue-grid-bootstrap4.css';
  ```

  NOTE: The DevExtreme Vue Grid does not include Bootstrap CSS.
