# LocalFiltering Plugin Reference

Plugin that performs local data filtering.

## User Reference

### Dependencies

- [FilteringState](filtering-state.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
getColumnPredicate | (columnName: string) => [Predicate](#predicate) &#124; undefined | | A function used to apply the filter to the cell value. See the [Filtering guide](../guides/filtering.md#using-custom-filtering-algorithm) for more information.

## Interfaces
### <a name="predicate"></a>Predicate
A function with the following signature `(value: any, filter: Object, row: Row) => boolean`. The `filter` parameter accepts an object containing the 'value' field. However, you can use the [setFilter](table-filter-row.md#filter-cell-args) function to extend this object to the fields your filtering algorithm requires.

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

