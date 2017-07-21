# SelectionState Plugin Reference

A plugin that manages selection state.

## User Reference

### Dependencies

none

### Properties

Name | Type | Default | Description
-----|------|---------|------------
selection | Array&lt;number &#124; string&gt; | [] | Specifies the selected rows
defaultSelection | Array&lt;number &#124; string&gt; | [] | Specifies initially selected rows in the uncontrolled mode
onSelectionChange | (selection: Array&lt;number &#124; string&gt;) => void | | Handles selection changes

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | Getter | Array&lt;[Row](grid.md#row)&gt; | Rows to be rendered
getRowId | Getter | (row: [Row](grid.md#row)) => number &#124; string | A function used to get a unique row identifier
availableToSelect | Getter | Array&lt;[Row](grid.md#row)&gt; | Rows to be rendered, which are available for selection

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
setRowSelection | Action | ({ rowId }) => void | A function that selects a row
setRowsSelection | Action | ({ rowIds }) => void | A function that selects multiple rows
availableToSelect | Getter | Array&lt;[Row](grid.md#row)&gt; | Rows to be rendered, which are available for selection
selection | Getter | Array&lt;number &#124; string&gt; | Selected rows
