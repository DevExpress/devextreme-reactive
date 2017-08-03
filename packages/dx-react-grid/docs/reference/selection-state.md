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
setRowsSelection | Action | ({ rowIds: Array&lt;number &#124; string&gt;, selected?: boolean  }) => void | A function that selects/deselects rows. To select/deselect a single row, pass an array with a single item to the `rowIds` argument. The `isSelected` argument specifies whether the specified rows should be selected (true), deselected (false), or their selection status should be set to the opposite one (undefined). In the last case, the function selects unselected rows and deselects selected ones.
availableToSelect | Getter | Array&lt;[Row](grid.md#row)&gt; | Rows to be rendered, which are available for selection
selection | Getter | Array&lt;number &#124; string&gt; | Selected rows
