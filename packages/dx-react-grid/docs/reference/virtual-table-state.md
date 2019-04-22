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
skip | number | | Specifies the index that the first row of the current chunk has in the entire data set.
totalRowCount | number | | Specifies the total row count.
pageSize? | number | 100 | Specifies the count of rows in the current chunk.
loading | boolean | | Specifies whether data is loading.
infiniteScrolling? | boolean | | Enables a scrolling mode in which rows are loaded in sequence.
getRows | (skip: number, take: number) => void | | Starts to load remote data for grid rows.

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
rows | [Getter](../../../dx-react-core/docs/reference/getter.md) | Array&lt;any&gt; | Rows to be rendered.

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
isDataRemote | [Getter](../../../dx-react-core/docs/reference/getter.md) | boolean | Indicates whether data is loaded from a remote source.
isDataLoading | [Getter](../../../dx-react-core/docs/reference/getter.md) | boolean | Indicates whether data is loading.
isScrollingInfinite | [Getter](../../../dx-react-core/docs/reference/getter.md) | boolean | Indicates whether the infinite scrolling mode is enabled.
skip | [Getter](../../../dx-react-core/docs/reference/getter.md) | number | The index that the first row of the current chunk has in the entire data set.
requestNextPage | [Action](../../../dx-react-core/docs/reference/action.md) | (skip: number, take: number) => void | Starts to load the next data chunk.
clearRowCache | [Action](../../../dx-react-core/docs/reference/action.md) | () => void | Removes loaded rows from the cache.
