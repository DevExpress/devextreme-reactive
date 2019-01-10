# React Components - How to create a custom theme

## Motivation
Although our React components are shipped with modern themes and easily customizable themselves, sometimes this will not suffice. For example, if your site uses design guidelines incompatipable with Bootstrap or Material UI guidelines, you will need to develop your own theme. It is not a very difficult task because you don't have to stylize all the plugins: for a basic grid or scheduler it's enough to implement a dozen of simple components.

## How theming works
A theme contains only presentation logic, all the internal routines are encapsulated in plugins and contained in core packages. A core package exports 'bare' UI plugins and a theme package fills these plugins with visual components or 'templates' using [Render Props](https://reactjs.org/docs/render-props.html). Basically a theme is just a set of React UI components delivered to plugins. So to stylize a plugin you just need to write necessary components and provide them to the plugin.

## Implementing a custom theme
For example let's make a grid theme based on the [Semantic UI](https://react.semantic-ui.com/) framework. This theme will cover three essential plugins - [Grid](https://devexpress.github.io/devextreme-reactive/react/grid/docs/reference/grid/), [Table](https://devexpress.github.io/devextreme-reactive/react/grid/docs/reference/table/) and [TableHeader](https://devexpress.github.io/devextreme-reactive/react/grid/docs/reference/table-header-row/). Theme sources and preview are available in this [CodeSandbox](https://codesandbox.io/s/jmqwvjqw3).

### Theme structure
Create a new directory in the sources root called `semantic-ui-theme` with two nested directories - `plugins` and `templates`.

### Templates
As we saw, plugins do not render UI elements by themselves, render props used instead. These render props are listed in documentation with a 'Component' prefix, in case of `Table` plugin it is `tableComponent`, `headComponent`, etc.

#### Handling props
Sometimes theme component may be simple like
```jsx
import { Table as TableSUI } from 'semantic-ui-react';
const TableHead = props => <TableSUI.Header {...props} />;
```
Here a component passes props as-is to the underlying Semantic UI component.

But there are also other templates that receive grid-specific data via props and a different approach is required. These properties are described in a related plugin docs under section 'Interfaces'. Let's take a `tableCell` component for example. It receives props of type [Table.DataCellProps](https://devexpress.github.io/devextreme-reactive/react/grid/docs/reference/table/#tabledatacellprops). As you can see, some of these properties - such as `tableColumn`, `row`, `value` - are unknown to React, hence we should destructure the props.

Below is a `tableCell` component illustrating props destructuring.
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
Having implemented all the required components, we can proceed to writing a theme plugin. It is a simple task: just import a base plugin from the core package and provide it with your theme components. There is a special HOC `withComponents` for this purpose but it is not yet documented.

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

Some of our components like [TableLayout](https://github.com/DevExpress/devextreme-reactive/blob/master/packages/dx-react-grid/src/components/table-layout.jsx) are not fully documented, so we recommend that you use our [repository](https://github.com/DevExpress/devextreme-reactive) code as a reference when implementing your own theme.
