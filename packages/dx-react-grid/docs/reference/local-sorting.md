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
rows | Getter | Array&lt;any&gt; | Rows to be sorted.
sorting | Getter | Array&lt;[Sorting](sorting-state.md#sorting)&gt; | Column sorting to be applied.
getCellValue | Getter | (row: any, columnName: string) => any | The function used to get a cell value.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | Getter | Array&lt;any&gt; | Rows with the applied sorting.
