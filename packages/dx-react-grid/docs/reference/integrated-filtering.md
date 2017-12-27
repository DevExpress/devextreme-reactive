# IntegratedFiltering Plugin Reference

A plugin that performs built-in data filtering.

## User Reference

### Dependencies

- [FilteringState](filtering-state.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
columnExtensions | Array&lt;[IntegratedFilteringColumnExtension](#integratedfilteringcolumnextension)&gt; | | Additional column properties that the plugin can handle.

## Interfaces

### IntegratedFilteringColumnExtension

Describes additional column properties that the plugin can handle.

A value with the following shape:

Field | Type | Description
------|------|------------
columnName | string | The name of a column to extend.
predicate? | (value: any, filter: Object, row: any) => boolean | A filter predicate. The `filter` parameter accepts an object containing the 'value' field. Note that you can use the [onFilter](table-filter-row.md#tablefiltercellprop) event to extend this object to the fields your filtering algorithm requires.

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
