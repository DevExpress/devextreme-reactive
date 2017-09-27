# LocalFiltering Plugin Reference

Plugin that performs local data filtering.

## User Reference

### Dependencies

- [FilteringState](filtering-state.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
predicate | (value: any, filter: [Filter](filtering-state.md#filter), row: any) => boolean | | A function used to apply the filter to the cell value.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
gridRows | Getter | Array&lt;[GridRow](grid.md#grid-row)&gt; | Rows to be filtered.
filters | Getter | Array&lt;[Filter](filtering-state.md#filter)&gt; | Column filters to be applied.
getCellValue | Getter | (row: any, columnName: string) => any | A function used to get the column value for a given row data.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
gridRows | Getter | Array&lt;[GridRow](grid.md#grid-row)&gt; | Rows with the applied filtering.
