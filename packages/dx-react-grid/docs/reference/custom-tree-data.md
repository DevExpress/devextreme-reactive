# CustomTreeData Plugin Reference

A plugin that converts custom formatted tree data to a supported format and performs local row expanding/collapsing.

## User Reference

### Dependencies

- [TreeDataState](tree-data-state.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
getChildGroups | (currentRows: Array&lt;any&gt;, rootRows: Array&lt;any&gt;) => Array&lt;{ row: any, childRows?: Array&lt;any&gt; }&gt; | | A function that extracts child rows from the specified data. It is executed recursively for the root and nested rows.

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
isLeafRow | Getter | (row: any) => boolean | A function used to identify a leaf node in tree data structure.
