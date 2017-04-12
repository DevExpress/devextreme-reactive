# LocalSorting Plugin Reference

Plugin that performs local sorting.

## User Reference

### Dependencies

- [SortingState](sorting-state.md)

### Properties

none

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | Getter | array&lt;[Row](datagrid.md#row)&gt; | Rows to be sorted
sortings | Getter | array&lt;[Sorting](sorting-state.md#sorting)&gt; | array Column sortings to be applied

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | Getter | array&lt;[Row](datagrid.md#row)&gt; | Rows with applied sorting

