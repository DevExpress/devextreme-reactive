# DxTreeDataState Plugin Reference

A plugin that manages tree rows' expanded state.

## Import

Use the following statement to import the plugin:

```js
import { DxTreeDataState } from '@devexpress/dx-vue-grid';
```

## User Reference

### Dependencies

none

### Properties

Name | Type | Default | Description
-----|------|---------|------------
expandedRowIds | Array&lt;number &#124; string&gt; | | IDs of the rows being expanded.

### Events

Name | Type | Default | Description
-----|------|---------|------------
update:expandedRowIds? | (expandedRowIds: Array&lt;number &#124; string&gt;) => void | | Handles expanded row changes.

## Plugin Developer Reference

### Imports

none

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
expandedRowIds | Getter | Array&lt;number &#124; string&gt; | Expanded rows.
toggleRowExpanded | Action | ({ rowId }) => void | Expands/collapses the specified row.
