# IntegratedSorting Plugin Reference

A plugin that performs built-in data sorting.

## User Reference

### Dependencies

- [SortingState](sorting-state.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
columnExtensions | Array&lt;[IntegratedSortingColumnExtension](#integratedsortingcolumnextension)&gt; | | Additional column properties that the plugin can handle.

## Interfaces

### IntegratedSortingColumnExtension

Describes additional column properties that the plugin can handle.

A value with the following shape:

Field | Type | Description
------|------|------------
columnName | string | The name of a column to extend.
compare? | (a: any, b: any) => number | A sort compare function. See the [Sorting guide](../guides/sorting.md#custom-sorting-algorithm) for more information.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | [Getter](/devextreme-reactive/react/core/docs/reference/getter) | Array&lt;any&gt; | Rows to be sorted.
sorting | [Getter](/devextreme-reactive/react/core/docs/reference/getter) | Array&lt;[Sorting](sorting-state.md#sorting)&gt; | Column sorting to be applied.
getCellValue | [Getter](/devextreme-reactive/react/core/docs/reference/getter) | (row: any, columnName: string) => any | The function used to get a cell value.
isGroupRow? | [Getter](/devextreme-reactive/react/core/docs/reference/getter) | (row: any) => boolean | A function used to identify a group row within ordinary rows.
getRowLevelKey? | [Getter](/devextreme-reactive/react/core/docs/reference/getter) | (row: any) => string? | A function used to get row level key.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | [Getter](/devextreme-reactive/react/core/docs/reference/getter) | Array&lt;any&gt; | Rows with the applied sorting.
