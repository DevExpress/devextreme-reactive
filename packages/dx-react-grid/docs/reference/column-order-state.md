# ColumnOrderState Plugin Reference

The plugin that manages the order of displayed columns.

## User Reference

### Dependencies

none

### Properties

Name | Type | Default | Description
-----|------|---------|------------
order | Array&lt;string&gt; | | Specifies the column order.
defaultOrder | Array&lt;string&gt; | | Specifies the initial column order for the uncontrolled mode.
onOrderChange | (nextOrder: Array&lt;string&gt;) => void | | Handles column order changes.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
columns | Getter | Array&lt;[Column](grid.md#column)&gt; | Columns to be ordered


### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
columns | Getter | () => Array&lt;[Column](grid.md#column)&gt; | Ordered columns
setColumnOrder | Action | ({ sourceColumnName, targetColumnName }) => void | Moves a column to the position of another column.  `sourceColumnName` specifies the column to be moved and `targetColumnName` specifies the target column.
