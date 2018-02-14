# FilteringState Plugin Reference

A plugin that manages the filtering state.

## User Reference

### Dependencies

none

### Properties

Name | Type | Default | Description
-----|------|---------|------------
filters? | Array&lt;[Filter](#filter)&gt; | | Specifies the applied filters.
defaultFilters? | Array&lt;[Filter](#filter)&gt; | [] | Specifies the filters initially applied in the uncontrolled mode.
onFiltersChange? | (filters: Array&lt;[Filter](#filter)&gt;) => void | | Handles filter changes.
columnFilteringEnabled? | boolean | true | Specifies whether filtering is enabled for all columns.
columnExtensions? | Array&lt;[FilteringState.ColumnExtension](#filteringstatecolumnextension)&gt; | | Additional column properties that the plugin can handle.

## Interfaces

### Filter

Describes a filter.

Field | Type | Description
------|------|------------
columnName | string | Specifies the name of a column whose value is used for filtering.
value? | string | Specifies the filter value.

### FilteringState.ColumnExtension

Describes additional column properties that the plugin can handle.

Field | Type | Description
------|------|------------
columnName | string | The name of a column to extend.
filteringEnabled | boolean | Specifies whether filtering is enabled for a column.

## Plugin Developer Reference

### Imports

none

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
filters | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;[Filter](#filter)&gt; | The applied filters.
isColumnFilteringEnabled | [Getter](../../../dx-react-core/docs/reference/getter.md) | (columnName: string) => boolean | A function used to define if filtering by a column is enabled.
changeColumnFilter | [Action](../../../dx-react-core/docs/reference/action.md) | ({ columnName: string, config: Object }) => void | Adds, changes or removes a filter. Pass `null` to the `config` argument to remove the specified column's filter.
