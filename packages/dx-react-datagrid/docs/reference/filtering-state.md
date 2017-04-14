# FilteringState Plugin Reference

Plugin that manages filtering state.

## User Reference

### Dependencies

none

### Properties

Name | Type | Default | Description
-----|------|---------|------------
filters | Array&lt;[Filter](#filter)&gt; | | Specifies filters to be applied to 
defaultFilters | Array&lt;[Filter](#filter)&gt; | | Specifies initial filters for the uncontrolled mode
filtersChange | (filters: Array&lt;[Filter](#filter)&gt;) => void | | Filters change handler

## Interfaces

### Filter

Describes the filter applied to a column

A value with the following shape:

Field | Type | Description
------|------|------------
column | string | Specifies a column name to apply a filter to
value | string | Specifies a value to filter rows by

## Plugin Developer Reference

### Imports

none

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
filters | Getter | () => Array&lt;[Filter](#filter)&gt; | Applied column filters
setColumnFilter | Action | ({ columnName: string, value: string }) => void | Changes a column filter
