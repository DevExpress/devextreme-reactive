# RowDetailState Plugin Reference

A plugin that manages the expanded state for table row details.

## Import

Use the following statement to import the plugin:

```js
import { RowDetailState } from '@devexpress/dx-react-grid';
```

## User Reference

### Dependencies

none

### Properties

Name | Type | Default | Description
-----|------|---------|------------
expandedRowIds? | Array&lt;number &#124; string&gt; | | IDs of the rows being expanded.
defaultExpandedRowIds? | Array&lt;number &#124; string&gt; | [] | IDs of the rows initially expanded in the uncontrolled mode.
onExpandedRowIdsChange? | (expandedRowIds: Array&lt;number &#124; string&gt;) => void | | Handles expanded rows changes.

## Plugin Developer Reference

### Imports

none

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
toggleDetailRowExpanded | [Action](../../../dx-react-core/docs/reference/action.md) | ({ rowId: number &#124; string, state?: boolean }) => void | Expands/collapses the specified row. The `state` argument specifies whether the rows should be selected (true), deselected (false), or their selection status should be set to the opposite value (undefined).
expandedDetailRowIds | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;number &#124; string&gt; | Currently expanded rows.
