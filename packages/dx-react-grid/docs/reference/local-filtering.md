# LocalFiltering Plugin Reference

Plugin that performs local data filtering.

## User Reference

### Dependencies

- [FilteringState](filtering-state.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
filterFn | (row: [Row](grid.md#row), filter: [Filter](filtering-state.md#filter)) => boolean | | A function used to apply the filter to the data row

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | Property | Array&lt;[Row](grid.md#row)&gt; | Rows to be filtered
filters | Property | Array&lt;[Filter](filtering-state.md#filter)&gt; | Column filters to be applied
getCellData | Property | (row: [Row](grid.md#row), columnName: string) => any | The function used to get cell data

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | Property | Array&lt;[Row](grid.md#row)&gt; | Rows with the applied filtering

