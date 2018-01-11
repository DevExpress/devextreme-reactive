# FilteringState Plugin Reference

A plugin that manages the filtering state.

## User Reference

### Dependencies

none

### Properties

Name | Type | Default | Description
-----|------|---------|------------
filters | Array&lt;[Filter](#filter)&gt; | | Specifies the currently applied filters.
defaultFilters | Array&lt;[Filter](#filter)&gt; | [] | Specifies the filters initially applied in the uncontrolled mode.
onFiltersChange | (filters: Array&lt;[Filter](#filter)&gt;) => void | | Handles filter changes.

## Interfaces

### Filter

Describes a filter.

A value with the following shape:

Field | Type | Description
------|------|------------
columnName | string | Specifies the name of a column whose value is used for filtering.
value? | string | Specifies the filter value.

## Plugin Developer Reference

### Imports

none

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
filters | Getter | Array&lt;[Filter](#filter)&gt; | The currently applied filters.
changeColumnFilter | Action | ({ columnName: string, config: Object }) => void | Adds, changes or removes a filter. Pass `null` to the `config` argument to remove the filter associated with the specified column.
