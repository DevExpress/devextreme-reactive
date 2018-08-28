# DxIntegratedSelection Plugin Reference

A plugin that performs built-in selection.

## Import

Use the following statement to import the plugin:

```js
import { DxIntegratedSelection } from '@devexpress/dx-vue-grid';
```

## User Reference

### Dependencies

- [DxSelectionState](selection-state.md)

### Properties

none

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
selection | Getter | Array&lt;number &#124; string&gt; | The selected row's IDs.
rows | Getter | Array&lt;any&gt; | Rows to be selected.
getRowId | Getter | (row: any) => number &#124; string | A function used to get a unique row identifier.
isGroupRow? | Getter | (row: any) => boolean | A function used to identify a group row within ordinary rows.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
toggleSelectAll | Action | (state?: boolean) => void | A function that selects/deselects all rows. The `state` argument specifies whether the rows should be selected (true), deselected (false), or their selection status should be set to the opposite value (undefined).
selectAllAvailable | Getter | boolean | Returns `true` if there are rows that are available for selection.
allSelected | Getter | boolean | Indicates whether all the rows available for selection are selected.
someSelected | Getter | boolean | Indicates whether some rows are selected. False if all/none rows are selected.
