# IntegratedSorting Plugin Reference

A plugin that performs built-in data sorting.

## Import

Use the following statement to import the plugin:

```js
import { IntegratedSorting } from '@devexpress/dx-react-grid';
```

## User Reference

### Dependencies

- [SortingState](sorting-state.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
columnExtensions? | Array&lt;[IntegratedSorting.ColumnExtension](#integratedsortingcolumnextension)&gt; | | Additional column properties that the plugin can handle.

## Interfaces

### IntegratedSorting.ColumnExtension

Describes additional column properties that the plugin can handle.

Field | Type | Description
------|------|------------
columnName | string | The name of a column to extend.
compare? | (a: any, b: any) => number | A sort compare function. See the [Sorting guide](../guides/sorting.md#custom-sorting-algorithm) for more information.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;any&gt; | Rows to be sorted.
sorting | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[Sorting](sorting-state.md#sorting)&gt; | Column sorting to be applied.
getCellValue | [Getter](../../../dx-react-core/docs/reference/getter.md) | (row: any, columnName: string) => any | The function used to get a cell value.
isGroupRow? | [Getter](../../../dx-react-core/docs/reference/getter.md) | (row: any) => boolean | A function used to identify a group row within ordinary rows.
getRowLevelKey? | [Getter](../../../dx-react-core/docs/reference/getter.md) | (row: any) => string? | A function used to get row level key.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;any&gt; | Rows with the applied sorting.
