# Grid Reference

The Grid is a root container component designed to process and display data specified via the `rows` property. You can use the `columns` property to configure columns.

The Grid's functionality (data visualization and data processing) is implemented in several [plugins](../guides/plugin-overview.md) specified as child components.

The Grid is a [PluginHost](../../../dx-react-core/docs/guides/fundamentals.md#pluginhost-component) and can contain only other plugins and plugin primitives.

## Import

Use the following statement to import a plugin with embedded theme components:

```js
import { Grid } from '@devexpress/dx-react-grid-material-ui';
// import { Grid } from '@devexpress/dx-react-grid-bootstrap4';
// import { Grid } from '@devexpress/dx-react-grid-bootstrap3';
```

If you want to use custom components, you can import the themeless plugin:

```js
import { Grid } from '@devexpress/dx-react-grid';
```

## User reference

### Properties

Name | Type | Default | Description
-----|------|---------|------------
rows | ReadonlyArray&lt;any&gt; | | An array containing custom data. A user defines the access to this data. Refer to [Data Accessors](../guides/data-accessors.md) for details.
columns | ReadonlyArray&lt;[Column](#column)&gt; | | Specifies for which row fields columns are created.
getRowId? | (row: any) => number &#124; string | | Specifies the function used to get a unique row identifier. Define this function if the identifier is different than the row index.
getCellValue? | (row: any, columnName: string) => any | | Specifies the function used to get a cell's value.
rootComponent | ComponentType&lt;[Grid.RootProps](#gridrootprops)&gt; | | A component that renders the grid root layout.
children? | ReactNode | | A React node used to render the grid content.

## Interfaces

### Column

Defines the column configuration object. Used to display data stored in a row.

Field | Type | Description
------|------|------------
name | string | Specifies the column name or the name of a row field whose value the column displays. If the column name does not match any field name, specify the `getCellValue` function.
title? | string | Specifies the column title.
getCellValue? | (row: any, columnName: string) => any | Specifies the function used to get the column value for a given row.

### Grid.RootProps

Describes properties passed to a component that renders the grid root layout.

Field | Type | Description
------|------|------------
children? | ReactNode | A React node to be placed in the root layout.

## Plugin Components

Name | Properties | Description
-----|------------|------------
Grid.Root | [Grid.RootProps](#gridrootprops) | A component that renders the grid root layout.

Additional properties are added to the component's root element.

## Plugin Developer Reference

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;any&gt; | Grid rows.
getRowId | [Getter](../../../dx-react-core/docs/reference/getter.md) | (row: any) => number &#124; string | A function used to get a unique row identifier.
columns | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[Column](#column)&gt; | Grid columns.
getCellValue | [Getter](../../../dx-react-core/docs/reference/getter.md) | (row: any, columnName: string) => any | A function used to get a given row's column value.
root | [Template](../../../dx-react-core/docs/reference/template.md) | object? | A template that renders the grid root layout.
header | [Template](../../../dx-react-core/docs/reference/template.md) | object? | A template that renders the grid header.
body | [Template](../../../dx-react-core/docs/reference/template.md) | object? | A template that renders the grid body.
footer | [Template](../../../dx-react-core/docs/reference/template.md) | object? | A template that renders the grid footer.
