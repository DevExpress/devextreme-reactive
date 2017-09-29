# LocalFiltering Plugin Reference

Plugin that performs local data filtering.

## User Reference

### Dependencies

- [FilteringState](filtering-state.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
getColumnPredicate | (columnName: string) => (value: any, filter: Object, row: [Row](grid.md#row)) => boolean | | A function used to apply the filter to the cell value. The `filter` is a configuration object that looks like `{ value: '...' }`. It can be extended through the [setFilter](table-filter-row.md#filter-cell-args) function, for instance. For more information see the [filtering guide](../guides/filtering.md#using-custom-filtering-algorithm).

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | Getter | Array&lt;[Row](grid.md#row)&gt; | Rows to be filtered
filters | Getter | Array&lt;[Filter](filtering-state.md#filter)&gt; | Column filters to be applied
getCellValue | Getter | (row: [Row](grid.md#row), columnName: string) => any | The function used to get a cell value

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | Getter | Array&lt;[Row](grid.md#row)&gt; | Rows with the applied filtering

