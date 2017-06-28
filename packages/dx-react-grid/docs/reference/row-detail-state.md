# RowDetailState Plugin Reference

A plugin that manages the expanded state for table row details.

## User Reference

### Dependencies

none

### Properties

Name | Type | Default | Description
-----|------|---------|------------
expandedRows | Array&lt;number &#124; string&gt; | | Specifies expanded rows
defaultExpandedRows | Array&lt;number &#124; string&gt; | | Specifies initially expanded rows in the uncontrolled mode
onExpandedRowsChange | (expandedRows: Array&lt;number &#124; string&gt;) => void | | Handles expanded row changes

## Plugin Developer Reference

### Imports

none

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
setDetailRowExpanded | Action | ({ rowId }) => void | Expands the specified row
expandedRows | Getter | Array&lt;number &#124; string&gt; | Currently expanded rows
