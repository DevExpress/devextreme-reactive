# LocalFiltering Plugin Reference

Plugin that performs local data filtering.

## User Reference

### Dependencies

- [FilteringState](filtering-state.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
getColumnPredicate | Function | | A function used to apply the filter to the cell value. Should return the filtering function like `(value, filter, row) => boolean`. For more information see the [filtering guide](../guides/filtering.md#using-custom-filtering-algorithm).

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

