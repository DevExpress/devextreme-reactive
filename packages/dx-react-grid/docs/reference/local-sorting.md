# LocalSorting Plugin Reference

A plugin that performs local data sorting.

## User Reference

### Dependencies

- [SortingState](sorting-state.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
getColumnComparer | (columnName: string) => [Comparer](#comparer) | | A function used to apply a custom sorting.

### Comparer

A function that defines a sort order. Comparer is similar to the compare function of the [array.sort](https://www.w3schools.com/js/js_array_sort.asp) method. It takes two items and returns a negative, zero, or positive value.


## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | Getter | Array&lt;[Row](grid.md#row)&gt; | Rows to be sorted
sorting | Getter | Array&lt;[Sorting](sorting-state.md#sorting)&gt; | Column sorting to be applied
getCellValue | Getter | (row: [Row](grid.md#row), columnName: string) => any | The function used to get a cell value

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | Getter | Array&lt;[Row](grid.md#row)&gt; | Rows with the applied sorting

