# FilteringState Plugin Reference

Plugin that manages filtering state.

## User Reference

### Dependencies

none

### Properties

Name | Type | Default | Description
-----|------|---------|------------
filters | array&lt;[Filter](#filter)&gt; | | Specifies filters applied
defaultFilters | array&lt;[Filter](#filter)&gt; | | Specifies starting filters for uncontrolled scenario
filtersChange | (filters: array&lt;[Filter](#filter)&gt;) => void | | Handles filters change

## Data Structures

### Filter

Describes applied filter to column

Field | Type | Description
------|------|------------
column | string | Specifies column name to apply filter
value | string | Specifies value with that rows will be filtered

## Plugin Developer Reference

### Imports

none

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
filters | Getter | () => array&lt;[Filter](#filter)&gt; | Applied column filters
setColumnFilter | Action | ({ columnName: string, value: string }) => void | Change filter for column
