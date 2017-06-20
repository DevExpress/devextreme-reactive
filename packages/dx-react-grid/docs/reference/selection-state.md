# SelectionState Plugin Reference

Plugin that manages selection state.

## User Reference

### Dependencies

none

### Properties

Name | Type | Default | Description
-----|------|---------|------------
selection | Array&lt;int&#124;string&gt; | [] | Specifies selected rows
defaultSelection | Array&lt;int&#124;string&gt; | [] | Specifies initially selected rows for the the uncontrolled mode
onSelectionChange | (selection: Array&lt;int&#124;string&gt;) => void | | Handles selection changes

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | Getter | Array&lt;[Row](grid.md#row)&gt; | Rows to be rendered inside the table
getRowId | Getter | (row: [Row](grid.md#row)) => number &#124; string | A function used to get a unique row identifier
availableToSelect | Getter | Array&lt;[Row](grid.md#row)&gt; | Rows to be rendered inside the table body which can be selected

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
setRowSelection | Action | ({ rowId }) => void | A function which sets selection to the row passed
setRowsSelection | Action | ({ rowIds }) => void | A function which sets selection to the multiple rows passed
availableToSelect | Getter | Array&lt;[Row](grid.md#row)&gt; | Rows to be rendered inside the table body which can be selected
selection | Getter | Array&lt;int &#124; string&gt; | Selected rows
