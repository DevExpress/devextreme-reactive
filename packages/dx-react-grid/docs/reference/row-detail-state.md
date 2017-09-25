# RowDetailState Plugin Reference

A plugin that manages the expanded state for table row details.

## User Reference

### Dependencies

none

### Properties

Name | Type | Default | Description
-----|------|---------|------------
expandedRows | Array&lt;number &#124; string&gt; | | Specifies an IDs of expanded rows data.
defaultExpandedRows | Array&lt;number &#124; string&gt; | | Specifies an IDs of initially expanded rows data in the uncontrolled mode.
onExpandedRowsChange | (expandedRows: Array&lt;number &#124; string&gt;) => void | | Handles expanded rows changes.

## Plugin Developer Reference

### Imports

none

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
setDetailRowExpanded | Action | ({ rowId }) => void | Expands the specified row.
expandedRows | Getter | Array&lt;number &#124; string&gt; | Currently expanded rows.
