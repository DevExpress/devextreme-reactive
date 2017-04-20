# LocalSorting Plugin Reference

Plugin that performs local data sorting.

## User Reference

### Dependencies

- [SortingState](sorting-state.md)

### Properties

none

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | Getter | Array&lt;[Row](datagrid.md#row)&gt; | Rows to be sorted
sortings | Getter | Array&lt;[Sorting](sorting-state.md#sorting)&gt; | Column sortings to be applied

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | Getter | () => Array&lt;[Row](datagrid.md#row)&gt; | Rows with the applied sorting

