# DxSortingState Plugin Reference

A plugin that manages the sorting state. It controls the list of columns that participate in sorting.

## Import

Use the following statement to import the plugin:

```js
import { DxSortingState } from '@devexpress/dx-vue-grid';
```

## User Reference

### Dependencies

none

### Properties

Name | Type | Default | Description
-----|------|---------|------------
sorting | Array&lt;[Sorting](#sorting)&gt; | | Specifies the applied sorting.
columnSortingEnabled? | boolean | true | Specifies whether sorting is enabled for all columns.
columnExtensions? | Array&lt;[DxSortingState.ColumnExtension](#dxsortingstatecolumnextension)&gt; | | Additional column properties that the plugin can handle.

### Events

Name | Type | Default | Description
-----|------|---------|------------
update:sorting? | (sorting: Array&lt;[Sorting](#sorting)&gt;) => void | | Handles sorting changes.

## Interfaces

### Sorting

Describes the sorting applied to a column

Field | Type | Description
------|------|------------
columnName | string | Specifies a column's name to which the sorting is applied.
direction | 'asc' &#124; 'desc' | Specifies a column's sorting order.

### DxSortingState.ColumnExtension

Describes additional column properties that the plugin can handle.

Field | Type | Description
------|------|------------
columnName | string | The name of a column to extend.
sortingEnabled | boolean | Specifies whether sorting is enabled for a column.

## Plugin Developer Reference

### Imports

none

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
sorting | Getter | Array&lt;[Sorting](#sorting)&gt; | Applied column sorting.
isColumnSortingEnabled | Getter | (columnName: string) => boolean | A function used to enable/disable sorting by a column.
changeColumnSorting | Action | ({ columnName: string, direction?: 'asc' &#124; 'desc' &#124; null, keepOther?: boolean &#124; Array&lt;String&gt;, sortIndex?: number }) => void | Changes the column's sorting direction. `keepOther` accepts `true` (keeps existing sorting), a column name array (keeps sorting by specified columns) and `false` (resets sorting). Set `direction` to `null` to cancel sorting by the current column. If `sortIndex` is omitted, the sorting is added to the end of the sorting list.
