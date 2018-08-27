# IntegratedSelection Plugin Reference

A plugin that performs built-in selection.

## Import

Use the following statement to import the plugin:

```js
import { IntegratedSelection } from '@devexpress/dx-react-grid';
```

## User Reference

### Dependencies

- [SelectionState](selection-state.md)

### Properties

none

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
selection | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;number &#124; string&gt; | The selected row's IDs.
rows | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;any&gt; | Rows to be selected.
getRowId | [Getter](../../../dx-react-core/docs/reference/getter.md) | (row: any) => number &#124; string | A function used to get a unique row identifier.
isGroupRow? | [Getter](../../../dx-react-core/docs/reference/getter.md) | (row: any) => boolean | A function used to identify a group row within ordinary rows.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
toggleSelectAll | [Action](../../../dx-react-core/docs/reference/action.md) | (state?: boolean) => void | A function that selects/deselects all rows. The `state` argument specifies whether the rows should be selected (true), deselected (false), or their selection status should be set to the opposite value (undefined).
selectAllAvailable | [Getter](../../../dx-react-core/docs/reference/getter.md) | boolean | Returns `true` if there are rows that are available for selection.
allSelected | [Getter](../../../dx-react-core/docs/reference/getter.md) | boolean | Indicates whether all the rows available for selection are selected.
someSelected | [Getter](../../../dx-react-core/docs/reference/getter.md) | boolean | Indicates whether some rows are selected. False if all/none rows are selected.
