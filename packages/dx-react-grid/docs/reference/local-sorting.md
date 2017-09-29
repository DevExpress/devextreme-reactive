# LocalSorting Plugin Reference

A plugin that performs local data sorting.

## User Reference

### Dependencies

- [SortingState](sorting-state.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
getColumnCompare | (columnName: string) => (a:&nbsp;any,&nbsp;b:&nbsp;any) => number | | A function used to apply a custom sorting. For more information see the [sorting guide](../guides/sorting.md#custom-sorting-algorithm).


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

