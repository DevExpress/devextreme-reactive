# DxIntegratedSorting Plugin Reference

A plugin that performs built-in data sorting.

## Import

Use the following statement to import the plugin:

```js
import { DxIntegratedSorting } from '@devexpress/dx-vue-grid';
```

## User Reference

### Dependencies

- [DxSortingState](sorting-state.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
columnExtensions? | Array&lt;[DxIntegratedSorting.ColumnExtension](#dxintegratedsortingcolumnextension)&gt; | | Additional column properties that the plugin can handle.

## Interfaces

### DxIntegratedSorting.ColumnExtension

Describes additional column properties that the plugin can handle.

Field | Type | Description
------|------|------------
columnName | string | The name of a column to extend.
compare? | (a: any, b: any) => number | A sort compare function. See the [Sorting guide](../guides/sorting.md#custom-sorting-algorithm) for more information.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | Getter | Array&lt;any&gt; | Rows to be sorted.
sorting | Getter | Array&lt;[Sorting](sorting-state.md#sorting)&gt; | Column sorting to be applied.
getCellValue | Getter | (row: any, columnName: string) => any | The function used to get a cell value.
isGroupRow? | Getter | (row: any) => boolean | A function used to identify a group row within ordinary rows.
getRowLevelKey? | Getter | (row: any) => string? | A function used to get row level key.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | Getter | Array&lt;any&gt; | Rows with the applied sorting.
