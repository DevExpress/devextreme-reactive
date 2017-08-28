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
rows | Property | Array&lt;[Row](grid.md#row)&gt; | Rows to be sorted
sorting | Property | Array&lt;[Sorting](sorting-state.md#sorting)&gt; | Column sorting to be applied
getCellData | Property | (row: [Row](grid.md#row), columnName: string) => any | The function used to get a cell data

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | Property | Array&lt;[Row](grid.md#row)&gt; | Rows with the applied sorting

