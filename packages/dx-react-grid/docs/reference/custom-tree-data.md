# CustomTreeData Plugin Reference

A plugin that converts custom formatted tree data to a supported format and performs local row expanding/collapsing.

## User Reference

### Dependencies

- [TreeDataState](tree-data-state.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
getChildRows | (currentRow: any &#124; null, rootRows: Array&lt;any&gt;) => Array&lt;any&gt; &#124; null | | A function that extracts child rows from the specified data. It is executed recursively for the root and nested rows. The `currentRow` parameter is `null` when retrieving root rows. A return value should be null if a row is a leaf, otherwise it should be an array of rows. If child rows is not avaliable currently, you should return an empty array.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | Getter | Array&lt;any&gt; | Rows to be transformed.
getRowId | Getter | (row: any) => number &#124; string | A function used to get a unique row identifier.
expandedRowIds | Getter | Array&lt;number &#124; string&gt; | Currently expanded rows.
getRowLevelKey | Getter | (row: any) => string? | A function used to get a group row level key.
getCollapsedRows | Getter | (row: any) => Array&lt;any&gt;? | A function used to get a given row's collapsed rows.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | Getter | Array&lt;any&gt; | Linearized tree data rows.
getRowId | Getter | (row: any) => number &#124; string | A function used to get a unique row identifier.
getRowLevelKey | Getter | (row: any) => string? | A function used to get a group row level key.
getCollapsedRows | Getter | (row: any) => Array&lt;any&gt;? | A function used to get a given row's collapsed rows.
isTreeRowLeaf | Getter | (row: any) => boolean | A function used to identify a leaf node in tree data structure.
