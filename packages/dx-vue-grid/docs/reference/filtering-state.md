# DxFilteringState Plugin Reference

A plugin that manages the filtering state.

## Import

Use the following statement to import the plugin:

```js
import { DxFilteringState } from '@devexpress/dx-vue-grid';
```

## User Reference

### Dependencies

none

### Properties

Name | Type | Default | Description
-----|------|---------|------------
filters | Array&lt;[Filter](#filter)&gt; | | Specifies the applied filters.
columnFilteringEnabled? | boolean | true | Specifies whether filtering is enabled for all columns.
columnExtensions? | Array&lt;[DxFilteringState.ColumnExtension](#dxfilteringstatecolumnextension)&gt; | | Additional column properties that the plugin can handle.

### Events

Name | Type | Default | Description
-----|------|---------|------------
update:filters? | (filters: Array&lt;[Filter](#filter)&gt;) => void | | Handles filter changes.

## Interfaces

### Filter

Describes a filter.

Field | Type | Description
------|------|------------
columnName | string | Specifies the name of a column whose value is used for filtering.
operation? | [FilterOperation](#filteroperation) | Specifies the operation name. The value is 'contains' if the operation name is not set.
value? | string | Specifies the filter value.

### FilterOperation

Describes a filter operation. Accepts one of the built-in operations or a custom string.

Type: `string`

Built-in operations: `contains`, `notContains`, `startsWith`, `endsWith`, `equal`, `notEqual`, `greaterThan`, `graterThenOrEqual`, `lessThan`, `lessThanOrEqual`

### DxFilteringState.ColumnExtension

Describes additional column properties that the plugin can handle.

Field | Type | Description
------|------|------------
columnName | string | The name of a column to extend.
filteringEnabled | boolean | Specifies whether filtering is enabled for a column.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
filters | Getter | Array&lt;[Filter](#filter)&gt; | The applied filter
filterExpression | Getter | [FilterExpression](integrated-filtering.md#filterexpression) &#124; [Filter](#filter) | The applied filter expressions.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
filterExpression | Getter  | [FilterExpression](integrated-filtering.md#filterexpression) &#124; [Filter](#filter) | The applied filter expressions.
isColumnFilteringEnabled | Getter | (columnName: string) => boolean | A function used to define if filtering by a column is enabled.
changeColumnFilter | Action | ({ columnName: string, config: object }) => void | Adds, changes or removes a filter. Pass `null` to the `config` argument to remove the specified column's filter.
