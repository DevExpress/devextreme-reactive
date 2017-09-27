# LocalSorting Plugin Reference

A plugin that performs local data sorting.

## User Reference

### Dependencies

- [SortingState](sorting-state.md)

### Properties

none

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
