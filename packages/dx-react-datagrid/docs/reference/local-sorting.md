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
rows | Getter | array&lt;any&gt; | Rows to be sorted
sortings | Getter | array&lt;[Sorting](sorting-state.md#sorting)&gt; | array Column sortings to be applied

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | Getter | array&lt;any&gt; | Rows with applied local sorting

