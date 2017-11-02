# LocalFiltering Plugin Reference

A plugin that performs local data filtering.

## User Reference

### Dependencies

- [FilteringState](filtering-state.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
getColumnPredicate | (columnName: string) => [Predicate](#predicate) &#124; undefined | | A function that applies a filter predicate to a cell depending on the column it belongs to. See the [Filtering guide](../guides/filtering.md#using-custom-filtering-algorithm) for more information.

## Interfaces

### <a name="predicate"></a>Predicate

A function with the following signature `(value: any, filter: Object, row: any) => boolean`. The `filter` parameter accepts an object containing the 'value' field. Note that you can use the [setFilter](table-filter-row.md#filter-cell-args) function to extend this object to the fields your filtering algorithm requires.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | Getter | Array&lt;any&gt; | Rows to be filtered.
filters | Getter | Array&lt;[Filter](filtering-state.md#filter)&gt; | Column filters to be applied.
getCellValue | Getter | (row: any, columnName: string) => any | The function used to get a cell value.
isGroupRow? | Getter | (row: any) => boolean | A function used to identify a group row within ordinary rows.
getRowLevelKey? | Getter | (row: any) => string? | A function used to get row level key.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | Getter | Array&lt;any&gt; | The filtered rows.
