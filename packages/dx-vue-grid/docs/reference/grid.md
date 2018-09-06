# DxGrid Reference

The DxGrid is a root container component designed to process and display data specified via the `rows` property. You can configure columns using the `columns` property. The Grid's functionality (data visualization and data processing) is implemented in several plugins specified as child components. See the [plugins concept](../guides/plugin-overview.md) for details.

## Import

Use the following statement to import a plugin with embedded theme components:

```js
import { DxGrid } from '@devexpress/dx-vue-grid-bootstrap4';
```

If you want to use custom components, you can import the themeless plugin:

```js
import { DxGrid } from '@devexpress/dx-vue-grid';
```

## User reference

### Properties

Name | Type | Default | Description
-----|------|---------|------------
rows | Array&lt;any&gt; | | An array containing custom data. A user defines the access to this data. Refer to [Data Accessors](../guides/data-accessors.md) for details.
columns | Array&lt;[Column](#column)&gt; | | Specifies for which row fields columns are created.
getRowId? | (row: any) => number &#124; string | | Specifies the function used to get a unique row identifier.
getCellValue? | (row: any, columnName: string) => any | | Specifies the function used to get a cell's value.
rootComponent | [DxGrid.DxRoot](#dxgriddxroot) | | A component that renders the grid root layout.

## Interfaces

### Column

Defines the column configuration object. Used to display data stored in a row.

Field | Type | Description
------|------|------------
name | string | Specifies the column name or the name of a row field whose value the column displays. If the column name does not match any field name, specify the `getCellValue` function.
title? | string | Specifies the column title.
getCellValue? | (row: any, columnName: string) => any | Specifies the function used to get the column value for a given row.

## Component Types

### DxGrid.DxRoot

#### Slots

Field | Description
------|------------
default | The default Vue slot.

## Plugin Components

Name | Type | Description
-----|------|------------
DxGrid.components.DxRoot | [DxGrid.DxRoot](#dxgriddxroot) | A component that renders the grid root layout.

## Plugin Developer Reference

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | Getter | Array&lt;any&gt; | Grid rows.
getRowId | Getter | (row: any) => number &#124; string | A function used to get a unique row identifier.
columns | Getter | Array&lt;[Column](#column)&gt; | Grid columns.
getCellValue | Getter | (row: any, columnName: string) => any | A function used to get a given row's column value.
root | Template | object? | A template that renders the grid root layout.
header | Template | object? | A template that renders the grid header.
body | Template | object? | A template that renders the grid body.
footer | Template | object? | A template that renders the grid footer.
