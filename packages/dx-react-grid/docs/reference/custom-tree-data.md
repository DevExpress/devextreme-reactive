# CustomTreeData Plugin Reference

A plugin that converts custom formatted tree data to a supported format and performs local row expanding/collapsing.

## Import

Use the following statement to import the plugin:

```js
import { CustomTreeData } from '@devexpress/dx-react-grid';
```

## User Reference

### Dependencies

- [TreeDataState](tree-data-state.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
getChildRows | (currentRow: any &#124; null, rootRows: Array&lt;any&gt;) => Array&lt;any&gt; &#124; null | | A function that extracts child rows from the specified data. It is executed recursively for the root and nested rows. The `currentRow` parameter is `null` for root rows. The return value should be null if a row is a leaf, otherwise, it should be an array of rows. If child rows are not available, the function should return an empty array.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;any&gt; | Rows to be transformed.
getRowId | [Getter](../../../dx-react-core/docs/reference/getter.md) | (row: any) => number &#124; string | A function used to get a unique row identifier.
expandedRowIds | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;number &#124; string&gt; | Expanded rows.
getRowLevelKey | [Getter](../../../dx-react-core/docs/reference/getter.md) | (row: any) => string? | A function used to get a group row level key.
getCollapsedRows | [Getter](../../../dx-react-core/docs/reference/getter.md) | (row: any) => Array&lt;any&gt;? | A function used to get collapsed rows associated with the given row.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;any&gt; | The transformed tree data rows.
getRowId | [Getter](../../../dx-react-core/docs/reference/getter.md) | (row: any) => number &#124; string | A function used to get a unique row identifier.
getRowLevelKey | [Getter](../../../dx-react-core/docs/reference/getter.md) | (row: any) => string? | A function used to get a group row level key.
getCollapsedRows | [Getter](../../../dx-react-core/docs/reference/getter.md) | (row: any) => Array&lt;any&gt;? | A function used to get collapsed rows associated with the given row.
isTreeRowLeaf | [Getter](../../../dx-react-core/docs/reference/getter.md) | (row: any) => boolean | A function used to identify a leaf node in tree data structure.
getTreeRowLevel | [Getter](../../../dx-react-core/docs/reference/getter.md) | (row: any) => number | A function used to identify a node level in tree data structure.
