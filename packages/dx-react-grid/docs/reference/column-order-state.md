# ColumnOrderState Plugin Reference

Plugin that manages columns order state. It controls the order in which columns are displayed.

## User Reference

### Dependencies

none

### Properties

Name | Type | Default | Description
-----|------|---------|------------
order | Array&lt;string&gt; | | Specifies columns order
defaultOrder | Array&lt;string&gt; | | Specifies initial columns order for the the uncontrolled mode
onOrderChange | (nextOrder: Array&lt;string&gt;) => void | | Handles columns order changes

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
columns | Getter | Array&lt;[Column](grid.md#column)&gt; | Columns to be ordered


### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
columns | Getter | () => Array&lt;[Column](grid.md#column)&gt; | Ordered columns
setColumnOrder | Action | ({ sourceColumnName, targetColumnName }) => void | Moves a specific column to the place of another column. Columns are identified by names. `sourceColumnName` represents the column to be moved and `targetColumnName` specifies the column which is currently located in the target place
