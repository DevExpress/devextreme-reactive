# IntegratedSelection Plugin Reference

A plugin that performs built-in selection.

## User Reference

### Dependencies

- [SelectionState](selection-state.md)

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
selection | [Getter](/devextreme-reactive/react/core/docs/reference/getter) | Array&lt;number &#124; string&gt; | The selected row's IDs.
rows | [Getter](/devextreme-reactive/react/core/docs/reference/getter) | Array&lt;any&gt; | Rows to be selected.
getRowId | [Getter](/devextreme-reactive/react/core/docs/reference/getter) | (row: any) => number &#124; string | A function used to get a unique row identifier.
isGroupRow? | [Getter](/devextreme-reactive/react/core/docs/reference/getter) | (row: any) => boolean | A function used to identify a group row within ordinary rows.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
toggleSelectAll | [Action](/devextreme-reactive/react/core/docs/reference/action) | (state?: boolean) => void | A function that selects/deselects all rows. The `state` argument specifies whether the rows should be selected (true), deselected (false), or their selection status should be set to the opposite value (undefined).
selectAllAvailable | [Getter](/devextreme-reactive/react/core/docs/reference/getter) | boolean | Returns `true` if there are rows that are available for selection.
allSelected | [Getter](/devextreme-reactive/react/core/docs/reference/getter) | boolean | Indicates whether all the rows available for selection are selected.
someSelected | [Getter](/devextreme-reactive/react/core/docs/reference/getter) | boolean | Indicates whether some rows are selected. False if all/none rows are selected.
