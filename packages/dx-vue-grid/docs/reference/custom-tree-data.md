# DxCustomTreeData Plugin Reference

A plugin that converts custom formatted tree data to a supported format and expands/collapses local rows.

## Import

Use the following statement to import the plugin:

```js
import { DxCustomTreeData } from '@devexpress/dx-vue-grid';
```

## User Reference

### Dependencies

- [DxTreeDataState](tree-data-state.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
getChildRows | (currentRow: any &#124; null, rootRows: Array&lt;any&gt;) => Array&lt;any&gt; &#124; null | | A function that extracts child rows from the specified data. It is executed recursively for the root and nested rows. The `currentRow` parameter is `null` for root rows. The return value should be null if a row is a leaf. Otherwise, it should be an array of rows. If child rows are not available, the function should return an empty array.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | Getter | Array&lt;any&gt; | Rows to be transformed.
getRowId | Getter | (row: any) => number &#124; string | A function used to get a unique row identifier.
expandedRowIds | Getter | Array&lt;number &#124; string&gt; | Expanded rows.
getRowLevelKey | Getter | (row: any) => string? | A function used to get a group row level key.
getCollapsedRows | Getter | (row: any) => Array&lt;any&gt;? | A function used to get collapsed rows associated with the given row.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | Getter | Array&lt;any&gt; | The transformed tree data rows.
getRowId | Getter | (row: any) => number &#124; string | A function used to get a unique row identifier.
getRowLevelKey | Getter | (row: any) => string? | A function used to get a group row level key.
getCollapsedRows | Getter | (row: any) => Array&lt;any&gt;? | A function used to get collapsed rows associated with the specified row.
isTreeRowLeaf | Getter | (row: any) => boolean | A function used to identify a leaf node in a tree data structure.
getTreeRowLevel | Getter | (row: any) => number | A function used to identify a node level in a tree data structure.
