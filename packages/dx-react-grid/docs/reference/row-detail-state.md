# RowDetailState Plugin Reference

A plugin that manages the expanded state for table row details.

## User Reference

### Dependencies

none

### Properties

Name | Type | Default | Description
-----|------|---------|------------
expandedRowIds | Array&lt;number &#124; string&gt; | | IDs of the rows being expanded.
defaultExpandedRowIds | Array&lt;number &#124; string&gt; | | IDs of the rows initially expanded in the uncontrolled mode.
onExpandedRowIdsChange | (expandedRowIds: Array&lt;number &#124; string&gt;) => void | | Handles expanded rows changes.

## Plugin Developer Reference

### Imports

none

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
toggleDetailRowExpanded | Action | ({ rowId }) => void | Expands/collapses the specified row.
expandedRowIds | Getter | Array&lt;number &#124; string&gt; | Currently expanded rows.
