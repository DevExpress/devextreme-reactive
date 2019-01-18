# React Components - Create a Custom Theme

[React Components](https://devexpress.github.io/devextreme-reactive/react/) include Bootstrap and Material-UI themes that can be customized. However, there are situations when you want to develop a custom theme. For example, when your site does not abide by Bootstrap or Material-UI guidelines.

## How Themes Work
A theme is a set of React UI components that implement the representation logic. All the internal routines are encapsulated in plugins and contained in core packages: `dx-react-grid`, `dx-react-scheduler`, and `dx-react-chart`. A core package exports "bare" UI plugins that a theme package can fill with visual components via [Render Props](https://reactjs.org/docs/render-props.html). To stylize such a plugin, you should provide necessary theme components to it.

## Implement a Custom Theme
In this tutorial, we create a grid theme based on the [Semantic UI](https://react.semantic-ui.com/) framework. This theme stylizes three main plugins: [Grid](https://devexpress.github.io/devextreme-reactive/react/grid/docs/reference/grid/), [Table](https://devexpress.github.io/devextreme-reactive/react/grid/docs/reference/table/), and [TableHeader](https://devexpress.github.io/devextreme-reactive/react/grid/docs/reference/table-header-row/). Theme sources and preview are available in this [CodeSandbox](https://codesandbox.io/s/jmqwvjqw3).

### Theme Structure
The theme consists of two directories: `plugins` (plugins that we customize) and `templates` (components provided to the plugins). Both of them are located in the `semantic-ui-theme` directory under `src`.

### Components
As we mentioned earlier, plugins render UI elements via render props. All render props have the postfix `Component`. For instance, the [Table](https://devexpress.github.io/devextreme-reactive/react/grid/docs/reference/table/) plugin contains the `tableComponent`, `headComponent`, `cellComponent`, and others.

#### Handle the Props
If props are of the `object` type, you can pass them to the theme component "as is":
```jsx
import { Table as TableSUI } from 'semantic-ui-react';
const TableHead = props => <TableSUI.Header {...props} />;
```

Otherwise, you need to destructure the props. Let's look at the `cellComponent` [prop of the `Table` plugin](https://devexpress.github.io/devextreme-reactive/react/grid/docs/reference/table/#properties) for example. It receives [Table.DataCellProps](https://devexpress.github.io/devextreme-reactive/react/grid/docs/reference/table/#tabledatacellprops). Some of them, such as `tableColumn`, `row`, and `value`, are specific to the Grid and unknown to React. They should not be passed to the theme component and need to be removed from the props. The following example illustrates the process:

```jsx
import { Table as TableSUI } from 'semantic-ui-react';

export const TableCell = ({
  tableColumn, tableRow,
  column, row,
  children, value,
  ...restProps
}) => (
  <TableSUI.Cell
    textAlign={tableColumn.align}
    singleLine={!tableColumn.wordWrapEnabled}
    {...restProps}
  >
    { children || value }
  </TableSUI.Cell>
);
```

### Plugins
Once you implement all the required components, create a theme plugin. Inside of it, import a base plugin from the core package and provide your theme components to it:

```jsx
import { TableHeaderRow as TableHeaderRowBase } from '@devexpress/dx-react-grid';
import { TableRow } from '../templates/table-row';
// ... other components

export const TableHeaderRow = props => (
  <TableHeaderRowBase
    rowComponent={TableRow}
    // ... other components
    {...props}
  />
```

If you look at the code of our themes, you may notice that we do the same with a not-yet-documented HOC, `withComponents`. The previous code looks like this if you use this HOC too:

```jsx
import { withComponents } from '@devexpress/dx-react-core';
import { TableHeaderRow as TableHeaderRowBase } from '@devexpress/dx-react-grid';
import { TableRow } from '../templates/table-row';
// ... other components

export const TableHeaderRow = withComponents({
  TableRow,
  // ... other components
})(TableHeaderRowBase);
```

A number of our components, like [TableLayout](https://github.com/DevExpress/devextreme-reactive/blob/master/packages/dx-react-grid/src/components/table-layout.jsx), are still to be documented. When you implement a custom theme, we recommend consulting our [repository code](https://github.com/DevExpress/devextreme-reactive) as well as the docs.
