# IntegratedFiltering Plugin Reference

A plugin that performs built-in data filtering.

## User Reference

### Dependencies

- [FilteringState](filtering-state.md) [Optional]
- [SearchingState](searching-state.md) [Optional]

### Properties

Name | Type | Default | Description
-----|------|---------|------------
columnExtensions? | Array&lt;[IntegratedFiltering.ColumnExtension](#integratedfilteringcolumnextension)&gt; | | Additional column properties that the plugin can handle.

## Interfaces

### IntegratedFiltering.ColumnExtension

Describes additional column properties that the plugin can handle.

Field | Type | Description
------|------|------------
columnName | string | The name of a column to extend.
predicate? | (value: any, filter: Object, row: any) => boolean | A filter predicate. The `filter` parameter accepts an object containing the 'value' field. Note that you can use the [onFilter](table-filter-row.md#tablefiltercellprop) event to extend this object to the fields your filtering algorithm requires.

### IntegratedFiltering.FilterExpr

Describe expressions for data filtering

Field | Type | Description
------|------|------------
operator | 'and' &#124; 'or' | Specifies the bool operator 
filters | Array&lt;[IntegratedFiltering.FilterExpr](#integratedfilteringfilterexpr)&#124;[Filter](filtering-state.md#filter)&gt;  | Specifies filters or filter expressions

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | Getter | Array&lt;any&gt; | Rows to be filtered.
filterExpr | Getter | [IntegratedFiltering.FilterExpr](#integratedfilteringfilterexpr)&#124;[Filter](filtering-state.md#filter) | Filters expression to be applied.
getCellValue | Getter | (row: any, columnName: string) => any | The function used to get a cell value.
isGroupRow? | Getter | (row: any) => boolean | A function used to identify a group row within ordinary rows.
getRowLevelKey? | Getter | (row: any) => string? | A function used to get row level key.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | Getter | Array&lt;any&gt; | The filtered rows.
