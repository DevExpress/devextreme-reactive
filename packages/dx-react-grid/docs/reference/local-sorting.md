# LocalSorting Plugin Reference

A plugin that performs local data sorting.

## User Reference

### Dependencies

- [SortingState](sorting-state.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
getColumnCompare | (columnName: string) => [Compare](#compare) &#124; undefined | | A function implementing custom sorting. See the [Sorting guide](../guides/sorting.md#custom-sorting-algorithm) for more information.

## Interfaces

### <a name="compare"></a>Compare

A function with the following signature `(a: any, b: any) => number`

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
gridRows | Getter | Array&lt;[GridRow](grid.md#grid-row)&gt; | Rows to be sorted.
sorting | Getter | Array&lt;[Sorting](sorting-state.md#sorting)&gt; | Column sorting to be applied.
getCellValue | Getter | (row: any, columnName: string) => any | A function used to get the column value for a given row.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
gridRows | Getter | Array&lt;[GridRow](grid.md#grid-row)&gt; | Rows with the applied sorting.
