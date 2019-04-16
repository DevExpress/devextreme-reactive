# VirtualTableState Plugin Reference

A plugin that manages remote data for the virtual table.

## Import

Use the following statement to import the plugin:

```js
import { VirtualTableState } from '@devexpress/dx-react-grid';
```

## User Reference

### Dependencies

none

### Properties

Name | Type | Default | Description
-----|------|---------|------------
start | number | | Specifies the index that the first row of the current chunk has in the entire data set.
rowCount | number | | Specifies the total row count.
virtualPageSize? | number | 100 | Specifies the count of rows in the current chunk.
loading | boolean | | Specifies whether data is still loading.
infinite? | boolean | | Enables a scrolling mode in which rows are loaded in sequence.
getRows | (skip: number, take: number) => void | | Starts to load remote data for grid rows.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;any&gt; | Rows to be rendered.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
remoteDataEnabled | [Getter](../../../dx-react-core/docs/reference/getter.md) | boolean | Indicates whether data is loaded from a remote source.
remoteDataLoading | [Getter](../../../dx-react-core/docs/reference/getter.md) | boolean | Indicates whether data is still loading.
infiniteScrollingMode | [Getter](../../../dx-react-core/docs/reference/getter.md) | boolean | Indicates whether the infinite scrolling mode is enabled.
start | [Getter](../../../dx-react-core/docs/reference/getter.md) | number | The index that the first row of the current chunk has in the entire data set.
requestNextPage | [Action](../../../dx-react-core/docs/reference/action.md) | (skip: number, take: number) => void | Starts to load the next data chunk.
invalidateVirtalRowsCache | [Action](../../../dx-react-core/docs/reference/action.md) | () => void | Removes loaded rows from the cache.
