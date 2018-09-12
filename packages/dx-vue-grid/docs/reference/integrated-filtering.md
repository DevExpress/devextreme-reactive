# DxIntegratedFiltering Plugin Reference

A plugin that performs built-in data filtering.

## Import

Use the following statement to import the plugin:

```js
import { DxIntegratedFiltering } from '@devexpress/dx-vue-grid';
```

## User Reference

### Dependencies

- [DxFilteringState](filtering-state.md) [Optional]
- [DxSearchState](search-state.md) [Optional]

### Properties

Name | Type | Default | Description
-----|------|---------|------------
columnExtensions? | Array&lt;[DxIntegratedFiltering.ColumnExtension](#dxintegratedfilteringcolumnextension)&gt; | | Additional column properties that the plugin can handle.

## Interfaces

### DxIntegratedFiltering.ColumnExtension

Describes additional column properties that the plugin can handle.

Field | Type | Description
------|------|------------
columnName | string | The name of a column to extend.
predicate? | (value: any, filter: object, row: any) => boolean | A filter predicate. The `filter` parameter accepts an object containing the 'value' field. Note that you can use the [filter](table-filter-row.md#dxtablefilterrowdxcell) event to extend this object to the fields your filtering algorithm requires.

### FilterExpression

Describes data filtering expressions

Field | Type | Description
------|------|------------
operator | 'and' &#124; 'or' | Specifies the Boolean operator
filters | Array&lt;[FilterExpression](#filterexpression) &#124; [Filter](filtering-state.md#filter)&gt;  | Specifies filters or filter expressions

## Static Fields

Field | Type | Description
------|------|------------
defaultPredicate | (value: any, filter: [Filter](filtering-state.md#filter), row: any) => boolean | The built-in filter predicate. The `filter` parameter accepts an object containing the 'value' field.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | Getter | Array&lt;any&gt; | Rows to be filtered.
filterExpression | Getter | [FilterExpression](#filterexpression) &#124; [Filter](filtering-state.md#filter) | A filter expression to be applied.
getCellValue | Getter | (row: any, columnName: string) => any | The function used to get a cell value.
isGroupRow? | Getter | (row: any) => boolean | A function used to identify a group row within ordinary rows.
getRowLevelKey? | Getter | (row: any) => string? | A function used to get row level key.
getCollapsedRows | Getter | (row: any) => Array&lt;any&gt;? | A function used to get collapsed rows associated with the given row.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | Getter | Array&lt;any&gt; | The filtered rows.
getCollapsedRows | Getter | (row: any) => Array&lt;any&gt;? | A function used to get collapsed rows associated with the given row.
