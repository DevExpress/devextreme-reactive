# SelectionState Plugin Reference

A plugin that manages the selection state.

## User Reference

### Dependencies

none

### Properties

Name | Type | Default | Description
-----|------|---------|------------
selection | Array&lt;number &#124; string&gt; | | The selected row's IDs.
defaultSelection | Array&lt;number &#124; string&gt; | [] | The initially selected rows in the uncontrolled mode.
onSelectionChange | (selection: Array&lt;number &#124; string&gt;) => void | | Handles selection changes.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | [Getter](/devextreme-reactive/react/core/docs/reference/getter) | Array&lt;any&gt; | Rows to be rendered.
getRowId | [Getter](/devextreme-reactive/react/core/docs/reference/getter) | (row: any) => number &#124; string | A function used to get a unique row identifier.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
toggleSelection | [Action](/devextreme-reactive/react/core/docs/reference/action) | ({ rowIds: Array&lt;number &#124; string&gt;, state?: boolean  }) => void | A function that selects/deselects rows. The `state` argument specifies whether the rows should be selected (true), deselected (false), or their selection status should be set to the opposite value (undefined). To select/deselect a single row, pass an array with a single item to the `rowIds` argument.
selection | [Getter](/devextreme-reactive/react/core/docs/reference/getter) | Array&lt;number &#124; string&gt; | The selected row's IDs.
