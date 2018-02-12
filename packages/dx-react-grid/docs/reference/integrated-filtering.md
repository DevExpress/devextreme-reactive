# IntegratedFiltering Plugin Reference

A plugin that performs built-in data filtering.

## User Reference

### Dependencies

- [FilteringState](filtering-state.md)

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

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;any&gt; | Rows to be filtered.
filters | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[Filter](filtering-state.md#filter)&gt; | Column filters to be applied.
getCellValue | [Getter](../../../dx-react-core/docs/reference/getter.md) | (row: any, columnName: string) => any | The function used to get a cell value.
isGroupRow? | [Getter](../../../dx-react-core/docs/reference/getter.md) | (row: any) => boolean | A function used to identify a group row within ordinary rows.
getRowLevelKey? | [Getter](../../../dx-react-core/docs/reference/getter.md) | (row: any) => string? | A function used to get row level key.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;any&gt; | The filtered rows.
