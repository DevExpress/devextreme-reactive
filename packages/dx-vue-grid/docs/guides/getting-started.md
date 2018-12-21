# Vue Grid - Getting Started

## Overview

DevExtreme Vue Grid is a component that displays table data from a local or remote source. It supports paging, sorting, filtering, grouping and other data shaping options, row selection, and data editing. The DevExtreme Grid component has a composable and extendable plugin-based architecture and is provided with Twitter Bootstrap rendering and theming out of the box.

## Installation

Install the dx-vue-grid package and its dependencies using the following command:

```
npm i --save @devexpress/dx-vue-core.npm-tag() @devexpress/dx-vue-grid.npm-tag()
```

This package does not contain visual components. You can use Bootstrap 4 package to render visual components.

```
npm i --save @devexpress/dx-vue-grid-bootstrap4.npm-tag()
```

You need add to your project the [OpenIconic](https://useiconic.com/open) icons.

Add the DevExtreme Vue Grid styles in the root .js file:

```js
import '@devexpress/dx-vue-grid-bootstrap4/dist/dx-vue-grid-bootstrap4.css';
```

NOTE: The DevExtreme Vue Grid does not include Bootstrap CSS.

## Supported Browsers

Vue Grid supports the latest stable releases of all major browsers: Google Chrome, Mozilla Firefox, Safari, Opera, and Microsoft Edge.

Vue Grid can work in other browsers if they use the latest version of WebKit, Blink, or Gecko, whether directly or via the platform's web view API. Some of these browsers may require adding [polyfills](#polyfills). However, such browsers, including Internet Explorer, may not work correctly.

## Polyfills

Vue Grid uses the latest web platform standards, and cannot support older browsers like IE11 and Android 4. Use the ES2015 (ES6) polyfill to support these browsers. We recommend [BABEL Polyfill](https://babeljs.io/docs/usage/polyfill/), but you can use an alternative.

## Using Grid component

The Grid renders nothing by default. The root Grid component's nested plugin components implement its functionality, and it is necessary to specify at least one plugin that visualizes the grid data.

Use the DxTable plugin to display the data as a simple table:

```js
import {
  DxGrid,
  DxTable,
  DxTableHeaderRow,
} from '@devexpress/dx-vue-grid-bootstrap4';

const App = {
  data() {
    return {
      columns: [
        { name: 'id', title: 'ID' },
        { name: 'product', title: 'Product' },
        { name: 'owner', title: 'Owner' },
      ],
      rows: [
        { id: 0, product: 'DevExtreme', owner: 'DevExpress' },
        { id: 1, product: 'DevExtreme Reactive', owner: 'DevExpress' },
      ],
    };
  },
  template: `
    <dx-grid
      :rows="rows"
      :columns="columns"
    >
      <dx-table />
      <dx-table-header-row />
    </dx-grid>
  `,
  components: {
    DxGrid,
    DxTable,
    DxTableHeaderRow,
  },
};
```

## Try Out The Vue Grid

Follow the links below to try out the Vue Grid:

- [CodeSandbox for Bootstrap4](https://codesandbox.io/s/k2zml29n4v)

## License

[DevExtreme licensing](https://js.devexpress.com/licensing/).
