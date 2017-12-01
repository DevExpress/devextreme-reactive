# LocalSelection Plugin Reference

A plugin that performs local data selection.

## User Reference

### Dependencies

- [SelectionState](selection-state.md)

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
selection | Getter | Set&lt;number &#124; string&gt; | Selected rows.
rows | Getter | Array&lt;any&gt; | Rows to be filtered.
getRowId | Getter | (row: any) => number &#124; string | A function used to get a unique row identifier.
isGroupRow? | Getter | (row: any) => boolean | A function used to identify a group row within ordinary rows.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
toggleSelectAll | Action | (select?: boolean, selection: Getter, toggleSelection: Action) => void | A function that selects/deselects all rows. The `select` argument specifies whether the rows should be selected (true), deselected (false), or their selection status should be set to the opposite value (undefined).
selectAllAvailable | Getter | boolean | Return `true` if any rows are available to select.
allSelected | Getter | boolean | True if all the rows available for selection are selected.
someSelected | Getter | boolean | True if some rows are selected. False if all/zero rows are selected.
